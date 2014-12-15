var margin = {top: 20, right: 120, bottom: 20, left: 120},
    width = 1060 - margin.right - margin.left,
    height = 1200 - margin.top - margin.bottom;
    
var i = 0,
    duration = 750,// animation duration
    root;// stores the tree structure in json format

var tree = d3.layout.tree()
    .size([height, width]);

var edge_weight = d3.scale.linear()
					.domain([0, 100])
                    .range([0, 100]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

// Define 'div' for tooltips
var div = d3.select("div#legend")
	.append("div")  // declare the tooltip div 
	.attr("class", "tooltip")              // apply the 'tooltip' class
	.style("opacity", 0);                  // set the opacity to nil

// adding the svg to the html structure
var svg = d3.select("div#viz").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//loading the json file
d3.json("files/ass1-user1-activities-level-1.json", function(error, flare) {
  edge_weight.domain([0,flare.size]);
  root = flare;
  root.x0 = height / 2;
  root.y0 = 0;
  
  root.children.forEach(collapse);
  update(root);
});

d3.select(self.frameElement).style("height", "800px");

/**
 * Updates the node.
 * cloppases and expands the node bases on the structure of the source
 * all 'children' nodes are expanded and '_children' nodes collapsed
 * @param {json structure} source
 */
function update(source) {
  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
      links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 180; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
      .on("click", click)
      .on("mouseover", function(d) {		
                  div.transition()
      				.duration(500)	
      				.style("opacity", 0);
      				
      			div.transition()
      				.duration(200)	
      				.style("opacity", .9);
      				
      			div.html(
      				'<a class="button"  href= "./taxonomy.html?node='+d.name[0]+'">' + // The first <a> tag
      				'Legend For: '+d.name[0]+
      				"</a>"                          // closing </a> tag
      				)	 
      				.style("left", (d3.event.pageX) + "px")			 
      				.style("top", (d3.event.pageY - 28) + "px");
      			});

  nodeEnter.append("circle")
      .attr("r", 1e-6)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeEnter.append("text")
      .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .text(function(d) { return d.key; })
      .style("fill-opacity", 1e-6);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
      .attr("r", function(d){ return edge_weight(d.size/2);})
      .style("fill", function(d) { 
      return d._children ? "lightsteelblue" : "#fff"; });

  nodeUpdate.select("text")
      .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      .remove();

  nodeExit.select("circle")
      .attr("r", 1e-6);

  nodeExit.select("text")
      .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("stroke-width", function(d){
      	return 1;
      })
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      })
      .attr("stroke", function(d){ 
      	return linkColor(d.target.colorCode);});

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", function(d){
      /* calculating the top shift */
      var source = {x: d.source.x - edge_weight(calculateLinkSourcePosition(d)), y: d.source.y};
      var target = {x: d.target.x, y: d.target.y};
      return diagonal({source: source, target: target});
      })
      .attr("stroke-width", function(d){
      	return edge_weight(d.target.size);
      });

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

/**
 * Calculates the source y-axis position of the link.
 * @param {json structure} link
 */
function calculateLinkSourcePosition(link) {
	targetID = link.target.id;
	var childrenNumber = link.source.children.length;
	var widthAbove = 0;
	for (var i = 0; i < childrenNumber; i++)
	{
		if (link.source.children[i].id == targetID)
		{
			// we are done
			widthAbove = widthAbove + link.source.children[i].size/2;
			break;
		}else {
			// keep adding
			widthAbove = widthAbove + link.source.children[i].size
		}
	}
	return link.source.size/2 - widthAbove;
}

/*
 * Toggle children on click.
 * @param {node} d
 */ 
function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update(d);
}

/*
 * Collapses the node d and all the children nodes of d
 * @param {node} d
*/
function collapse(d) {
  if (d.children) {
    d._children = d.children;
    d._children.forEach(collapse);
    d.children = null;
  }
}

/*
 * Collapses the node in the tree
*/
function collapseAll() {
	root.children.forEach(collapse);
	update(root);
}

/*
 * Expands the node d and all the children nodes of d
 * @param {node} d
*/
function expand(d) {
	if (d._children) {
		d.children = d._children;
		d._children = null;
	}
	if (d.children) {
		d.children.forEach(expand);
	}
	
}
/*
 * Expands all the nodes in the tree
*/
function expandAll() {
	root.children.forEach(expand);
	update(root);
}

/*
 * animates and reloads the data for the visualization 
 * if it supports switching between multiple datasets
*/
function reloadData(){
	var levels = document.getElementById("levels");
	var level_val = levels.options[levels.selectedIndex].value;
	
	var ass_element = document.getElementById("assignment");
	var ass_val = ass_element.options[ass_element.selectedIndex].value;
	
	var file_name = 'files/'+ass_val+'-level-'+level_val+'.json';

	d3.json(file_name, function(error, flare) {
	edge_weight.domain([0,flare.size]);
	  root = flare;
	  root.x0 = height / 2;
	  root.y0 = 0;
		
	  root.children.forEach(collapse);
	  update(root);
	});
	
}

/*
 * dictionary of colors corresponding to the different color categories
 * defaults to a generic blue if there are no defined color categories
 * in the data set
*/
function linkColor(linkCode) {
	switch (linkCode)
	{
	  case 'Exploration Actions': 
	  	return '#0000FF';//blue
	    break;
	  case 'Task Actions':
	  	return '#FF7F00';//orange
	  	break;
	  case 'App Actions': 
		return '#FF0000';//red
		break;
	  case 'Insight Actions':
		return '#7F007F';//purple
		break;
	  case 'Meta Actions':
		  return '#00FFFF';//cyan
		  break;
	  default:
		  return '#0950D0';//generic blue
		  break;
	}
}
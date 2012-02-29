---
date: '2008-08-27 16:39:00'
layout: post
slug: make-your-dock-icons-translucent-for-hidden-apps
status: publish
title: Make Your Dock Icons Translucent for Hidden Apps
wordpress_id: '46'
categories:
- apple
---

[![](http://1.bp.blogspot.com/_BQ0a8k-GX20/SLUvr-0uzDI/AAAAAAAABO4/oYkmlAwGJZY/s400/Picture+7.png)](http://1.bp.blogspot.com/_BQ0a8k-GX20/SLUvr-0uzDI/AAAAAAAABO4/oYkmlAwGJZY/s1600-h/Picture+7.png)  
Apple-loving weblog TUAW highlights a simple Terminal tweak that makes all of your hidden applications appear translucent in the Dock. Just fire up Terminal and paste:  
  


defaults write com.apple.Dock showhidden -bool YES

Then restart the Dock by pasting `killall Dock` and hitting enter. Once it restarts, any app you hide shows up dimmed in the Dock.

VIA: [TUAW](http://www.tuaw.com/2008/08/22/terminal-tips-make-hidden-dock-icons-transparent/)  


---
date: '2011-01-29 17:48:37'
layout: post
slug: how-to-macirssi-part-2
status: publish
title: 'How to MacIrssi: Part 2'
wordpress_id: '168'
---

So if you have already downloaded MacIrssi the awesome IRC client and are already chatting away you might wanna customize it a bit for your comfort. This is a part 2 to the two part series [How to MacIrssi: Part 1](http://shubhamgoel.info/?p=144).


### 1) Change the short cut to switch between tabs


By default you can switch tabs using  Command-Right Arrow and Command-Left Arrow . I prefer the same shortcut that most of the browsers use and avoid reinventing the wheel. To add a new shortcut go to System Preferences> Keyboard> Application Shortcuts. Press the small (Add) button in the lower left corner of the box and select MacIrssi from the menu. Add the following shortcuts:

    
    Previous Channel: Control-Shift-Tab



    
    Next Channel: Control-Tab


[![](http://shubhamgoel.info/wp-content/uploads/2011/01/macirrsi.png)](http://shubhamgoel.info/wp-content/uploads/2011/01/macirrsi.png)and you are all set to use the new shortcuts. no restart required.


### 2) Register your nick on the irc server


If you plan to stick around, its a good idea to register your irc nick. To register your irc nick connect to the irc server.

    
    /server irc.freenode.net


and then register your nick by typing

    
    /msg nickserv register <password> <email>


and follow the instructions. It will send you an email and ask you to type back a command to declare ownership of the nick.

You might also like to hide your email address from prying eyes. For that type:

    
    /msg nickserv set hidemail on




### 3) Automatically connect to the server and chartrooms on launch


To automatically connect to a server type:

    
    /SERVER ADD -auto -network FreeNode irc.freenode.net 6667 password


To automatically connect to a chatroom after you have added the server type:

    
    /CHANNEL ADD -auto #iphone freenode




### 4) You might also like your nick to glow up when its mentioned


Use:

    
    /HILIGHT nick




### 5) Hide joined and left chatroom messages


I find the user has joined the chatroom and the user has left the chatroom messages quite annoying. To hide them type:

    
    /IGNORE * JOINS PARTS QUITS NICKS


You'll have to restart for this change to take effect.

If you have come this far, you are ready to enjoy the fruits of your labor. There is definitely a lot more to irssi. If you are interested, check out [http://irssi.org/](http://irssi.org/)

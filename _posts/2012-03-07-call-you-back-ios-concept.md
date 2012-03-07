---
layout: post
title: "Call You Back: iOS Concept"
category: 
tags: []
---
{% include JB/setup %}
## Need
I have been using an iPhone since the very start. Every other phone I had before that had the option to reply to a call with a short message. iOS has left this option out.
The reason behind that could be debated. May be its because after the introduction of Siri you can tell your phone to send the last caller a message or may be because apple felt most of the users wouldn't miss it.

I feel the particular need for this feature when I am in a meetings or when I am driving. A quick reply would help me keep the person calling me informed instead of feeling that their call was ignored because I am lazy(sleeping) or on purpose.

## Solution
I wrote a small application which the app store would approve some time back to address this issue. It had a few pre filled in template messages and you could select and send one across. The problem was that this was no real solution as the work flow was still too tedious. You had to launch the app, select a message, select a recipient and then send the message. 

With this exercise I realized that there is no elegant app-store friendly solution possible as:

1) The last missed call or the information about the last caller is not available programmatically i.e. The user would have to manually identify the message recipient.

2) An application has to be launched to send the message. That means manually ignoring the call or waiting for the ringer to stop before sending the message.

I have started working on a jailbreak tweak to tackle the problem.
My first step was to nail the work flow. For that I worked on around ten different interaction approaches. Around that time there were some leaks regarding the [lock screen on iOS 5.1](http://www.macrumors.com/2012/02/16/ios-5-1-pre-gm-seed-leaked-camera-button-japanese-siri/) I found the approach to be simple and intuitive. Most importantly I wanted to make it as close to an iOS feature as possible. 

Here is a demo video of how the tweak would work, produced with Rohit's help.

<iframe src="http://player.vimeo.com/video/38079196?title=0&amp;byline=0&amp;portrait=0" width="720" height="405" frameborder="0">      </iframe>

<br />
<br />
## Next step
I know my way around the iOS SDK but developing this tweak is taking time as I only have the weekends and iOS private APIs are not documented. Its all on a hit and trail basis.

If you are familiar with jailbreak app development and are interested in making this concept a reality feel free to get in touch with me at [hello@whatanapp.com](mailto:hello@whatanapp.com) or [@shubhamgoel](http://twitter.com/shubhamgoel)
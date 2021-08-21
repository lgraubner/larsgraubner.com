---
categories: ["Conferences"]
date: 2016-10-13T12:00:00+02:00
description: "This year in September it was all about popcorn, nachos and code again. This is a recap of the code.talks 2016 conference and the best talks I attended."
title: "Recap code.talks 2016"
url: "/blog/conferences/recap-code-talks-2016"
---

This year in September it was all about popcorn, nachos and code again. The code.talks conference took place in Hamburg in a new location with lots of great talks. This is a recap of the best talks I attended and the conference at all.

The [code.talks conference][1] takes place every September in Hamburg since 2014. It's one of the biggest conferences in Europe and covers a variety of web development talks. It has a very nice atmosphere and feels just like the right place to be as developer. Next to the talks there are lots of booths where you get informed about the companies and might get some gimmicks. Finally on the first day the infamous party takes place.

The following talks stood out as they were performed very well and had excellent content you can learn a lot from.

## Flow vs TypeScript &#8211; Type Systems for JavaScript

You should use a Type System. Thats the essence of this great talk from Oliver Zeigermann. It's easy to start using, as the basic functionality is quite easy to grasp. Also the differences in the basic usage between [Flow][2] and [TypeScript][3] are minimal. Only the way they analyze code is different. TypeScript is a compiler whereas Flow is a checker. Oliver Zeigermann greatly points out the differences in the advanced topics such as how non-nullable types are handled.

Hearing this talk definitely encourages to use a Type System for the next project. I will try to dig deeper in Flow and implement type checking more often. Flow wins for me as it doesn't have to compile. You only have to strip away the annotations on build. Also with Flow it's not mandatory to use it everywhere. That's a good point to implement it step by step for existing code bases.

[View Slides][4]

## AMP tries to fix the web. What can we learn from it?

Another great talk was from Stefan Judis. He explains how [Googles AMP][5] can be so incredible fast. By showing how it works he points out that AMP is essentially just a collection of best practices. As those best practices are forced you get that amazing speed. But this also implies you can follow it's techniques without using AMP all together. It tackles the optimization topics Ressource Priorities, Reflow Management, Animations, Fonts and more.

The talk includes a lot of tricks you can learn from AMP and start using today to speed up your website. Performance is a very important aspect you should not ignore. Personally I got more insights of how AMP is working and what it's doing right.

[View Slides][6]

## Summary

The code.talks 2016 was a great experience with lots of interesting talks. If you have the chance to attend next year you totally should. I can't recommend it enough. The talks are in german and english in case you are not that familiar with german. See you next year!

[1]: https://www.codetalks.de/
[2]: https://flowtype.org/
[3]: https://www.typescriptlang.org/
[4]: http://djcordhose.github.io/flow-vs-typescript/flow-typescript-2.html#/
[5]: https://www.ampproject.org/
[6]: https://speakerdeck.com/stefanjudis/amp-tries-to-fix-the-web-what-can-we-learn-from-it

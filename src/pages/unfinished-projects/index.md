---
title: Learning from unfinished projects
date: 2018-09-09T09:11:00+00:00
description: 'Unfinished projects are not wasted time. You can still learn from them. Read more about why.'
---

Probably every programmer has a couple or a lot of unfinished projects lying around. This might seem like a failure, but don't feel bad! You can still learn a lot from them and use them as resources for future (hopefully finished) projects.

Recently I wrote an URL shortener with [Laravel](https://laravel.com/). I wanted to try if I can build something similar to [bit.ly](https://bitly.com/) and also wanted to refresh my knowledge of Laravel. Also I thought it would be cool to have my own URL shortener. I mostly copied the functionality of bit.ly, but built only the REST API part. It's kinda finished and could be used. Now it's lying around, not deployed and doing nothing.

## Value what you have

This is probably bad. I spend quite some time tweaking the API and think it turned out pretty good. Why didn't I deployed it and use it? My need for an URL shortener is narrow, I barely use any. I looked for a short domain name to use for it, but was not satisfied. Although all this would be just the last percent to finish it I will probably not do it in the near feature. But still I don't think this is a failure for various reasons.

### Learning in the process

While I did some stuff with Laravel I was kinda rusty using it, as I'm not using it in my day job. Also I didn't used the newest version yet. Building the URL shortener I learned a lot and refreshed my Laravel knowledge. I plan to build more things with Laravel in the future. It's awesome and very quick and easy to build things. The best way learning somethings is building things with the technology you want to get better with. While todo lists are okay they lack more complex features which you might need to build later. Real world projects like this are much better.

### Using it as a resource

When building a project you most likely do some research for some topics to get them right. The API needed some kind of authentication, therefore I implemented JWT (JavaScript web tokens) with an OAuth package. I was not entirely sure how that works beforehand. When I'm creating something new in the future I will probably not remember the details and would have to do the research again. Then this "failed" project comes in handy. I can look throught my well researched code and copy the parts I need. This way I can save some time for actual features.

### Share it

Mostly if I start a new project I create a private repository on Github. Not because every project is not meant to be public, but to check if I persist doing it first. Even if you didn't finish your project make your code public to let others learn from it. Make sure to point out the state of the project in the `README` to avoid frustration if others are trying to use it.

## Conclusion

Writing code is mostly never a failure as you always learn from it in many ways. Just now I open sourced two projects: The [URL shortener](https://github.com/lgraubner/url-shortener) mentioned above and an static site generator called [zelos](https://github.com/lgraubner/zelos). I initially wrote it to remake this blog, but rather decided to stick to [GatsbyJS](https://www.gatsbyjs.org/). It's fully working, but just not sufficient for my use case which I realised too late. Anyway I'm proud of the CLI code structure. Maybe you find this useful.

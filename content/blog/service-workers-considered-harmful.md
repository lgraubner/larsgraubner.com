---
categories: ["JavaScript"]
title: "Service workers considered harmful"
date: 2018-11-17T12:00:00+02:00
description: "Service workers are an exciting new technology but they should not be used thoughtless as they
can do great damage to your site if used incorrect."
url: "/blog/javascript/service-workers-considered-harmful"
---

Service workers are an exciting new technology which allows to intercept network traffic. Cool stuff like saving content for offline usage and advanced caching is possible. They are as powerful as they are dangerous.

There are a lot of things that can go wrong. Users might not get the new version of a page anymore. The only way to recover from this is removing the local service worker, which persists over page reloads and browser sessions. Unfortunately this is not as easy as clearing the browser cache and common users are stuck with a bad version of it.

## Hard to grasp

And this Problem is not limited to novices, even experienced developers happen to run into those problems. This technology is quite new and it's not that easy to understand what's going on (although not impossible). Therefore different abstractions come up such as [Service Worker Precache](https://github.com/GoogleChromeLabs/sw-precache) from Google. Abstractions make complex code easy to use, but does not help understanding it's implications. This is dangerous.

<blockquote class="twitter-tweet" data-lang="de"><p lang="en" dir="ltr">Service workers are opt-in in the next version of Create React App. They are an amazing technology but the pitfalls today are too significant to be a good default. Will revisit in a year or two! <a href="https://t.co/UPqiLKnZzB">pic.twitter.com/UPqiLKnZzB</a></p>&mdash; Dan Abramov (@dan_abramov) <a href="https://twitter.com/dan_abramov/status/954146978564395008?ref_src=twsrc%5Etfw">19. Januar 2018</a></blockquote>

Recently the [Create React App](https://github.com/facebook/create-react-app) maintainers made the usage of service workers in v2 opt-in instead of enabled by default which it previously was. I think this is a step into the right direction as it should only be used if you considered and reviewed it carefully. Kent C. Dodds, who is a renowned person in the React ecosystem, had serious problems with a service worker which prevented users from seeing the buy button on the updated page. This is the worst case that can happen.

<blockquote class="twitter-tweet" data-lang="de"><p lang="en" dir="ltr">We had a bad service worker 😔<br>Glad you figured it out and bought the course! Thanks!</p>&mdash; Kent C. Dodds (@kentcdodds) <a href="https://twitter.com/kentcdodds/status/1053241715153227777?ref_src=twsrc%5Etfw">19. Oktober 2018</a></blockquote>

## Evaluate

Don't get me wrong: Service workers are an awesome piece of technology and incredibly useful for progressive web apps and other use cases. But you have to be more than careful when implementing them.

I decided to remove the [gatsby-plugin-offline](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-offline) from this site for the reasons stated above. It's as easy as throwing a single line into the Gatsby.js config to enable it, but comes at the cost of trusting others to not make any mistakes which is unlikely. The amount of effort to dig into it and struggles which can occur do not satisfy the benefits for this site.

Decide for yourself and the requirements of your project if it's really necessary to have a service worker and behave accordingly.

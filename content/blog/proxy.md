---
categories: ["JavaScript"]
title: "A practical use case for a JavaScript Proxy"
date: 2019-06-28T12:00:00+02:00
description: "Until now I never came across a use case for a JavaScript Proxy. In this case I'm using it to make all keys to access an object case insensitive."
url: "/blog/javascript/proxy"
---

When JavaScript Proxies were introduced I was excited. It sounded like a nice feature, but after all I was lacking any practical use cases. Until now! Some days ago I was refactoring some code and came across an object which had upper cased keys for it's content. I really wanted to make them lower case for consistency, but those keys also exist on users devices local state. So just changing them in the codebase would break it for them. To switch to lower case keys anyways I remembered JavaScript Proxy.

With [JavaScript Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) you can hook into objects getter and setter mechanism. So my idea was to make an Proxy to access object values with case insensitive keys. That's actually really ease to implement:

```JavaScript
function caseInsensitive(target) {
  return new Proxy(target, {
    get: (obj, key) => obj[key.toLowerCase()]
    set: (obj, key, value) => {
      obj[key.toLowerCase()] = value
      // required, see https://lrs.link/proxy
      return true
    }
  });
}
```

As you can see the getters and setters just lower case any key used to access the object. This way all of the following works:

```JavaScript
const animals = caseInsensitive({
  species: 'monkey'
})

animals['SPECIES'] // monkey

animals['SpEcIeS'] = 'giraffe'
animals['species']// giraffe
```

Simple, but effective this suits my needs. Finally I can say I have used JavaScript proxies to solve a problem. If you know any other use cases [let me know](/contact)!

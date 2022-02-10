---
date: 2021-09-29
description:
title: Correct CSS pseudo-element Syntax
tags:
    - css
---

Today a colleague of mine pointed out, that the correct syntax for CSS pseudo-elements consists of two colons.

```css
div::after {
    ...;
}
```

I have been using a single colon in the past, which works fine in all browsers, but is not correct regarding the CSS3 specification. The single colon was used in the CSS2 specification but changed to separate pseudo-classes (`:hover` etc.) and pseudo-elements (`::after` etc.).

There are no downsides in using a single colon, but I didn't knew about the difference and found it interesting. You can learn more at the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements#syntax).

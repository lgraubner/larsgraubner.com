---
categories: ["React"]
date: 2016-10-18T12:00:00+02:00
description: "Sometimes it's useful to detect clicks outside of a React component. Learn how to achieve this by attaching an native event handler to the document."
title: "Handle clicks outside of React components"
url: "/blog/react/handle-outside-clicks"
---

Sometimes it's useful to detect clicks outside of a React component to alter its state. A common use case could be a popover which should close if clicked outside of it. This post describes how to implement this into your React component.

As a developer you want to guarantee an excellent user experience, so you have to satisfy the habits of them. Taking a popover as example, users expect to close it when they click outside of it. Using React we now have a problem. Everything outside of the component is not in the scope of it's event listeners. You could try to catch the clicks on the parent components and pass it through, but this adds a lot of bloat. Another attempt could be to add an invisible overlay which catches the click. But this requires the user to click twice to interact with something else on the page.

To solve this problem we avoid the React Event System. React builds a wrapper around native events to handle them. Instead we attach an event directly to the DOM. Just like in the old days without React. But first let's create a simple component.

```javascript
class Popover extends React.Component {
  constructor() {
    super()

    this.handleClick = this.handleClick.bind(this)

    this.state = {
      popupVisible: false
    }
  }

  handleClick() {
    this.setState((prevState) => ({
      popupVisible: !prevState.popupVisible
    }))
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Toggle Popover</button>
        {this.state.popupVisible && (
          <div className="popover">I'm a popover!</div>
        )}
      </div>
    )
  }
}
```

This is a quite simple component which toggles a `div` whenever the button is clicked. To reference the node we have to alter the render method:

```javascript
render() {
    return (
      <div
        className="popover-wrapper"
        // ref callback for storing node reference
        ref={node => { this.node = node; }}
      >
        <button
          onClick={this.handleClick}
        >
          Toggle Popover
        </button>
        {this.state.popupVisible && (
         <div
            className="popover"
          >
            I'm a popover!
          </div>
         )}
      </div>
    );
  }
}
```

This is the preferred way to get the associated DOM node. Now we can attach our event handler. Beware that only full components can reference it's nodes using the [ref callback attribute][1]. By design it's not possible for [stateless components][2] to access the respective DOM element.

```javascript
class Popover extends React.component {
  constructor() {
    super();

    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    ...
  }

  handleClick() {
    // attach/remove event handler
    if (!this.state.popupVisible) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
       popupVisible: !prevState.popupVisible,
    }));
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }

    this.handleClick();
  }
}
```

The `handleOutsideClick` function is called when the user clicks anything on your page but the component itself. The handler alters the state and the popover will be hidden. To make sure to stop listening as soon as the element gets hidden we remove the listener.

And that's it. By being able to catch clicks outside of your component you can do all kind of stuff. In our case close the popover. You can check out a demo and the full code on [codepen][3].

## Conclusion

As you can see it's not that hard to detect clicks outside of a React component, although it's a little ugly as you have to bypass the React event system. Make sure to clean up behind you and not leaving dozens of event listeners on your `document`.

[1]: https://facebook.github.io/react/docs/more-about-refs.html
[2]: https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
[3]: http://codepen.io/graubnla/pen/EgdgZm

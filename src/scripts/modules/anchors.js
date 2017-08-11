/**
 * Adds anchor links to content headings.
 * @module common
 */
const anchors = () => ({
  init: () => {
    const headingNodes = document.querySelectorAll('h1,h2,h3,h4,h5,h6');
    if (headingNodes.length) {
      Array.from(headingNodes)
        .filter(heading => heading.hasAttribute('id'))
        .map(heading => {
          const link = document.createElement('a');
          link.href = `#${heading.getAttribute('id')}`;
          return heading.appendChild(link);
        });
    }
  },
});

export default anchors;

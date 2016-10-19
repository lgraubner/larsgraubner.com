/**
 * Loads an image
 * @param {string} url - Image url to load
 * @return {Promise}
 */
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      resolve(image);
    };

    image.onerror = () => {
      const msg = `Could not load image at ${url}`;
      reject(new Error(msg));
    };

    image.src = url;
  });
}

export default loadImage;

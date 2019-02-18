import '@webcomponents/webcomponentsjs/webcomponents-bundle';

const canUsePicture = (() => {
  const image = new Image();

  return 'srcset' in image;
})();

class CustomPicture extends HTMLElement {
  constructor() {
    super();

    const childNodes = this.childNodes;

    this.img = [...childNodes].find(node => {
      return (
        node instanceof HTMLElement && node.tagName.toLowerCase() === 'img'
      );
    });

    this.sourceList = [...childNodes].filter(node => {
      return (
        node instanceof HTMLElement && node.tagName.toLowerCase() === 'source'
      );
    });
  }

  connectedCallback() {
    if (canUsePicture) {
      const pictureEl = document.createElement('picture');

      this.sourceList.forEach(source => {
        pictureEl.appendChild(source);
      });

      pictureEl.appendChild(this.img);

      this.innerHTML = '';
      this.appendChild(pictureEl);
    } else {
      this.sourceList.forEach(source => {
        const image = new Image();
        image.src = source.getAttribute('srcset');
        image.dataset.media = source.getAttribute('media');

        this.appendChild(image);
      });

      this.appendChild(this.img);

      window.addEventListener(
        'resize',
        () => {
          const showImage = [...this.querySelectorAll('img')].find(img => {
            return (
              img.dataset.media && window.matchMedia(img.dataset.media).matches
            );
          });

          if (showImage) {
            showImage.style.display = '';
            [...this.querySelectorAll('img')]
              .filter(img => img !== showImage)
              .forEach(img => {
                img.style.display = 'none';
              });
          } else {
            [...this.querySelectorAll('img[data-media]')].forEach(img => {
              img.style.display = 'none';
            });

            this.img.style.display = '';
          }
        },
        false
      );
    }
  }
}

window.addEventListener('load', () => {
  customElements.define('x-picture', CustomPicture);
});

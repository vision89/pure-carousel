import styles from '../scss/styles.scss';

let template = `
    <style>${styles.toString()}</style>
    <div class="carousel">
        <button id="prev-button"><</button>
        <img src="" alt="Carousel Image">
        <button id="next-button">></button>
    </div>
`;

class PureCarousel extends HTMLElement {
    constructor() {
        super();

        // Properties
        this._images = [];
        this._onSelect = (a) => {return a};
        this.selectedImage;
        this.imageIndex = 0;
        this.width=this.getAttribute('width');
        this.height=this.getAttribute('height');

        // Add a shadow DOM
        let shadowDOM = this.attachShadow({mode: 'open'});

        // Render the template in the shadow dom
        shadowDOM.innerHTML = template;
        //shodowDOM.appendChild(template.content.cloneNode(true));

        // Method binding

    }

    set images (imgs) {
        this._images = imgs;
        this.renderChange();
    }

    set onSelect(fn) {
        this._onSelect = fn;
    }

  // any attribute specified in the following array will automatically
  // trigger attributeChangedCallback when you modify it.
  /*
  static get observedAttributes() {
    return ['images'];
  }
  */

  connectedCallback() {
      let prevButton = this.shadowRoot.querySelector('#prev-button');
      let nextButton = this.shadowRoot.querySelector('#next-button');
      let imgElm = this.shadowRoot.querySelector('img');
      prevButton.onclick = this.prevImage.bind(this);
      nextButton.onclick = this.nextImage.bind(this);
      imgElm.onclick = this.selectImage.bind(this);
  }

  renderChange() {
    this.selectedImage = this._images[this.imageIndex];
    let imgElm = this.shadowRoot.querySelector('img');
    imgElm.src = `${this.selectedImage}`;
    imgElm.style.width = this.width;
    imgElm.style.height = this.height;
  }

  // Mark: - Component lifecycle
  attributeChangedCallback(attr, oldVal, newVal) {
    // Nothing to do here
    if(oldVal === newVal) return;
    switch(attr) {};
  }

  nextImage(evt) {
    if(this.imageIndex === this._images.length - 1) this.imageIndex = 0;
    else this.imageIndex++;
    this.renderChange();
    evt.stopPropagation();
  }

  prevImage(evt) {
    if(this.imageIndex === 0) this.imageIndex = this._images.length - 1;
    else this.imageIndex--
    this.renderChange();
    evt.stopPropagation();
  }

  selectImage(evt) {
    this._onSelect(this.imageIndex);
    evt.stopPropagation();
  }

}

export default PureCarousel;
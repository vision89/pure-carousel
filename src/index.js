import PureCarousel from './lib/carousel'
import batman from './images/batman.jpeg'
import batman2 from './images/batman2.jpg'

customElements.define('pure-carousel', PureCarousel);

let pureCarousel = document.querySelector('pure-carousel');

//pureCarousel.setAttribute('images', [batman, batman2]);
pureCarousel.images = [batman, batman2];
pureCarousel.onSelect = imageUpdated;

function imageUpdated(img) {
    console.log('Selected Image: ', img);
}
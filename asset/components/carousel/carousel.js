import * as lib from 'Lib/carousel/carousel.js';

const Carousel = lib.carousel;

Carousel.prototype = {
  constructor: Carousel,
  init: lib.init,
  setListeners: lib.setListeners,
  nextSlide: lib.nextSlide,
  prevSlide: lib.prevSlide,
  changeSlide: lib.changeSlide,
  activateSlide: lib.activateSlide,
  deactivateSlide: lib.deactivateSlide,
  disableControl: lib.disableControl,
  undisableControl: lib.undisableControl,
  handleEvent: lib.handleEvent,
};

export default Carousel;

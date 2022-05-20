import * as lib from 'Lib/ownCarousel/customOwnCarousel';

const OwnCarousel = lib.customOwnCarousel;

OwnCarousel.prototype = {
  constructor: OwnCarousel,
  init: lib.init,
  setListeners: lib.setListeners,
  translateSlide: lib.translateSlide,
  moveSlide: lib.moveSlide,
  resetSlide: lib.resetSlide,
  openGallery: lib.openGallery,
  closeGallery: lib.closeGallery,
  debounce: lib.debounce,
  adaptive: lib.adaptive,
  updateSize: lib.updateSize,
  updateActivePicker: lib.updateActivePicker,
  createPickers: lib.createPickers,
  activateSlide: lib.activateSlide,
  createTabsMap: lib.createTabsMap,
  setTabObserver: lib.setTabObserver,
};

export default OwnCarousel;

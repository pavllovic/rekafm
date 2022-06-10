const Gallery = function(elem) {
  this.gallery = elem;
  this.btnClose = this.gallery.querySelector('[data-gallery="close"]');
  this.btnOpen = this.gallery.querySelector('[data-gallery="open"]');
  this.thumbs = this.gallery.querySelector('.js-swiper-thumb .swiper-wrapper');
};

Gallery.prototype = {
  init: function() {
    this.setListeners();
    this.initialWidthGallery = this.gallery.offsetWidth;
    this.gallery.style.setProperty('--g-width', this.initialWidthGallery);
  },

  setListeners: function() {
    this.btnClose.addEventListener('click', () => this.closeGallery());
    this.btnOpen.addEventListener('click', () => this.openGallery());
  },

  openGallery: function() {
    this.gallery.style.setProperty('--g-width', window.screen.width);
    document.body.classList.add('open-gallery');
  },
  closeGallery: function() {
    this.gallery.style.setProperty('--g-width', this.initialWidthGallery);
    this.gallery.classList.add('close');
    document.body.classList.remove('open-gallery');
    window.scrollTo({ top: 0, behavior: 'instant' });
    this.thumbs.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      this.gallery.classList.remove('close');
    }, 600);
  },
};

export default Gallery;

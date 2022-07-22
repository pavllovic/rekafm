const Gallery = function(elem) {
  this.gallery = elem;
  this.btnClose = this.gallery.querySelector('[data-gallery="close"]');
  this.btnOpen = this.gallery.querySelector('[data-gallery="open"]');
  this.thumbs = this.gallery.querySelector('.js-swiper-thumb .swiper-wrapper');
  this.countSlides = this.gallery.querySelectorAll('.swiper-slide.ui-thumb').length;
  this.controls = this.gallery.querySelector('.controls');
};

Gallery.prototype = {
  init: function() {
    this.setListeners();
    const viewportHeight = window.screen.height;
    const headerHeight = document.querySelector('.header').offsetHeight;
    const scale = 1 - (headerHeight / (viewportHeight / 100)) / 100;
    this.gallery.style.setProperty('--scale-y', scale);
    this.showCountSlides();
    this.setHeightControls();
  },

  setListeners: function() {
    this.btnClose.addEventListener('click', () => this.closeGallery());
    this.btnOpen.addEventListener('click', () => this.openGallery());
  },

  openGallery: function() {
    document.body.classList.add('open-gallery');
  },

  showCountSlides: function() {
    const btn = this.gallery.querySelector('[data-gallery="open"]');
    const btnText = btn.querySelector('.text');
    const count = this.countSlides - 5;
    this.countSlides > 5
      ? btnText.innerText = `+${count}`
      : btn.classList.add('is-hidden');
  },

  setHeightControls: function() {
    if(this.countSlides < 5) {
      const thumb = this.gallery.querySelector('.swiper-slide.ui-thumb');
      const thumbHeight = thumb.offsetHeight;
      const thumbMargin = +(window.getComputedStyle(thumb).marginBottom.slice(0, -2));
      const height = (this.countSlides * thumbHeight + (this.countSlides - 1) * thumbMargin);
      this.controls.style.setProperty('--height', `${height}px`);
    }
  },

  closeGallery: function() {
    this.gallery.classList.add('close');
    document.body.classList.remove('open-gallery');
    window.scrollTo({ top: 0, behavior: 'instant' });
    this.thumbs.scrollTo({ top: 0 });
    setTimeout(() => {
      this.gallery.classList.remove('close');
    }, 600);
  },
};

export default Gallery;

export function carousel(elem) {
  this.carousel = elem;
  this.controls = this.carousel.querySelectorAll('[aria-controls]');
}

export function init() {
  this.setListeners();
  this.disableControl(this.carousel.querySelector('[data-carousel="prev-slide"]'));
  this.activateSlide(this.carousel.querySelector('[data-carousel="slide"]'));
}

export function setListeners() {
  this.controls.forEach((control) => {
    control.addEventListener('click', this);
  });
}

export function nextSlide(control) {
  this.activateSlide(this.activeSlide.nextElementSibling);
  if(!this.activeSlide.nextElementSibling) this.disableControl(control);
}

export function prevSlide(control) {
  this.activateSlide(this.activeSlide.previousElementSibling);
  if(!this.activeSlide.previousElementSibling) this.disableControl(control);
}

export function changeSlide(control) {
  this.undisableControl();
  (control.dataset.carousel === 'next-slide') ? this.nextSlide(control) : this.prevSlide(control);
}

export function deactivateSlide(slide) {
  slide.classList.remove('is-active');
}

export function activateSlide(slide) {
  if(this.activeSlide) this.deactivateSlide(this.activeSlide);
  slide.classList.add('is-active');
  this.activeSlide = slide;
}

export function undisableControl() {
  this.disabledControl.removeAttribute('disabled');
}

export function disableControl(control) {
  control.setAttribute('disabled', true);
  this.disabledControl = control;
}

export function handleEvent(e) {
  switch(e.type) {
    case 'click':
      e.stopPropagation();
      if(e.currentTarget !== this.disableControl) this.changeSlide(e.currentTarget);
      break;
    default:
      break;
  }
  return undefined;
}

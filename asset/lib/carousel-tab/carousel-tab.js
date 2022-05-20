import { KeysActions, getActionFromKey } from 'Lib/keyActions/KeysActions.js';

export function carouselTab(elem) {
  this.carousel = elem;
  this.tablist = this.carousel.querySelector('[role="tablist"]');
}

export function init() {
  this.setListeners();
  this.disableControl(this.carousel.querySelector('[data-carousel="prev-slide"]'));
  this.activateSlide(this.carousel.querySelector('[data-carousel="slide"]'));
  this.focusTab(this.tablist.firstElementChild);
  this.activateTab(this.tablist.firstElementChild);
}

export function setListeners() {
  this.carousel.addEventListener('click', this);
  this.carousel.addEventListener('keydown', this);
}

export function nextSlide(control) {
  this.activateSlide(this.activeSlide.nextElementSibling);
  this.focusTab(this.activeTab.nextElementSibling);
  this.activateTab(this.activeTab.nextElementSibling);
  if(!this.activeSlide.nextElementSibling) this.disableControl(control);
}

export function prevSlide(control) {
  this.activateSlide(this.activeSlide.previousElementSibling);
  this.focusTab(this.activeTab.previousElementSibling);
  this.activateTab(this.activeTab.previousElementSibling);
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

export function unfocusTab(tab) {
  tab.classList.remove('is-focus');
}

export function focusTab(tab) {
  if(this.focusedTab) this.unfocusTab(this.focusedTab);
  tab.classList.add('is-focus');
  this.focusedTab = tab;
}

export function deactivateTab(tab) {
  tab.setAttribute('tabindex', '-1');
  tab.setAttribute('aria-selected', false);
}

export function activateTab(tab) {
  if(this.activeTab) this.deactivateTab(this.activeTab);
  tab.setAttribute('tabindex', '0');
  tab.setAttribute('aria-selected', true);
  this.activeTab = tab;
}

export function onclickTab(tab) {
  const id = tab.getAttribute('aria-controls');
  this.activateSlide(this.carousel.querySelector(`#${id}`));
  this.activateTab(tab);
  this.focusTab(tab);
  this.undisableControl();
  if(tab === this.tablist.firstElementChild) {
    const control = this.carousel.querySelector('[data-carousel="prev-slide"]');
    this.disableControl(control);
  }
  if(tab === this.tablist.lastElementChild) {
    const control = this.carousel.querySelector('[data-carousel="next-slide"]');
    this.disableControl(control);
  }
}

export function onkeydown(e) {
  const action = getActionFromKey(e, true);

  switch(action) {
    case KeysActions.Left:
      e.preventDefault();
      if(this.focusedTab.previousElementSibling) {
        return this.focusTab(this.focusedTab.previousElementSibling);
      }
      break;
    case KeysActions.Right:
      e.preventDefault();
      if(this.focusedTab.nextElementSibling) {
        return this.focusTab(this.focusedTab.nextElementSibling);
      }
      break;
    case KeysActions.Space:
    case KeysActions.CloseSelect:
      e.preventDefault();
      return this.onclickTab(this.focusedTab);
    case KeysActions.First:
      e.preventDefault();
      return this.focusTab(this.tablist.firstElementChild);
    case KeysActions.Last:
      e.preventDefault();
      return this.focusTab(this.tablist.lastElementChild);
    default:
      break;
  }
  return undefined;
}

export function handleEvent(e) {
  switch(e.type) {
    case 'click':
      e.stopPropagation();
      if(e.target.getAttribute('role') === 'tab') return this.onclickTab(e.target);
      if(e.target.hasAttribute('aria-controls') && e.target !== this.disableControl) {
        return this.changeSlide(e.target);
      }
      break;
    case 'keydown':
      if(e.target.getAttribute('role') === 'tab') return this.onkeydown(e);
      break;
    default:
      break;
  }
  return undefined;
}

export function nav(parent) {
  this.btnOpen = parent.querySelector('[data-nav="open"]');
  this.btnClose = parent.querySelector('[data-nav="close"]');
  this.menu = parent.querySelector('[data-nav="menu"]');
  // state nav
  this.open = false;
}

export function init() {
  this.setListeners();
}

export function setListeners() {
  this.btnOpen.addEventListener('click', this);
  this.btnClose.addEventListener('click', this);
}

export function openMenu() {
  this.btnOpen.setAttribute('aria-expanded', 'true');
  this.menu.classList.add('is-active');
}

export function closeMenu() {
  this.btnOpen.setAttribute('aria-expanded', 'false');
  this.menu.classList.remove('is-active');
}

export function toogleMenu() {
  this.open ? this.closeMenu() : this.openMenu();
  this.open = !this.open;
}

export function destroy() {
  this.btnOpen.removeEventListener('click', this);
}

export function handleEvent(e) {
  switch(e.type) {
    case 'click':
      return this.toogleMenu();
    default:
      break;
  }
  return undefined;
}

export function dropdownMenu(menu) {
  this.menu = menu;
  this.openItem = false;
}

export function init() {
  this.setListeners();
}

export function setListeners() {
  this.menu.addEventListener('click', this);
}

export function openSubmenu(item) {
  if(this.openItem) this.closeSubmenu();
  // const menu = item.nextElementSibling;
  const menu = item.querySelector('[data-dropdown="panel"]');
  item.classList.add('is-open');
  this.setHeightDropdownMenu(menu);
  this.openItem = item;
}

export function closeSubmenu() {
  // const menu = this.openItem.nextElementSibling;
  const menu = this.openItem.querySelector('[data-dropdown="panel"]');
  this.openItem.classList.remove('is-open');
  this.removeHeightDropdownMenu(menu);
  this.openItem = false;
}

export function setHeightDropdownMenu(elem) {
  const menu = elem;
  const content = menu.querySelector('[data-dropdown="content"]');
  const height = content.offsetHeight;
  menu.style.setProperty('--height-dropdown', height);
}

export function removeHeightDropdownMenu(elem) {
  const menu = elem;
  menu.style.setProperty('--height-dropdown', 0);
}

export function toogleSubmenu(item) {
  item === this.openItem ? this.closeSubmenu() : this.openSubmenu(item);
}

export function destroy() {
  this.menu.removeEventListener('click', this);
}

export function handleEvent(e) {
  switch(e.type) {
    case 'click':
      const isBtn = e.target.closest('[data-dropdown="btn"]');
      if(isBtn) return this.toogleSubmenu(isBtn);
      break;
    default:
      break;
  }
  return undefined;
}

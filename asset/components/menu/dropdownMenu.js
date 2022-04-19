import * as lib from 'Lib/dropdownMenu/dropdownMenu.js';

const DropdownMenu = lib.dropdownMenu;

DropdownMenu.prototype = {
  constructor: DropdownMenu,
  init: lib.init,
  setListeners: lib.setListeners,
  openSubmenu: lib.openSubmenu,
  closeSubmenu: lib.closeSubmenu,
  toogleSubmenu: lib.toogleSubmenu,
  setHeightDropdownMenu: lib.setHeightDropdownMenu,
  removeHeightDropdownMenu: lib.removeHeightDropdownMenu,
  destroy: lib.destroy,
  handleEvent: lib.handleEvent,
};

export default DropdownMenu;

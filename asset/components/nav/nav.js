import * as lib from 'Lib/nav/nav.js';

const Nav = lib.nav;

Nav.prototype = {
  constructor: Nav,
  init: lib.init,
  setListeners: lib.setListeners,
  openMenu: lib.openMenu,
  closeMenu: lib.closeMenu,
  toogleMenu: lib.toogleMenu,
  destroy: lib.destroy,
  handleEvent: lib.handleEvent,
};

export default Nav;

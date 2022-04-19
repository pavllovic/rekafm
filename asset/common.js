import 'Styles/common.css';
import Nav from './components/nav/nav.js';
import DropdownMenu from './components/menu/dropdownMenu';
import Ticker from './components/ticker/ticker';

const initNav = () => {
  const navElement = document.querySelector('.js-nav');
  const nav = new Nav(navElement);
  nav.init();
  return nav;
};

const initMenu = () => {
  const arrMenu = document.querySelectorAll('.js-menu');
  arrMenu.forEach((item) => {
    const menu = new DropdownMenu(item);
    menu.init();
  });
};

const initTicker = () => {
  const arrTickers = document.querySelectorAll('.js-ticker');
  arrTickers.forEach((item) => {
    const ticker = new Ticker(item);
    ticker.init();
  });
};

initMenu();
initNav();

window.addEventListener('load', initTicker);
window.initNav = initNav;

if (module.hot) {
  module.hot.accept();
}

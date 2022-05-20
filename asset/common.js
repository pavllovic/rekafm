import 'Styles/common.css';
import Nav from './components/nav/nav.js';
import DropdownMenu from './components/menu/dropdownMenu';
import Ticker from './components/ticker/ticker';
import Modal from './components/modal/modal';
import { modal } from './lib/modal/modal.js';
import CustomCursor from './components/customCursor/customCursor.js';
import FormValidator from './lib/formValidator/formValidator.js';
import OrderCallForm from './components/form/OrderCallForm.js';

const initFormOrderCall = function() {
  const formElem = document.querySelector('.js-order-call');
  const formValidator = new FormValidator(formElem);
  const form = new OrderCallForm(formElem);
  formValidator.init();
  form.init();
  return { form, formValidator };
};

const initTickerCustomCursor = () => {
  const cursorParent = document.querySelector('.js-ticker');
  const area = cursorParent.querySelector('.ticker-content');
  const customCursor = new CustomCursor(cursorParent, area);
  customCursor.init();
  return customCursor;
};

const initModalCall = () => {
  const modalElement = document.querySelector('.js-modal-call');
  const modalCall = new Modal(modalElement);
  modalCall.init();
  return modal;
};

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
initModalCall();
initTickerCustomCursor();
initFormOrderCall();

window.addEventListener('load', initTicker);
window.initNav = initNav;
window.initModalCall = initModalCall;
window.initTickerCustomCursor = initTickerCustomCursor;
window.initFormOrderCall = initFormOrderCall;

if (module.hot) {
  module.hot.accept();
}

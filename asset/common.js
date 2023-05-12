import 'Styles/common.css';
import IMask from 'imask';
import Nav from './components/nav/nav.js';
import DropdownMenu from './components/menu/dropdownMenu';
import Ticker from './components/ticker/ticker';
import Modal from './components/modal/modal';
import CustomCursor from './components/customCursor/customCursor.js';
import FormValidator from './lib/formValidator/formValidator.js';
import OrderCallForm from './components/form/OrderCallForm.js';
import updateHeightNav from './components/nav/updateHeightNav.js';
import Combobox from './components/UI/ui-select/combobox';

const initInputMask = function() {
  const elements = document.querySelectorAll('.js-inputPhone');
  const phoneMaskOption = {
    mask: '+{7} (000) 000-00-00',
  };
  elements.forEach((elem) => {
    const input = IMask(elem, phoneMaskOption);
    return input;
  });
};

const initSelectService = function() {
  const elements = document.querySelectorAll('.js-select-service');
  elements.forEach((item) => {
    const select = new Combobox(item);
    select.init();
  });
};

const initFormOrderCall = function() {
  const formElem = document.querySelectorAll('.js-order-call');
  formElem.forEach((item) => {
    const formValidator = new FormValidator(item);
    const form = new OrderCallForm(item);
    formValidator.init();
    form.init();
  });
  // window.orderCallForm = form;
  // window.orderCallForm.validator = formValidator;
};

const initTickerCustomCursor = () => {
  const cursorParent = document.querySelector('.js-ticker');
  const area = document.querySelector('.ticker-content');
  if(cursorParent && area) {
    const tickerCustomCursor = new CustomCursor(cursorParent, area);
    tickerCustomCursor.init();
    window.tickerCustomCursor = tickerCustomCursor;
  }
};

const initModalCall = () => {
  const modalElement = document.querySelector('.js-modal-call');
  if(modalElement) {
    const modalCall = new Modal(modalElement);
    modalCall.init();
    window.modalCall = modalCall;
  }
};

const initNav = () => {
  const navElement = document.querySelector('.js-nav');
  if(navElement) {
    const nav = new Nav(navElement);
    nav.init();
    window.nav = nav;
  }
};

const initMenu = () => {
  const menuElements = document.querySelectorAll('.js-menu');
  if(menuElements) {
    const arrMenu = Array.from(menuElements).map((item) => {
      const menu = new DropdownMenu(item);
      menu.init();
      return menu;
    });
    window.arrMenu = arrMenu;
  }
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
initInputMask();
initSelectService();

window.addEventListener('load', () => {
  const elements = document.querySelectorAll('.no-transition');
  elements.forEach((elem) => {
    elem.classList.remove('no-transition');
  });

  updateHeightNav();
  initTicker();
});

if (module.hot) {
  module.hot.accept();
}

import 'Styles/audit.emergency.mamagement.css';
import Carousel from './components/carousel/carousel.js';
import ShowList from './components/showList/showList';
import FormValidator from './lib/formValidator/formValidator.js';
import OrderAuditForm from './components/form/OrderAuditForm.js';

const initCardTariff = () => {
  const cardsTariffElements = document.querySelectorAll('.js-cardTariff');
  if(cardsTariffElements.length !== 0) {
    const cardsTariff = Array.from(cardsTariffElements).map((item) => {
      const card = new ShowList(item);
      card.init();
      return card;
    });
    window.cardsTariff = cardsTariff;
  }
};

window.addEventListener('load', () => {
  initCardTariff();
});

const initCarouselTariff = () => {
  const carouselTariffElem = document.querySelector('.js-carousel');
  if(carouselTariffElem) {
    const carouselTariff = new Carousel(carouselTariffElem);
    carouselTariff.init();
    window.carouselTariff = carouselTariff;
  }
};

initCarouselTariff();

const initFormOrderAudit = function() {
  const formElem = document.querySelector('.js-order-audit');
  if(formElem) {
    const formValidator = new FormValidator(formElem);
    const form = new OrderAuditForm(formElem);
    formValidator.init();
    form.init();
    window.orderAuditForm = form;
    window.orderAuditForm.validator = formValidator;
  }
};

initFormOrderAudit();

if (module.hot) {
  module.hot.accept();
}

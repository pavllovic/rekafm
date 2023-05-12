import 'Styles/audit.emergency.management.css';
import Carousel from './components/carousel/carousel.js';
import ShowList from './components/showList/showList';
import FormValidator from './lib/formValidator/formValidator.js';
import OrderAuditForm from './components/form-order/OrderAuditForm.js';

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

const priceListAudit = [
  { value: [0, 60], price: '11 875' }, { value: [60, 90], price: '13 375' },
  { value: [90, 120], price: '14 750' }, { value: [120, 160], price: '16 125' }, { value: [160, 200], price: '17 500' },
  { value: [200, 250], price: '18 875' }, { value: [250, 300], price: '20 250' }, { value: [300, 380], price: '21 625' },
  { value: [380, 470], price: '23 000' }, { value: [470, 600], price: '24 375' }, { value: [600, 800], price: '25 750' },
  { value: [800, 1000], price: '27 125' }, { value: [1000, 1300], price: '28 500' }, { value: [1300, 1600], price: '29 875' },
  { value: [1600, 1900], price: '31 250' }, { value: [1900, 2300], price: '32 750' }, { value: [2300, 2500], price: '37 500' },
  { value: [2500, 2700], price: '42 500' }, { value: [2700, 2900], price: '48 875' }, { value: [2900, 3200], price: '58 125' },
  { value: [3200, 3600], price: '65 875' }, { value: [3600, 4000], price: '73 250' }, { value: [4000, 4400], price: '80 937' },
  { value: [4400, 4800], price: '88 587' }, { value: [4800, 5200], price: '96 212' }, { value: [5200, 6000], price: '105 687' },
  { value: [6000, 7000], price: '123 000' }, { value: [7000, 8500], price: '149 562' }, { value: [8500, 10000], price: '175 937' },
  { value: [10000, 12000], price: '210 500' }, { value: [12000, 15000], price: '244 750' }, { value: [15000, 19000], price: '309 562' },
  { value: [19000, 24000], price: '390 500' }, { value: [24000, 30000], price: '451 125' }, { value: [30000, 38000], price: '570 937' },
  { value: [38000, 48000], price: '720 375' }, { value: [48000, 60000], price: '826 000' },
];

const initFormOrderAudit = function() {
  const formElem = document.querySelector('.js-order-audit');
  console.log(formElem);
  if(formElem) {
    const formValidator = new FormValidator(formElem);
    const form = new OrderAuditForm(formElem);
    formValidator.init();
    form.init();
    form.setPriceList(priceListAudit);
    window.orderAuditForm = form;
    window.orderAuditForm.validator = formValidator;
  }
};

initFormOrderAudit();

if (module.hot) {
  module.hot.accept();
}

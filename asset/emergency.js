import 'Styles/emergency.css';

import Carousel from './components/carousel/carousel.js';
import ShowList from './components/showList/showList';

const initCardTariff = () => {
  const cardTariffElements = document.querySelectorAll('.js-cardTariff');
  const cardsTariff = Array.from(cardTariffElements).map((item) => {
    const card = new ShowList(item);
    card.init();
    return card;
  });
  window.cardsTariff = cardsTariff;
};

window.addEventListener('load', () => {
  initCardTariff();
});

const carouselTariffElem = document.querySelector('.js-carousel');

const initCarouselTariff = () => {
  const carouselTariff = new Carousel(carouselTariffElem);
  carouselTariff.init();
  window.carouselTariff = carouselTariff;
};

initCarouselTariff();

if (module.hot) {
  module.hot.accept();
}

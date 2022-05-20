import 'Styles/audit.css';
import Carousel from './components/carousel/carousel.js';
import ShowList from './components/showList/showList';

const initCardTariff = () => {
  const cardsTariff = document.querySelectorAll('.js-cardTariff');
  cardsTariff.forEach((item) => {
    const card = new ShowList(item);
    card.init();
  });
};

initCardTariff();

const carouselTariffElem = document.querySelector('.js-carousel');

const initCarouselTariff = () => {
  const carouselTariff = new Carousel(carouselTariffElem);
  carouselTariff.init();
  return carouselTariff;
};

initCarouselTariff();

window.initCarouselTariff = initCarouselTariff;
window.initCardTariff = initCardTariff;

if (module.hot) {
  module.hot.accept();
}

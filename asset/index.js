import 'Styles/index.css';
import Carousel from './components/carousel/carousel.js';
import OwnCarousel from './components/ownCarousel/ownCarousel';
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

const initOwnCarousel = function() {
  const ownCarouselElem = document.querySelector('.js-own-carousel__container');
  const ownCarousel = new OwnCarousel(ownCarouselElem, {
    itemPerRow: 2,
    itemSize: 50,
    responsive: {
      1000: [1, 100],
      // 800: [1, 100],
    },
    autoplay: 10000,
    nav: true,
    draggable: true,
  }, 'X');
  ownCarousel.init();
  return ownCarousel;
};

const initCarouselNews = () => {
  const carouselNewsElem = document.querySelector('.js-carousel');
  const carouselNews = new Carousel(carouselNewsElem);
  carouselNews.init();
  return carouselNews;
};

initFormOrderCall();
initOwnCarousel();
initCarouselNews();

window.initCarouselNews = initCarouselNews;
window.initOwnCarousel = initOwnCarousel;
window.initFormOrderCall = initFormOrderCall;

if (module.hot) {
  module.hot.accept();
}

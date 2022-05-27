import 'Styles/index.css';
import Carousel from './components/carousel/carousel.js';
import OwnCarousel from './components/ownCarousel/ownCarousel';
import FormValidator from './lib/formValidator/formValidator.js';
import OrderCallForm from './components/form/OrderCallForm.js';
// import CustomCursor from './components/customCursor/customCursor.js';

// const initCarouselCustomCursor = () => {
//   const cursorParent = document.querySelector('.js-own-carousel__container');
//   const area = cursorParent;
//   const carouselCustomCursor = new CustomCursor(cursorParent, area);
//   carouselCustomCursor.init();
//   window.carouselCustomCursor = carouselCustomCursor;
// };

// initCarouselCustomCursor();

const initFormOrderCall = function() {
  const formElem = document.querySelector('.js-order-call');
  const formValidator = new FormValidator(formElem);
  const form = new OrderCallForm(formElem);
  formValidator.init();
  form.init();
  window.orderCallForm = form;
  window.orderCallForm.validator = formValidator;
};

const initOwnCarousel = function() {
  const ownCarouselElem = document.querySelector('.js-own-carousel__container');
  const ownCarousel = new OwnCarousel(ownCarouselElem, {
    itemPerRow: 2,
    itemSize: 50,
    responsive: {
      600: [2, 50],
      300: [1, 100],
    },
    autoplay: 10000,
    nav: true,
    draggable: true,
  }, 'X');
  ownCarousel.init();
  window.ownCarousel = ownCarousel;
};

const initCarouselNews = () => {
  const carouselNewsElem = document.querySelector('.js-carousel');
  const carouselNews = new Carousel(carouselNewsElem);
  carouselNews.init();
  window.carouselNews = carouselNews;
};

initFormOrderCall();
initOwnCarousel();
initCarouselNews();

if (module.hot) {
  module.hot.accept();
}

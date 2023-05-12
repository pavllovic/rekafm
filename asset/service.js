import Swiper, { Navigation } from 'swiper';
import 'swiper/css';

Swiper.use([Navigation]);

const initSwiperTeam = function() {
  const swiperTeamElement = document.querySelector('.js-swiper-licenses');
  const swiperTeam = new Swiper(swiperTeamElement, {
    slidesPerView: 1,
    navigation: {
      nextEl: '.control__next',
      prevEl: '.control__prev',
    },
    breakpoints: {
      860: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
    },
  });
  window.swiperTeam = swiperTeam;
};

initSwiperTeam();

if (module.hot) {
  module.hot.accept();
}

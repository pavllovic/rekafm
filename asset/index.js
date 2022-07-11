import 'Styles/index.css';
import Swiper, { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import Carousel from './components/carousel/carousel.js';
// import OwnCarousel from './components/ownCarousel/ownCarousel';

Swiper.use([Autoplay, Navigation, Pagination]);

const initSwiperTeam = function() {
  const swiperTeamElement = document.querySelector('.js-swiper-team');
  const swiperTeam = new Swiper(swiperTeamElement, {
    autoplay: {
      delay: 3000,
    },
    slidesPerView: 1,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      bulletClass: 'item',
      bulletActiveClass: 'active',
    },
    navigation: {
      nextEl: '.control__next',
      prevEl: '.control__prev',
    },
    breakpoints: {
      // when window width is >= 640px
      640: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
    },
    // freeMode: true,
  });
  window.swiperTeam = swiperTeam;
};

initSwiperTeam();

const initCarouselNews = () => {
  const carouselNewsElem = document.querySelector('.js-carousel');
  const carouselNews = new Carousel(carouselNewsElem);
  carouselNews.init();
  window.carouselNews = carouselNews;
};

// initOwnCarousel();
initCarouselNews();

if (module.hot) {
  module.hot.accept();
}

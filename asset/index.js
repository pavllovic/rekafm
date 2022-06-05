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
    // slidesPerView: 'auto',
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

// const initOwnCarousel = function() {
//   const ownCarouselElem = document.querySelector('.js-own-carousel__container');
//   const ownCarousel = new OwnCarousel(ownCarouselElem, {
//     itemPerRow: 2,
//     itemSize: 50,
//     responsive: {
//       600: [2, 50],
//       300: [1, 100],
//     },
//     autoplay: 10000,
//     nav: true,
//     draggable: true,
//   }, 'X');
//   ownCarousel.init();
//   window.ownCarousel = ownCarousel;
// };

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

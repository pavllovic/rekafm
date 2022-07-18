import 'Styles/build.css';
import Swiper, {
  Autoplay, Navigation, Pagination, Thumbs,
} from 'swiper';
import 'swiper/css';
import Map from './components/map/map';
import ShowList from './components/showList/showList';
import Gallery from './components/gallery/gallery';

Swiper.use([Autoplay, Navigation, Pagination, Thumbs]);

const initGallery = function() {
  const galleryElement = document.querySelector('.js-gallery');
  const gallery = new Gallery(galleryElement);
  gallery.init();
  window.gallery = gallery;
};

initGallery();

const initSwiperBuild = function() {
  const thumbElement = document.querySelector('.js-swiper-thumb');
  const swiperBuildElement = document.querySelector('.js-swiper-build');
  const countSlides = swiperBuildElement
    .querySelectorAll('.swiper-slide').length;
  console.log(+countSlides + 6);
  const swiperThumb = new Swiper(thumbElement, {
    direction: 'vertical',
    // freeMode: true,
    slidesPerView: '2.5em',
    speed: 600,
    slideToClickedSlide: true,
    centeredSlides: false,
    threshold: 30,
  });
  const swiperBuild = new Swiper(swiperBuildElement, {
    direction: 'vertical',
    maxBackfaceHiddenSlides: countSlides,
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 600,
    loopPreventsSlide: false,
    loopAdditionalSlides: 4,
    // threshold: 20,
    autoplay: {
      delay: 7000,
    },
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
    thumbs: {
      swiper: swiperThumb,
    },
    // resizeObserver: true,
  });
  window.swiperBuild = swiperBuild;
};

initSwiperBuild();
window.initSwiperBuild = initSwiperBuild;

// const initOwnCarousel = function() {
//   const ownCarouselElem = document.querySelector('.js-own-carousel__container');
//   const ownCarousel = new OwnCarousel(ownCarouselElem, {
//     itemPerRow: 1,
//     itemSize: 100,
//     autoplay: 10000,
//     nav: true,
//     draggable: true,
//   }, 'X');
//   ownCarousel.init();
//   window.ownCarousel = ownCarousel;
// };

// initOwnCarousel();

const initFeatureList = function() {
  const featureListElem = document.querySelector('.js-list-feature');
  const featureList = new ShowList(featureListElem);
  featureList.init();
  window.featureList = featureList;
};

initFeatureList();

const initMap = function() {
  const map = new Map('ymap', {
    zoom: 17,
    center: [0, 0],
  });
  map.init();
  map.createStaticPointLayout();
  window.map = map;
};

initMap();

window.map.addStaticPointOnMap({ coords: [44.898317, 37.354456] });

if (module.hot) {
  module.hot.accept();
}

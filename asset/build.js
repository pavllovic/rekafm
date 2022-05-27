import 'Styles/build.css';
import Map from './components/map/map';
import ShowList from './components/showList/showList';
import OwnCarousel from './components/ownCarousel/ownCarousel';

const initOwnCarousel = function() {
  const ownCarouselElem = document.querySelector('.js-own-carousel__container');
  const ownCarousel = new OwnCarousel(ownCarouselElem, {
    itemPerRow: 1,
    itemSize: 100,
    autoplay: 10000,
    nav: true,
    draggable: true,
  }, 'X');
  ownCarousel.init();
  window.ownCarousel = ownCarousel;
};

initOwnCarousel();

const initFeatureList = function() {
  const featureListElem = document.querySelector('.js-list-feature');
  const featureList = new ShowList(featureListElem);
  featureList.init();
  window.featureList = featureList;
};

initFeatureList();

const initMap = function() {
  const map = new Map('ymap', 17, [44.898317, 37.354456]);
  map.init();
  map.createStaticPointLayout();
  window.map = map;
};

initMap();

window.map.addStaticPointOnMap({ coords: [44.898317, 37.354456] });

if (module.hot) {
  module.hot.accept();
}

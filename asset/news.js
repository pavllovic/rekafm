import 'Styles/news.css';
import Carousel from './components/carousel/carousel.js';

const initCarouselNews = () => {
  const carouselNewsElem = document.querySelector('.js-carousel');
  const carouselNews = new Carousel(carouselNewsElem);
  carouselNews.init();
  return carouselNews;
};

initCarouselNews();

window.initCarouselNews = initCarouselNews;

if (module.hot) {
  module.hot.accept();
}

import 'Styles/commerce.css';
import Map from './components/map/map';
import Tabs from './components/tabs/tabs';
import CommerceFilter from './components/commerceFilter/commerceFilter';
import TablistView from './components/tablistView/tablistView';
import RangeBar from './components/UI/ui-rangeBar/rangeBar';
import MultiCombobox from './components/UI/ui-select/multiCombobox';
import Combobox from './components/UI/ui-select/combobox';

const selects = document.querySelectorAll('.js-select');
selects.forEach((item) => {
  const select = new Combobox(item);
  select.init();
});

const multiSelects = document.querySelectorAll('.js-multiSelect');
multiSelects.forEach((item) => {
  const multiSelect = new MultiCombobox(item);
  multiSelect.init();
});

const rangeBarIntElem = document.querySelectorAll('.js-rangeBarInt');
const rangeBarFloatElem = document.querySelectorAll('.js-rangeBarFloat');
rangeBarIntElem.forEach((item) => {
  const rangeBar = new RangeBar(item);
  rangeBar.init();
  return rangeBar;
});

rangeBarFloatElem.forEach((item) => {
  const rangeBar = new RangeBar(item, 'float');
  rangeBar.init();
  return rangeBar;
});

const tablistsView = document.querySelectorAll('.js-tablistView');
tablistsView.forEach((item) => {
  const tablistView = new TablistView(item);
  tablistView.init();
  return tablistView;
});

const filterElem = document.querySelector('.js-commerceFilter');
const filter = new CommerceFilter(filterElem);
filter.init();

const tablists = document.querySelectorAll('.js-tablist');

tablists.forEach((item) => {
  const tablist = new Tabs(item);
  tablist.init();
  return tablist;
});

const commerceFilter = document.querySelector('.commerceFilter');
const btn = document.querySelector('.commerceResult .commerceControls');
const btnObserve = document.querySelector('.commerceControls');

const callback = (entries) => {
  entries.forEach((entry) => {
    entry.isIntersecting
      ? commerceFilter.classList.remove('sticky')
      : commerceFilter.classList.add('sticky');

    entry.isIntersecting
      ? btn.classList.remove('is-show')
      : btn.classList.add('is-show');
  });
};
const observer = new IntersectionObserver(callback, { rootMargin: '50px', threshold: 1 });
observer.observe(btnObserve);

const map = new Map('ymap', 17, [44.898317, 37.354456]);
const testOdjectData = {
  id: 1,
  coords: [44.898317, 37.354456],
  name: 'Ям Голден Лайн',
  address: 'МО, Домодедовский район, «Голден лайн», с. 1',
  meta: {
    price: 470,
    type: 'Склады',
    size: '14 758',
  },
  badges: ['продается целиком'],
};
map.init();
map.createIconLayout();
map.createBalloonLayout();
map.createObjectCollection();
map.addObjectInObjectCollection(testOdjectData);

if (module.hot) {
  module.hot.accept();
}

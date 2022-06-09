import 'Styles/commerce.css';
import YMap from './components/map/map';
import Tabs from './components/tabs/tabs';
import CommerceFilter from './components/commerceFilter/commerceFilter';
import TablistView from './components/tablistView/tablistView';
import RangeBar from './components/UI/ui-rangeBar/rangeBar';
import RangeBarSelect from './components/UI/ui-rangeBar/rangeBarSelect';
import MultiCombobox from './components/UI/ui-select/multiCombobox';
import Combobox from './components/UI/ui-select/combobox';
import FilterActions from './components/filter/FilterActions';

const initFilterActions = () => {
  const filterElements = document.querySelectorAll('.js-filter');
  const filters = Array.from(filterElements).map((filter) => new FilterActions(filter));
  filters.forEach((filter) => filter.init());
  window.filters = filters;
};

initFilterActions();

const initFilterSelects = function() {
  const selectElements = document.querySelectorAll('.js-select');
  const selects = Array.from(selectElements).map((item) => {
    const select = new Combobox(item);
    select.init();
    return select;
  });
  window.selects = selects;
};

initFilterSelects();

const initFilterMultiSelects = function() {
  const multiSelectElements = document.querySelectorAll('.js-multiSelect');
  const multiSelects = Array.from(multiSelectElements).map((item) => {
    const multiSelect = new MultiCombobox(item);
    multiSelect.init();
    return multiSelect;
  });
  window.multiSelects = multiSelects;
};

initFilterMultiSelects();

const initRangeBarSelect = function() {
  const rangeBarSelectElement = document.querySelector('.js-rangeBarSelect');
  const mapRangeBar = new Map();

  rangeBarSelectElement.querySelectorAll('.js-range').forEach((item) => {
    const name = item.getAttribute('data-price');
    const rangeBar = new RangeBar(item);
    rangeBar.init();
    mapRangeBar.set(name, rangeBar);
  });
  const rangeBarSelect = new RangeBarSelect(rangeBarSelectElement, mapRangeBar);
  rangeBarSelect.init();
  window.rangeBarSelect = rangeBarSelect;
};

initRangeBarSelect();

const initRangeBar = function() {
  const rangeBarIntElements = document.querySelectorAll('.js-rangeBarInt');
  const rangeBarFloatElements = document.querySelectorAll('.js-rangeBarFloat');

  const arrRangeBarInt = Array.from(rangeBarIntElements).map((item) => {
    const rangeBar = new RangeBar(item);
    rangeBar.init();
    return rangeBar;
  });

  const arrRangeBarFloat = Array.from(rangeBarFloatElements).map((item) => {
    const rangeBar = new RangeBar(item, 'float');
    rangeBar.init();
    return rangeBar;
  });

  window.arrRangeBar = [...arrRangeBarInt, ...arrRangeBarFloat];
};

initRangeBar();

const initTablistView = function() {
  const tablistViewElements = document.querySelectorAll('.js-tablistView');
  const arrTablistView = Array.from(tablistViewElements).map((item) => {
    const tablistView = new TablistView(item);
    tablistView.init();
    return tablistView;
  });
  window.arrTablistView = arrTablistView;
};

initTablistView();

const initFilterMenu = function() {
  const filterMenuElement = document.querySelector('.js-commerceFilter');
  const filterMenu = new CommerceFilter(filterMenuElement);
  filterMenu.init();
  window.filterMenu = filterMenu;
};

initFilterMenu();

const initTablist = function() {
  const tablistElements = document.querySelectorAll('.js-tablist');
  const arrTablist = Array.from(tablistElements).map((item) => {
    const tablist = new Tabs(item);
    tablist.init();
    return tablist;
  });
  window.arrTablist = arrTablist;
};

initTablist();

const initMap = function() {
  const map = new YMap('ymap', {
    zoom: 17,
    center: [44.898317, 37.354456],
  });
  map.init();
  map.createIconLayout();
  map.createBalloonLayout();
  window.map = map;
};

initMap();

/* testOdjectData - пример объекта */
// const testOdjectData = {
//   id: 1,
//   coords: [44.898317, 37.354456],
//   name: 'Ям Голден Лайн',
//   address: 'МО, Домодедовский район, «Голден лайн», с. 1',
//   meta: {
//     price: 470,
//     type: 'Склады',
//     size: '14 758',
//   },
//   badges: ['продается целиком'],
//   link: './build.html',
// };

const b = {
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
  thumbUrl: '../asset/images/build/1/thumb/1.jpg',
  link: './build.html',
};

const a = {
  id: 1,
  coords: [56.244481, 43.466803],
  name: 'Ям Голден Лайн',
  address: 'МО, Домодедовский район, «Голден лайн», с. 1',
  meta: {
    price: 470,
    type: 'Склады',
    size: '14 758',
  },
  badges: ['продается целиком'],
  thumbUrl: '../asset/images/build/1/thumb/1.jpg',
  link: './build.html',
};

window.map.createObjectCollection();
window.map.addObjectsInObjectCollection([a, b]);

const initCommerceControls = function() {
  initFilterActions();
  initFilterSelects();
  initFilterMultiSelects();
  initRangeBar();
  initRangeBarSelect();
  initTablistView();
  initFilterMenu();
  initTablist();
  initMap();
};

window.initFilterMenu = initFilterMenu;
window.initFilterActions = initFilterActions;
window.initFilterSelects = initFilterSelects;
window.initFilterMultiSelects = initFilterMultiSelects;
window.initRangeBar = initRangeBar;
window.initRangeBarSelect = initRangeBarSelect;
window.initTablistView = initTablistView;
window.initTablist = initTablist;
window.initMap = initMap;

window.initCommerceControls = initCommerceControls;

if (module.hot) {
  module.hot.accept();
}

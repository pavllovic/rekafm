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
  const filters = new Map();
  window.filters = filters;
  filterElements.forEach((element) => {
    const filterName = element.getAttribute('data-filter');
    const filter = new FilterActions(element);
    filters.set(filterName, { filter: filter, controls: [] });
    filter.init();
  });
};

initFilterActions();

const initFilterSelects = function() {
  const selectElements = document.querySelectorAll('.js-select');
  selectElements.forEach((element) => {
    const select = new Combobox(element);
    select.init();
    const filterName = element.closest('[data-filter]').getAttribute('data-filter');
    const filter = window.filters.get(filterName);
    filter.controls.push(select);
    window.filters.set(filterName, filter);
  });
};

initFilterSelects();

const initFilterMultiSelects = function() {
  const multiSelectElements = document.querySelectorAll('.js-multiSelect');
  multiSelectElements.forEach((element) => {
    const multiSelect = new MultiCombobox(element);
    multiSelect.init();
    const filterName = element.closest('[data-filter]').getAttribute('data-filter');
    const filter = window.filters.get(filterName);
    filter.controls.push(multiSelect);
    window.filters.set(filterName, filter);
  });
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
  const filterName = rangeBarSelectElement.closest('[data-filter]').getAttribute('data-filter');
  const filter = window.filters.get(filterName);
  filter.controls.push(rangeBarSelect);
  window.filters.set(filterName, filter);
};

initRangeBarSelect();

const initRangeBar = function() {
  const rangeBarIntElements = document.querySelectorAll('.js-rangeBarInt');
  const rangeBarFloatElements = document.querySelectorAll('.js-rangeBarFloat');

  rangeBarIntElements.forEach((element) => {
    const rangeBar = new RangeBar(element);
    rangeBar.init();
    const filterName = element.closest('[data-filter]').getAttribute('data-filter');
    const filter = window.filters.get(filterName);
    filter.controls.push(rangeBar);
    window.filters.set(filterName, filter);
  });

  rangeBarFloatElements.forEach((element) => {
    const rangeBar = new RangeBar(element);
    rangeBar.init();
    const filterName = element.closest('[data-filter]').getAttribute('data-filter');
    const filter = window.filters.get(filterName);
    filter.controls.push(rangeBar);
    window.filters.set(filterName, filter);
  });
};

initRangeBar();

const initTablistView = function() {
  const tablistViewElements = document.querySelectorAll('.js-tablistView');
  // const arrTablistView = Array.from(tablistViewElements).map((item) => {
  //   const tablistView = new TablistView(item);
  //   tablistView.init();
  //   return tablistView;
  // });
  // window.arrTablistView = arrTablistView;
  const tablistView = new TablistView(tablistViewElements);
  tablistView.init();
  window.tablistView = tablistView;
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
  // const arrTablist = Array.from(tablistElements).map((item) => {
  //   const tablist = new Tabs(item);
  //   tablist.init();
  //   return tablist;
  // });
  // window.arrTablist = arrTablist;
  const tablist = new Tabs(tablistElements);
  tablist.init();
  window.tablist = tablist;
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
  booked: true,
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
  booked: false,
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

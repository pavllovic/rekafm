import 'Styles/commerce.css';
import Map from './components/map/map';
import Tabs from './components/tabs/tabs';
import CommerceFilter from './components/commerceFilter/commerceFilter';
import TablistView from './components/tablistView/tablistView';
import RangeBar from './components/UI/ui-rangeBar/rangeBar';
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
  const map = new Map('ymap', 17, [44.898317, 37.354456]);
  map.init();
  map.createIconLayout();
  map.createBalloonLayout();
  window.map = map;
};

initMap();

/* testOdjectData - пример объекта */
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
  link: './build.html'
};

window.map.createObjectCollection();
window.map.addObjectInObjectCollection(testOdjectData);

if (module.hot) {
  module.hot.accept();
}

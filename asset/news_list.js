import 'Styles/news_list.css';
import Combobox from './components/UI/ui-select/combobox';

const initFilterSelects = function() {
  const selectElements = document.querySelectorAll('.js-select');
  if(selectElements.length > 0) {
    selectElements.forEach((element) => {
      const select = new Combobox(element);
      select.init();
      // const filterName = element.closest('[data-filter]').getAttribute('data-filter');
      // const filter = window.filters.get(filterName);
      // filter.controls.push(select);
      // window.filters.set(filterName, filter);
    });
  }
};

window.initFilterSelects = initFilterSelects;
initFilterSelects();

if (module.hot) {
  module.hot.accept();
}

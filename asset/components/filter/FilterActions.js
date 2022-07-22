const FilterActions = function(filter) {
  this.filter = filter;
  this.filterName = filter.getAttribute('data-filter');
  this.btnReset = filter.querySelector('[data-filter="reset"]');
  this.btnApply = filter.querySelector('[data-filter="apply"]');
  this.wrapBtns = filter.querySelector('.filter-button');
  this.initialWrapBtnsHeight = this.wrapBtns.offsetHeight;
  this.btnApplyHeight = this.btnApply.offsetHeight;
};

FilterActions.prototype = {
  init() {
    this.setListeners();
    this.hideBtnReset();
  },

  setListeners() {
    this.btnReset.addEventListener('click', () => this.hideBtnReset());
    this.btnApply.addEventListener('click', () => this.showBtnReset());
  },

  showBtnReset() {
    this.wrapBtns.style.setProperty('--height-wrap', this.initialWrapBtnsHeight);
  },

  hideBtnReset() {
    this.wrapBtns.style.setProperty('--height-wrap', this.btnApplyHeight);
    const controls = window.filters.get(this.filterName).controls;
    const toggles = this.filter.querySelectorAll('.ui-toggle [type="checkbox"]:checked');
    controls.forEach((control) => {
      control.reset();
    });
    if(toggles) {
      toggles.forEach((item) => {
        const toggle = item;
        toggle.checked = false;
      });
    }
  },
};

export default FilterActions;

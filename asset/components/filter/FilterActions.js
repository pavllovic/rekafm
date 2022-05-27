const FilterActions = function(filter) {
  this.filter = filter;
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
  },
};

export default FilterActions;

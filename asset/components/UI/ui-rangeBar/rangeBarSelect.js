const RangeBarSelect = function(parent, map) {
  this.wrapper = parent;
  this.rangeBarMap = map;
  this.activeRangeBar = this.rangeBarMap.get('all');
};

RangeBarSelect.prototype = {
  init: function() {
    this.setListeners();
  },

  setListeners: function() {
    this.wrapper.addEventListener('click', this);
  },

  toggleRangeBar: function(option) {
    const rate = option.getAttribute('data-price-rate');
    const type = option.getAttribute('data-price');
    if(this.activeRangeBar !== type) {
      console.log(this.rangeBarMap);
      this.activeRangeBar.wrapper.classList.remove('active');
      this.activeRangeBar.resetInputValues();
      this.rangeBarMap.get(type).wrapper.classList.add('active');
      this.rangeBarMap.get(type).changeRate(rate);
      this.rangeBarMap.get(type).updateViewValues();
      this.activeRangeBar = this.rangeBarMap.get(type);
    }
  },

  destroy: function() {
    this.wrapper.removeEventListener('input', this);
  },

  handleEvent: function(e) {
    switch(e.type) {
      case 'click':
        const option = e.target.closest('[role="option"]');
        if(option) {
          return this.toggleRangeBar(option);
        }
        break;
      default:
        break;
    }
    return undefined;
  },
};

export default RangeBarSelect;

const RangeBarInt = function(parent, output) {
  this.wrapper = parent;
  this.inputFrom = parent.querySelector('[data-range="input-from"]');
  this.inputTo = parent.querySelector('[data-range="input-to"]');
  this.sliderFrom = parent.querySelector('[data-range="slider-from"]');
  this.sliderTo = parent.querySelector('[data-range="slider-to"]');
  // this.minGap = 10;
  this.minGap = 0;
  this.output = output;
};

RangeBarInt.prototype = {
  init: function() {
    this.setListeners();
    this.valueFrom = parseInt(this.sliderFrom.value, 10);
    this.valueTo = parseInt(this.sliderTo.value, 10);
    this.valueMin = parseInt(this.sliderFrom.min, 10);
    this.valueMax = parseInt(this.sliderFrom.max, 10);
  },

  setListeners: function() {
    this.wrapper.addEventListener('input', this);
  },

  updateValueFrom: function(rawValue) {
    const value = parseInt(rawValue, 10);
    ((value + this.minGap) <= this.valueTo)
      ? this.valueFrom = value
      : this.valueFrom = this.valueTo;
  },

  updateValueTo: function(rawValue) {
    const value = parseInt(rawValue, 10);
    ((value - this.minGap) >= this.valueFrom)
      ? this.valueTo = value
      : this.valueTo = this.valueFrom;
  },

  passValueFrom: function() {
    const value = ((this.valueFrom - this.valueMin) / this.valueMax) * 100;
    this.wrapper.style.setProperty('--value-from', `${value}%`);
  },

  passValueTo: function() {
    const value = ((this.valueTo - this.valueMin) / this.valueMax) * 100;
    this.wrapper.style.setProperty('--value-to', `${value}%`);
  },

  updateElementsFrom: function() {
    this.sliderFrom.value = this.valueFrom;
    this.inputFrom.value = this.valueFrom;
    this.inputFrom.innerText = this.output === 'float'
      ? this.setFloatValue(this.valueFrom)
      // : this.valueFrom;
      : new Intl.NumberFormat('ru-RU').format(this.valueFrom);
  },

  updateElementsTo: function() {
    this.sliderTo.value = this.valueTo;
    this.inputTo.value = this.valueTo;
    this.inputTo.innerText = this.output === 'float'
      ? this.setFloatValue(this.valueTo)
      // : this.valueTo;
      : new Intl.NumberFormat('ru-RU').format(this.valueTo);
  },

  setFloatValue: function(value) {
    return (value / 1000000).toFixed(1);
  },

  onInputFrom: function(value) {
    this.updateValueFrom(value);
    this.updateElementsFrom();
    this.passValueFrom();
  },

  onInputTo: function(value) {
    this.updateValueTo(value);
    this.updateElementsTo();
    this.passValueTo();
  },

  destroy: function() {
    this.wrapper.removeEventListener('input', this);
  },

  handleEvent: function(e) {
    switch(e.type) {
      case 'input':
        if(e.target === this.sliderFrom || e.target === this.inputFrom) {
          return this.onInputFrom(e.target.value);
        }
        if(e.target === this.sliderTo || e.target === this.inputTo) {
          return this.onInputTo(e.target.value);
        }
        break;
      default:
        break;
    }
    return undefined;
  },
};

export default RangeBarInt;

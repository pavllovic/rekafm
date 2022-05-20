const CommerceFilter = function (elem) {
  this.wrap = document.querySelector('.wrapper');
  this.filter = elem;
  this.btnClose = elem.querySelector('[data-filter="close"]');
};

CommerceFilter.prototype = {
  init: function() {
    this.setListeners();
  },

  setListeners: function () {
    this.wrap.addEventListener('click', this);
  },

  showFilter: function () {
    this.filter.classList.add('open');
    this.btnClose.focus();
  },

  hideFilter: function () {
    this.filter.classList.add('close');
    this.filter.classList.remove('open');
    setTimeout(() => {
      this.filter.classList.remove('close');
    }, 1000);
  },

  handleEvent: function (e) {
    switch(e.type) {
      case 'click':
        if(e.target.getAttribute('data-filter') === 'open') return this.showFilter();
        if(e.target === this.btnClose) return this.hideFilter();
        if(e.target.getAttribute('data-filter') === 'reset') return this.hideFilter();
        if(e.target.getAttribute('data-filter') === 'apply') return this.hideFilter();
        break;
      default:
        break;
    }
    return undefined;
  },
};

export default CommerceFilter;

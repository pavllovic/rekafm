export function openerFilter(parent) {
  this.wrapper = parent;
  this.btnsOpen = document.querySelectorAll('[data-filter="open"]');
  this.btnClose = parent.querySelector('[data-filter="close"]');
  this.btnApply = parent.querySelector('[data-filter="apply"]');
  this.btnReset = parent.querySelector('[data-filter="reset"]');
}

export function init() {
  this.setListeners();
}

export function setListeners() {
  this.btnsOpen.forEach((btn) => {
    btn.addEventListener('click', this);
  });
  this.wrapper.addEventListener('click', this);
}

export function showFilter() {
  this.wrapper.classList.add('open');
  this.btnClose.focus();
}

export function hideFilter() {
  this.wrapper.classList.remove('open');
}

export function handleEvent(e) {
  switch(e.type) {
    case 'click':
      if(e.target.getAttribute('data-filter') === 'open') return this.showFilter();
      if(e.target === this.btnClose) return this.hideFilter();
      if(e.target === this.btnReset) return this.hideFilter();
      if(e.target === this.btnApply) return this.hideFilter();
      break;
    default:
      break;
  }
  return undefined;
}

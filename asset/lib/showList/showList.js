export function showList(elem) {
  this.wrap = elem;
  this.list = elem.querySelector('[data-show-list="list"]');
  this.outerList = this.list.parentElement;
  this.btnClose = elem.querySelector('[data-show-list="close"]');
  this.btnOpen = elem.querySelector('[data-show-list="open"]');
  this.btnToggle = elem.querySelector('[data-show-list="toggle"]');
  this.listFullHeight = this.list.offsetHeight;
  this.initalHeightOuterList = this.outerList.offsetHeight;
  this.btnHeight = parseInt(window.getComputedStyle(this.outerList)
    .paddingBottom.slice(0, -2), 10);
  this.state = false;
}

export function init() {
  this.setListeners();
  this.getInitalHeightInnerList();
  this.list.style.setProperty('--inner-height', `${this.initalHeightInnerList}px`);
  if(this.listFullHeight <= this.initalHeightOuterList) this.wrap.classList.add('static');
}

export function setListeners() {
  this.wrap.addEventListener('click', this);
}

export function openList() {
  this.outerList.style.setProperty('--outer-height', `${this.listFullHeight + this.btnHeight}px`);
  this.list.style.setProperty('--inner-height', `${this.listFullHeight}px`);
  this.wrap.classList.add('open');
  this.state = true;
}

export function closeList() {
  this.outerList.style.setProperty('--outer-height', `${this.initalHeightOuterList}px`);
  this.list.style.setProperty('--inner-height', `${this.initalHeightInnerList}px`);
  this.wrap.classList.remove('open');
  this.state = false;
}

export function toggleList() {
  this.state ? this.closeList() : this.openList();
}

export function getInitalHeightInnerList() {
  const items = this.list.querySelectorAll('li');
  const marginBottom = parseInt(window.getComputedStyle(items[0]).marginBottom.slice(0, -2), 10);
  const maxHeight = this.initalHeightOuterList - this.btnHeight;
  this.initalHeightInnerList = 0;
  items.forEach((item) => {
    const step = item.offsetHeight + marginBottom;
    if((this.initalHeightInnerList + step) < maxHeight) {
      this.initalHeightInnerList += step;
    }
  });
}

export function hideButtonOpen() {
  this.btnOpen.classList.add('is-hide');
  this.btnClose.classList.add('is-hide');
}

export function handleEvent(e) {
  switch(e.type) {
    case 'click':
      if(e.target.getAttribute('data-show-list') === 'close') return this.closeList();
      if(e.target.getAttribute('data-show-list') === 'open') return this.openList();
      if(e.target.getAttribute('data-show-list') === 'toggle') return this.toggleList();
      break;
    default:
      break;
  }
  return undefined;
}

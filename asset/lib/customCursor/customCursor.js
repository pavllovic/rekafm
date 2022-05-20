export function customCursor(elem, area) {
  this.wrap = elem;
  this.area = area || this.wrap;
  this.cursor = this.wrap.querySelector('.js-customCursor');
}

export function init() {
  this.setListeners();
}

export function setListeners() {
  this.area.addEventListener('mouseenter', this);
  this.area.addEventListener('mouseleave', this);
}

export function translateCursor(e) {
  const x = e.clientX;
  const y = e.clientY;
  this.cursor.style.setProperty('--x', x);
  this.cursor.style.setProperty('--y', y);
}

export function addMouseMove() {
  this.cursor.classList.add('show');
  this.area.addEventListener('mousemove', this);
}

export function removeMouseMove() {
  this.cursor.classList.remove('show');
  this.area.removeEventListener('mousemove', this);
}

export function handleEvent(e) {
  switch(e.type) {
    case 'mouseenter':
      return this.addMouseMove();
    case 'mouseleave':
      return this.removeMouseMove();
    case 'mousemove':
      return this.translateCursor(e);
    default:
      break;
  }
  return undefined;
}

export function modal (elem) {
  this.modal = elem;
  this.siblings = new Map();
  // open/close state modal
  this.state = false;
}

export function init() {
  const name = this.modal.getAttribute('data-modal');
  this.controls = document.querySelectorAll(`[data-btn="${name}"]`);
  this.setListeners();
}

export function setListeners() {
  this.modal.addEventListener('keydown', this);
  this.controls.forEach((btn) => {
    btn.addEventListener('click', this);
  });
}

export function openModal(opener) {
  this.modal.setAttribute('aria-hidden', 'false');
  this.modal.classList.add('is-open');
  this.opener = opener;
  this.addInert(this.modal);
  this.focusTrap(this.modal);
  this.firstFocusable.focus();
  // this.modal.scrollTo(0, 0);
  this.state = true;
}

export function closeModal() {
  this.modal.setAttribute('aria-hidden', 'true');
  this.modal.classList.remove('is-open');
  this.opener.focus();
  this.siblings.forEach((value, key) => {
    value === null ? key.removeAttribute('aria-hidden') : key.setAttribute('aria-hidden', value);
  });
  this.siblings.clear();
  this.state = false;
}

export function focusTrap(node) {
  const focusableSelector = ['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])',
    'textarea:not([disabled])', 'button:not([disabled])', 'details', 'summary', 'iframe', 'object',
    'embed', '[contenteditable]', '[tabindex="0"]'].join(',');

  const focusable = node.querySelectorAll(focusableSelector);
  this.firstFocusable = focusable[0];
  this.lastFocusable = focusable[focusable.length - 1];
}

export function onkeydownModal(e) {
  switch(e.key) {
    case 'Tab':
      if(e.target === this.last && !e.shiftKey) {
        e.preventDefault();
        return this.firstFocusable.focus();
      }
      if(((e.target === this.firstFocusable) || (e.target === this.modal)
        || (e.target === this.activeModal)) && (e.shiftKey)) {
        e.preventDefault();
        return this.lastFocusable.focus();
      }
      break;
    case 'Escape':
      return this.closeModal();
    default:
      break;
  }
  return undefined;
}

export function addInert(node) {
  if(node !== document.body) {
    const siblings = [...node.parentElement.children];
    siblings.forEach((elem) => {
      if(elem !== node && elem.nodeName !== 'SCRIPT' && elem.nodeName !== 'STYLE') {
        this.siblings.set(elem, elem.getAttribute('aria-hidden'));
        elem.setAttribute('aria-hidden', 'true');
      }
    });
    this.addInert(node.parentElement);
  }
}

export function destroy() {
  this.modal.removeEventListener('keydown', this);
  this.modal.removeEventListener('mousedown', this);
  this.modal.querySelectorAll('[data-modal], [data-modal-ctrl]').forEach((elem) => {
    elem.removeEventListener('click', this);
  });

  this.controls.forEach((btn) => {
    btn.removeEventListener('click', this);
  });
}

export function toogleModal(opener) {
  this.state ? this.closeModal() : this.openModal(opener);
}

export function handleEvent(e) {
  switch(e.type) {
    case 'click':
      return this.toogleModal(e.target);
    case 'keydown':
      return this.onkeydownModal(e);
    default:
      break;
  }
  return undefined;
}

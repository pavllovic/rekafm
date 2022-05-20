import * as lib from 'Lib/modal/modal.js';

const Modal = lib.modal;

Modal.prototype = {
  constructor: Modal,
  init: lib.init,
  setListeners: lib.setListeners,
  openModal: lib.openModal,
  closeModal: function() {
    lib.closeModal.call(this);
    console.log('dfsgsdfsfd');
    this.modal.classList.remove('error-handler');
    this.modal.classList.remove('success-handler');
  },
  toogleModal: lib.toogleModal,
  focusTrap: lib.focusTrap,
  addInert: lib.addInert,
  destroy: lib.destroy,
  onkeydownModal: lib.onkeydownModal,
  handleEvent: lib.handleEvent,
};

export default Modal;

import * as lib from 'Lib/form/form';
import * as handlers from 'Lib/form/form-handlers.js';
// import { sendFormJSON } from 'Lib/form/form-send.js';
import { sendForm } from 'Lib/form/form-send.js';

const OrderCallForm = lib.form;

OrderCallForm.prototype = {
  constructor: OrderCallForm,
  init: function() {
    lib.init.call(this);
    this.wrap = document.querySelector('.js-modal-call');
  },
  setListeners: lib.setListeners,
  destroy: lib.destroy,
  getFormData: lib.getFormData,
  submitForm: lib.submitForm,
  // sendForm: sendFormJSON,
  sendForm: sendForm,
  resetForm: lib.resetForm,
  showSubmitting: lib.showSubmitting,
  showFormResposne: lib.showFormResposne,
  hideFormResposne: lib.hideFormResposne,
  handleEvent: lib.handleEvent,
  sendFormHandler: handlers.sendFormHandler,
  onSuccessHandler: function() {
    // this.wrap.classList.add('success-handler');
    document.location.href = '/response-call/';
  },
  onErrorHandler: function() {
    this.wrap.classList.add('error-handler');
  },
};

export default OrderCallForm;

import * as lib from 'Lib/form/form';
import * as handlers from 'Lib/form/form-handlers.js';
import { sendFormJSON } from 'Lib/form/form-send.js';

const OrderCallForm = lib.form;

OrderCallForm.prototype = {
  constructor: OrderCallForm,
  // init: lib.init,
  init: function() {
    lib.init.call(this);
    this.wrap = document.querySelector('.js-modal-call');
    console.log(this);
  },
  setListeners: lib.setListeners,
  destroy: lib.destroy,
  getFormData: lib.getFormData,
  submitForm: lib.submitForm,
  sendForm: sendFormJSON,
  resetForm: lib.resetForm,
  showSubmitting: lib.showSubmitting,
  showFormResposne: lib.showFormResposne,
  hideFormResposne: lib.hideFormResposne,
  handleEvent: lib.handleEvent,
  sendFormHandler: handlers.sendFormHandler,
  // onSuccessHandler: handlers.onSuccessHandler,
  onSuccessHandler: function() {
    this.wrap.classList.add('success-handler');
  },
  // onErrorHandler: handlers.onErrorHandler,
  onErrorHandler: function() {
    // this.wrap.classList.add('error-handler');
    this.wrap.classList.add('success-handler');
  },
};

export default OrderCallForm;

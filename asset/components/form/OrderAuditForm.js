import * as lib from 'Lib/form/form';
import * as handlers from 'Lib/form/form-handlers.js';
import { sendForm } from 'Lib/form/form-send.js';

const OrderAuditForm = lib.form;

OrderAuditForm.prototype = {
  constructor: OrderAuditForm,
  init: function() {
    lib.init.call(this);
    this.price = this.form.querySelector('[data-audit="value"]');
    // this.wrap = document.querySelector('.js-modal-call');
  },
  setListeners: function() {
    lib.setListeners.call(this);
    this.form.querySelector('input[name="square"]').addEventListener('input', (e) => {
      this.updatePrice(e.target);
    });
  },
  destroy: lib.destroy,
  getFormData: lib.getFormData,
  submitForm: lib.submitForm,
  sendForm: sendForm,
  resetForm: lib.resetForm,
  showSubmitting: lib.showSubmitting,
  showFormResposne: lib.showFormResposne,
  hideFormResposne: lib.hideFormResposne,
  handleEvent: lib.handleEvent,
  sendFormHandler: handlers.sendFormHandler,
  updatePrice: function(input) {
    let price = 0;
    if (input.value <= 50) price = '16 800';
    if ((input.value > 50) && (input.value <= 100)) price = '24 000';
    if ((input.value > 100) && (input.value <= 250)) price = '36 000';
    if ((input.value > 250) && (input.value <= 500)) price = '72 000';
    if ((input.value > 500) && (input.value <= 1000)) price = '120 000';
    if (input.value > 1000) {
      price = new Intl.NumberFormat('ru-RU').format(Math.round(input.value * 67.2, 2));
    }
    this.price.innerText = price;
  },
  onSuccessHandler: function() {
    this.wrap.classList.add('success-handler');
  },
  onErrorHandler: function() {
    this.wrap.classList.add('error-handler');
  },
};

export default OrderAuditForm;

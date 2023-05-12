import * as lib from 'Lib/form/form';
import * as handlers from 'Lib/form/form-handlers.js';
import { sendForm } from 'Lib/form/form-send.js';

const OrderAuditForm = lib.form;

OrderAuditForm.prototype = {
  constructor: OrderAuditForm,
  init: function() {
    this.price = this.form.querySelector('[data-audit="value"]');
    this.inputPrice = this.form.querySelector('input[name="price"]');
    this.wrap = document.querySelector('.js-form-order');
    lib.init.call(this);
  },
  setListeners: function() {
    lib.setListeners.call(this);
    const inputSquare = this.form.querySelector('input[name="square"]');
    if(inputSquare) {
      inputSquare.addEventListener('input', (e) => {
        this.updatePrice(e.target);
      });
    }
    this.wrap.querySelectorAll('[data-btn="response-close"]').forEach((elem) => {
      elem.addEventListener('click', () => this.hideFormResposne());
    });
  },
  destroy: lib.destroy,
  getFormData: lib.getFormData,
  submitForm: lib.submitForm,
  sendForm: sendForm,
  resetForm: lib.resetForm,
  showSubmitting: lib.showSubmitting,
  showFormResposne: lib.showFormResposne,
  hideFormResposne: function() {
    this.wrap.classList.remove('success-handler');
  },
  handleEvent: lib.handleEvent,
  sendFormHandler: handlers.sendFormHandler,
  setPriceList: function(priceList) {
    this.priceList = priceList;
  },
  updatePrice: function(input) {
    const value = +input.value;
    const length = this.priceList.length - 1;
    if(this.priceList && value) {
      const audit = this.priceList.find((item, index) => {
        if(
          ((index === 0) && (value < item.value[1]))
          || ((index === length) && (value > item.value[0]))
          || ((value > item.value[0]) && (value <= item.value[1]))
        ) return item;
        return undefined;
      });
      if(audit) {
        this.price.innerText = audit.price;
        this.inputPrice.value = audit.price;
        // this.inputPrice.innerText = audit.price;
      }
    } else {
      this.price.innerText = '0';
      this.inputPrice.value = '0';
      // this.inputPrice.innerText = '0';
    }
    // this.price.innerText = price;
    // if (input.value <= 50) price = '16 800';
    // if ((input.value > 50) && (input.value <= 100)) price = '24 000';
    // if ((input.value > 100) && (input.value <= 250)) price = '36 000';
    // if ((input.value > 250) && (input.value <= 500)) price = '72 000';
    // if ((input.value > 500) && (input.value <= 1000)) price = '120 000';
    // if (input.value > 1000) {
    //   price = new Intl.NumberFormat('ru-RU').format(Math.round(input.value * 67.2, 2));
    // }
  },
  onSuccessHandler: function() {
    // this.wrap.classList.add('success-handler');
    document.location.href = '/response-audit/';
  },
  onErrorHandler: function() {
    // this.wrap.classList.add('error-handler');
  },
};

export default OrderAuditForm;

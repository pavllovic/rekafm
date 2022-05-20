const FormValidator = function(form) {
  this.form = form;
  this.fields = this.form.querySelectorAll('input');
  this.mapError = new Map();
};

FormValidator.prototype = {
  init: function() {
    this.form.noValidate = true;
    this.isFormValid = true;
    this.setListeners();
  },

  setListeners: function() {
    this.form.addEventListener('submit', this.validateForm.bind(this));
    this.fields.forEach((input) => {
      input.addEventListener('input', this.onInput.bind(this));
      this.addErrorTooltip(input);
    });
  },

  checkInput: function(input) {
    return input.checkValidity();
  },

  addErrorTooltip: function(input) {
    const tooltip = document.createElement('div');
    const errorMessage = document.createElement('p');
    tooltip.style = 'overflow: hidden; height: 0px; opacity: 0';
    tooltip.classList.add('formError');
    errorMessage.classList.add('msg');
    tooltip.appendChild(errorMessage);
    input.after(tooltip);
  },

  getErrorTooltip: function(input) {
    return input.nextElementSibling;
  },

  showErrorTooltip: function(input) {
    const tooltip = this.getErrorTooltip(input);
    const errorMessage = tooltip.querySelector('.msg');
    const delay = getComputedStyle(errorMessage).transitionDuration.slice(0, -1) * 1000;
    this.hideErrorMessage(errorMessage);
    setTimeout(() => {
      errorMessage.innerText = input.validationMessage;
      this.showErrorMessage(errorMessage);
      tooltip.style = `height: ${errorMessage.offsetHeight}px; opacity: 1`;
    }, delay);
  },

  hideErrorTooltip: function(input) {
    const tooltip = this.getErrorTooltip(input);
    tooltip.style.height = '0px';
  },

  showErrorMessage: function(element) {
    const errorMessage = element;
    errorMessage.style.opacity = '1';
  },

  hideErrorMessage: function(element) {
    const errorMessage = element;
    errorMessage.style.opacity = '0';
  },

  getInputError: function(input) {
    const nameError = Object.keys(input.validity).filter((key) => input.validity[key]);
    this.mapError.set(input.name, nameError);
  },

  validInputHandler: function(input) {
    this.mapError.clear();
    this.hideErrorTooltip(input);
    input.classList.remove('invalid');
    input.classList.add('valid');
  },

  invalidInputHandler: function(input) {
    const typeError = this.mapError.get(input.name);
    if(!input.validity[typeError]) {
      this.getInputError(input);
      this.showErrorTooltip(input);
      input.classList.remove('valid');
      input.classList.add('invalid');
    }
  },

  onInput: function(e) {
    if(!this.isFormValid) {
      this.validateInput(e.target);
    }
  },

  validateInput: function(input) {
    const isValid = this.checkInput(input);
    isValid
      ? this.validInputHandler(input)
      : this.invalidInputHandler(input);
  },

  validateForm: function(e) {
    console.log('validate');
    this.fields.forEach((input) => {
      this.validateInput(input);
    });

    if (!this.form.checkValidity()) {
      e.preventDefault();
      e.stopImmediatePropagation();
      this.isFormValid = false;
    } else {
      this.isFormValid = true;
    }
  },
};

export default FormValidator;

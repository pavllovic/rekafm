import 'Styles/audit.emergency.mamagement.css';
import FormValidator from './lib/formValidator/formValidator.js';
import OrderAuditForm from './components/form/OrderAuditForm.js';

const initFormOrderAudit = function() {
  const formElem = document.querySelector('.js-order-audit');
  const formValidator = new FormValidator(formElem);
  const form = new OrderAuditForm(formElem);
  formValidator.init();
  form.init();
  window.orderAuditForm = form;
  window.orderAuditForm.validator = formValidator;
};

initFormOrderAudit();

if (module.hot) {
  module.hot.accept();
}

export function form(elem) {
  this.form = elem;
  this.sending = false;
}

export function init() {
  this.setListeners();
}

export function setListeners() {
  this.form.addEventListener('submit', this);
  if(this.showFormResposne) this.form.addEventListener('click', this);
}

export function destroy() {
  this.form.removeEventListener('submit', this);
  if(this.showFormResposne) this.form.removeEventListener('click', this);
}

export function getFormData() {
  const formData = new FormData(this.form);
  return formData;
}

export function submitForm() {
  if(this.form.checkValidity()) {
    this.sending = true;
    if(this.showFormOverlay) this.showFormOverlay();
    if(this.showSubmitting) this.showSubmitting();
    const data = this.getFormData(this.form);
    this.sendFormHandler(this.form, data);
  }
}

export function resetForm() {
  this.form.reset();
}

export function showSubmitting() {
  const btn = this.form.querySelector('[type="submit"]');
  if(this.sending) {
    this.form.classList.add('submitting');
    btn.setAttribute('disabled', 'true');
  } else {
    this.form.classList.remove('submitting');
    btn.removeAttribute('disabled');
  }
}

export function showFormOverlay() {
  const overlay = this.form.querySelector('#form-overlay');
  overlay.classList.add('is-active');
}

export function hideFormOverlay() {
  const overlay = this.form.querySelector('#form-overlay');
  overlay.classList.remove('is-active');
}

export function showFormResposne(text) {
  const elem = this.form.querySelector('#form-response');
  const messageElem = elem.querySelector('[data-response="text"]');
  messageElem.innerText = text;
  elem.classList.add('is-active');
}

export function hideFormResposne() {
  const elem = this.form.querySelector('#form-response');
  elem.classList.remove('is-active');
  if(this.hideFormOverlay) this.hideFormOverlay();
}

export function handleEvent(e) {
  switch(e.type) {
    case 'submit':
      console.log('submit');
      e.preventDefault();
      return this.submitForm();
    case 'click':
      if(e.target.dataset.response === 'close') this.hideFormResposne();
      break;
    default:
      break;
  }
  return undefined;
}

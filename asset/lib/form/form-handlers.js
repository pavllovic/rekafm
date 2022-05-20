// handler for success submit form
export function onSuccessHandler(res) {
  if(this.showFormResposne) this.showFormResposne('форма отправлена');
  this.resetForm();
  console.log(res); //eslint-disable-line
}

// handler for error submit form
export function onErrorHandler(err) {
  if(this.showFormResposne) this.showFormResposne('ошибка при отправке формы');
  console.log(err); //eslint-disable-line
}

// real request to server
export function sendFormHandler(form, data) {
  this.sendForm(form, data)
    .then((res) => this.onSuccessHandler(res))
    .catch((err) => this.onErrorHandler(err))
    .finally(() => {
      this.sending = false;
      // hide submitting
      if(this.showSubmitting)this.showSubmitting();
    });
}

// fake request to server
export function fakeSendFormHandler(form, data) {
  this.timeout = setTimeout(() => {
    this.sendForm(form, data)
      .then((res) => this.onSuccessHandler(res))
      .catch((err) => this.onErrorHandler(err))
      .finally(() => {
        this.sending = false;
        // hide submitting
        if(this.showSubmitting)this.showSubmitting();
      });
  }, 5000);
}

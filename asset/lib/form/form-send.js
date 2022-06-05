export async function sendForm(form, data) {
  const url = form.getAttribute('action');
  const method = form.getAttribute('method');

  const options = {
    method: method || 'POST',
    credentials: 'same-origin',
    // body: new URLSearchParams(data),
    body: data, // send FormData
  };

  if(this.controller) {
    options.signal = this.controller.signal;
  }

  try {
    const response = await fetch(url, options);
    if(!response.ok) throw new Error('server error');
    return response;
  } catch(err) {
    throw new Error(err.message);
  }
}

export async function sendFormJSON(form, data) {
  const objData = Object.fromEntries(data);
  const url = form.getAttribute('action');
  const method = form.getAttribute('method');

  const options = {
    method: method || 'POST',
    credentials: 'same-origin',
    body: JSON.stringify(objData),
  };

  if(this.controller) {
    options.signal = this.controller.signal;
  }

  try {
    const response = await fetch(url, options);
    if(!response.ok) throw new Error('error');
    return response;
  } catch(err) {
    throw new Error(err.message);
  }
}

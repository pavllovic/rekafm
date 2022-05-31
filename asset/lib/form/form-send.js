export async function sendForm(form, data) {
  // const url = form.getAttribute('action');
  // const url = 'https://echo.htmlacademy.ru';
  const method = form.getAttribute('method');
  const enctype = form.getAttribute('enctype');

  const options = {
    method: method || 'POST',
    credentials: 'same-origin',
    // body: new URLSearchParams(data),
    body: data, // send FormData
    headers: {
      'Content-Type': enctype,
    },
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
  // const url = 'https://echo.htmlacademy.ru';
  const method = form.getAttribute('method');
  const enctype = form.getAttribute('enctype');

  const options = {
    method: method || 'POST',
    credentials: 'same-origin',
    body: JSON.stringify(objData),
    headers: {
      'Content-Type': enctype,
      // 'Content-Type': 'text/plain',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      // 'Content-Type': 'application/json',
    },
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

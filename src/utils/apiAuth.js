class ApiAuth {
  constructor(options) {
    this.options = options;
  }

  _request(path, method) {
    this.options.method = method;
    return fetch(path, this.options)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error ${res.status}`);
      })
  }

  register(data) {
    this.options.body = JSON.stringify({
      email: data.email,
      password: data.password
    })
    return this._request('/signup', 'POST');
  }

  login(data) {
    this.options.body = JSON.stringify({
      email: data.email,
      password: data.password
    })
    return this._request('/signin', 'POST');
  }

  validate(token) {
    delete this.options.body;
    this.options.headers['x-access-token'] = token;
    return this._request('/validate', 'GET');
  }
}

const apiAuth = new ApiAuth({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default apiAuth;
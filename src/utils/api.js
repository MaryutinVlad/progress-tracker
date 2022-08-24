class Api {
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

  getActivities() {
    return this._request('/activities', 'GET');
  }

  makeCurrent(activityId) {
    return this._request(`/activities/${activityId}`, 'POST');
  }
}

const api = new Api({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-access-token': `${localStorage.getItem('jwt')}`
  }
});

export default api;
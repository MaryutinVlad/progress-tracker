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
    delete this.options.body;
    return this._request('/activities', 'GET');
  }

  purchaseActivity(activityId, wp, slots) {
    this.options.body = JSON.stringify({
      wp: wp,
      slots: slots
    });

    return this._request(`/activities/${activityId}`, 'POST');
  }

  endDay(values) {
    this.options.body = JSON.stringify(values);

    return this._request('/activities', 'POST');
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
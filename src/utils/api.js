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

  purchaseZone(zoneId, wp) {
    this.options.body = JSON.stringify({
      wp: wp
    });

    return this._request(`/activities/zones/${zoneId}`, 'PUT');
  }

  restartMap() {
    return this._request('/activities', 'DELETE');
  }

  upgradeActivity(activityId, rank, wpAfterPurchase) {
    this.options.body = JSON.stringify({
      rank: rank,
      wp: wpAfterPurchase
    });

    return this._request(`/activities/${activityId}`, 'PUT');
  }

  endDay(values) {
    this.options.body = JSON.stringify(values);

    return this._request('/activities', 'POST');
  }

  getTrials() {
    delete this.options.body;
    return this._request('/trials', 'GET');
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
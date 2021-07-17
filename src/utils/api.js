class Api {
    constructor({ address, token }) {
      this._address = address;
      this._token = token;
      this._headers = {
        authorization: this._token,
        'Content-Type': 'application/json',
      }
    }
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    getUserInfo() {
      return fetch(`${this._address}/users/me`, {
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    getInitialCards() {
      return fetch(`${this._address}/cards`, {
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    editProfile(data) {
      return fetch(`${this._address}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        }),
      }).then(this._checkResponse);
    }
  
    addCard(data) {
      return fetch(`${this._address}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        }),
      }).then(this._checkResponse);
    }
  
    removeCard(idCard) {
      return fetch(`${this._address}/cards/${idCard}`, {
        method: 'DELETE',
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    changeLikeCardStatus(idCard, isLiked) {
      return fetch(`${this._address}/cards/likes/${idCard}`, {
        method: isLiked ? 'DELETE' : 'PUT',
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    editAvatar(link) {
      return fetch(`${this._address}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: link,
        }),
      }).then(this._checkResponse);
    }
  }
  const api = new Api({
    address: 'api.mymesto.vladimir.nomoredomains.monster',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGYxZjhhYjVhYzdlNzEzYzUzMjNjY2UiLCJpYXQiOjE2MjY0NzA2MjcsImV4cCI6MTYyNzA3NTQyN30.iv1aw-JH-DVPYt6o_VOjlhtqqKSj6L03EUkw_dkl3vo',
  })
  
  export default api;
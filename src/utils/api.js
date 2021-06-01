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
    address: 'https://mesto.nomoreparties.co/v1/cohort-22',
    token: '06d63aad-75bc-4641-be17-ed6babb8063a',
  })
  
  export default api;
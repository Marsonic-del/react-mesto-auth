export const BASE_URL = 'https://mymesto.vladimir.nomoredomains.work';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// Запрос на регистрацию.
export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email })
  })
  
  .then((res) => checkResponse(res))

};

// Запрос на аутентификацию
export const authorize = (password, email) => {
    return fetch(`https://api.mymesto.vladimir.nomoredomains.monster/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email })
    })
    
    .then((res) => checkResponse(res))
  
  };

  // Для получения данных пользователя если токен с localStorage тот же что 
  // и на сервере.
  export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
    })
    
    .then((res) => checkResponse(res))
  
  }; 
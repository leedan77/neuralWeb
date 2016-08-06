import fetch from 'isomorphic-fetch';

const BASE_URL = window.API_URL;

function get(path, token) {
  return fetch(`${BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => res.json());
}

function post(path, data, token) {
  return fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then((res) => res.json());
}

export default { get, post };

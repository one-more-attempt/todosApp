import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { FIREBASE_CONFIG, DB_URL } from './api-config';
import { showNotification } from '../shared/notifications';
import { Spinner } from '../shared/spinner';

const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth();

export const signInRequest = ({ email, password }) => {
  return signInWithEmailAndPassword(auth, email, password)
    .catch(error => {
      Spinner.hideSpinner();
      showNotification(error.message);
    });
};

export const createUserAuthRequest = ({ email, password_1 }) => {
  return createUserWithEmailAndPassword(auth, email, password_1)
    .catch(error => {
      Spinner.hideSpinner();
      showNotification(error.message);
    });
};

export const createUserDataRequest = (user) => {
  const userData = user;

  delete userData.password_1;
  delete userData.password_2;

  return fetch(`${DB_URL}/users.json`, {
    method: 'POST',
    body: JSON.stringify(userData),
  }).then((res) => res.json());
};

const get = url => fetch(`${DB_URL}/${url}.json`)
  .then(response => {
    Spinner.hideSpinner();

    return response.json();
  })
  .catch(error => {
    Spinner.hideSpinner();
    showNotification(error.message);
  });

const del = url => fetch(
  `${DB_URL}/${url}.json`,
  {
    method: 'DELETE'
  }
)
  .then(response => {
    Spinner.hideSpinner();

    return response.json();
  })
  .catch(error => {
    Spinner.hideSpinner();
    showNotification(error.message);
  });

const put = (url, body) => {
  console.log('PUT');
  return fetch(
    `${DB_URL}/${url}.json`,
    {
      method: 'PUT',
      body: JSON.stringify(body)
    }
  )
    .then(response => {
      Spinner.hideSpinner();

      return response.json();
    })
    .catch(error => {
      Spinner.hideSpinner();
      showNotification(error.message);
    });
}

const post = (url, body) => {
  return fetch(
    `${DB_URL}/${url}.json`,
    {
      method: 'POST',
      body: JSON.stringify(body)
    }
  )
    .then(response => {
      Spinner.hideSpinner();

      return response.json();
    })
    .catch(error => {
      Spinner.hideSpinner();
      showNotification(error.message);
    });
}

export const apiService = {
  get,
  put,
  del,
  post
}

export const setToken = token => localStorage.setItem('accessToken', token);

export const getToken = () => localStorage.getItem('accessToken');

export const setUserLocal = user => localStorage.setItem('user', JSON.stringify(user));

export const getUserLocal = () => JSON.parse(localStorage.getItem('user')) || {};

export const clearLocalStorage = () => localStorage.clear();

export const setCurrentUserData = data => localStorage.setItem('currentUserData', JSON.stringify(data));

export const getCurrentUserData = () => JSON.parse(localStorage.getItem('currentUserData'));

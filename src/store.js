// reducer.js
import { legacy_createStore as createStore } from 'redux';

const initialState = {
  sidebarShow: true,
  theme: 'light',
  token: localStorage.getItem('token') || null, // Retrieve token from local storage
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest };
    case 'setToken':
      return { ...state, token: rest.token };
    default:
      return state;
  }
};

const store = createStore(changeState);
export default store;

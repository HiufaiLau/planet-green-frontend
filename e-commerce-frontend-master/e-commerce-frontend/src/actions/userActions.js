import axios from 'axios';
import Cookie from 'js-cookie';

import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
} from '../constants/userConstants';

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const result = await axios.post('/api/auth/signin', {
      email,
      password,
    });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: result.data });
  } catch (err) {
    const msg = err.response.data.errors;
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: msg.join().split(','),
    });
  }
};

const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });

  try {
    const result = await axios.post('/api/auth/signup', {
      name,
      email,
      password,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: result.data });
  } catch (err) {
    const msg = err.response.data.errors;
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: msg.join().split(','),
    });
  }
};

const signout = () => async (dispatch) => {
  const res = await axios.post('api/auth/signout');
  Cookie.remove('cartItems', { path: '' });
  dispatch({
    type: USER_LOGOUT,
    payload: res.data,
  });
};

export { signin, register, signout };

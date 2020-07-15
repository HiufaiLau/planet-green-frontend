import axios from 'axios';
import Cookie from 'js-cookie';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
} from '../constants/cartConstants';

const addToCart = (productId, quantity) => async (dispatch, getState) => {
  try {
    const result = await axios.get('/api/products/' + productId);
    const qty = parseInt(quantity);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: result.data.product._id,
        name: result.data.product.name,
        image: result.data.product.image[0],
        price: result.data.product.price,
        countInStock: result.data.product.countInStock,
        qty,
      },
    });
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set('cartItems', JSON.stringify(cartItems));
  } catch (error) {
    console.log('cart error', error);
  }
};

const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  const {
    cart: { cartItems },
  } = getState();
  Cookie.set('cartItems', JSON.stringify(cartItems));
};

const removeCookieFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  const {
    cart: { cartItems },
  } = getState();
  Cookie.remove('cartItems', JSON.stringify(cartItems));
  Cookie.remove('cartItems', { path: '' });
};

const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
};

const savePayment = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
};

export {
  addToCart,
  removeFromCart,
  removeCookieFromCart,
  saveShipping,
  savePayment,
};

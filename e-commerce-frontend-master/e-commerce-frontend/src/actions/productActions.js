import axios from 'axios';
import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
} from '../constants/productConstants';

const getProducts = (options) => async (dispatch) => {
  try {
    let result;
    if (options) {
      result = await axios.get(`/api/products?${options[0]}=${options[1]}`, {
        AccessControlAllowCredentials: true,
      });
    } else {
      result = await axios.get('/api/products/', {
        AccessControlAllowCredentials: true,
      });
    }
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: result.data.data });
  } catch (err) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: 'Products are not found' });
  }
};

const getProductDetail = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get('/api/products/' + productId);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
  } catch (err) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: 'Product is not found' });
  }
};

const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!product._id) {
      try {
        const result = await axios.post('/api/products/', product, {
          headers: {
            Authorization: 'admin' + userInfo.token,
          },
        });
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: result.data.data });
      } catch (err) {
        const msg = err.response.data.errors;
        dispatch({
          type: PRODUCT_SAVE_FAIL,
          payload: msg.join().split(','),
        });
      }
    } else {
      const result = await axios.put('/api/products/' + product._id, product, {
        headers: {
          Authorization: 'admin ' + userInfo.token,
        },
      });
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: result.data.data });
    }
  } catch (err) {
    const msg = err.response.data.errors;
    dispatch({
      type: PRODUCT_SAVE_FAIL,
      payload: msg.join().split(','),
    });
  }
};
const deleteProdcut = (productId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const result = await axios.delete('/api/products/' + productId, {
      headers: {
        Authorization: 'admin' + userInfo.token,
      },
    });

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: result.data,
      success: true,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: 'Product could not be deleted.',
    });
  }
};

export { getProducts, getProductDetail, saveProduct, deleteProdcut };

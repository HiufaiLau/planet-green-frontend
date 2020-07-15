import axios from 'axios';
import {
  IMAGE_DELETE_FAIL,
  IMAGE_DELETE_SUCCESS,
  IMAGE_DELETE_REQUEST,
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAIL,
} from '../constants/imageConstants';

const deleteImage = (filename) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    dispatch({ type: IMAGE_DELETE_REQUEST });
    const result = await axios.put(`/api/images/deleteImage/${filename}`, {
      headers: {
        Authorization: 'admin' + userInfo.token,
      },
    });
    dispatch({
      type: IMAGE_DELETE_SUCCESS,
      payload: result.data.image,
      success: true,
    });
  } catch (err) {
    dispatch({
      type: IMAGE_DELETE_FAIL,
      payload: 'Image could not be deleted.',
    });
  }
};

const uploadImage = (form) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: IMAGE_UPLOAD_REQUEST });

    const imageHeaders = new Headers();
    imageHeaders.append('Authorization', 'admin' + userInfo.token);
    const requestOptions = {
      method: 'POST',
      headers: imageHeaders,
      body: form,
      redirect: 'follow',
    };

    const response = await fetch('api/images/uploadImage', requestOptions);
    const result = await response.json();
    dispatch({
      type: IMAGE_UPLOAD_SUCCESS,
      payload: result,
      success: true,
    });
  } catch (err) {
    dispatch({
      type: IMAGE_UPLOAD_FAIL,
      payload: 'Image could not be uploaded.',
    });
  }
};

export { deleteImage, uploadImage };

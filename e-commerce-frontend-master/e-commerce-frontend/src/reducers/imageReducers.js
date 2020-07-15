import {
  IMAGE_DELETE_REQUEST,
  IMAGE_DELETE_SUCCESS,
  IMAGE_DELETE_FAIL,
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAIL,
} from '../constants/imageConstants';

export const imageDeleteReducer = (state = { image: [] }, action) => {
  switch (action.type) {
    case IMAGE_DELETE_REQUEST:
      return { loading: true };
    case IMAGE_DELETE_SUCCESS:
      return { loading: false, success: true, image: action.payload };
    case IMAGE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const imageUploadReducer = (state = { image: [] }, action) => {
  switch (action.type) {
    case IMAGE_UPLOAD_REQUEST:
      return { loading: true };
    case IMAGE_UPLOAD_SUCCESS:
      return { loading: false, success: true, image: action.payload };
    case IMAGE_UPLOAD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

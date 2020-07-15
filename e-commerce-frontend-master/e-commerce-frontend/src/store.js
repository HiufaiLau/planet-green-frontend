import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productSaveReducer,
} from './reducers/productReducers';
import {
  imageDeleteReducer,
  imageUploadReducer,
} from './reducers/imageReducers';
import thunk from 'redux-thunk';
import {
  userSigninReducer,
  userRegisterReducer,
} from './reducers/userReducers';
import Cookie from 'js-cookie';
import { cartReducer } from './reducers/cartReducers';


const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;

// initialize the state
const initialState = {
  cart: { cartItems, shipping: {}, payment: {} },
  userSignin: { userInfo },
};

//root reducer
const reducer = combineReducers({
  // cookie: initialState,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  imageDelete: imageDeleteReducer,
  imageUpload: imageUploadReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  cart: cartReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;

import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../actions/userActions';
import { removeCookieFromCart } from '../actions/cartActions';

import '../styles/Form.css';

function PaymentSuccessScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productId = props.match.params.id;

  const dispatch = useDispatch();

  const backToHomeScreenHandler = (e, user) => {
    e.preventDefault();
    dispatch(signout(user));
    dispatch(removeCookieFromCart(productId));
  };
  return (
    <div>
      {userInfo && userInfo?.role === 'user' ? (
        <>
          <div className='form'>
            <div className='form-container'>
              <h2>Payment Success !</h2>
              <li>
                <p>Please check your email for the confirmation.</p>
              </li>
              <li>
                <p>Planet Green is always welcome you!</p>
              </li>
              <li>
                <button
                  type='submit'
                  onClick={backToHomeScreenHandler}
                  className='button primary'
                >
                  Back to homepage
                </button>
              </li>
            </div>
          </div>
        </>
      ) : (
        <Redirect to='/signin' />
      )}
    </div>
  );
}
export default PaymentSuccessScreen;

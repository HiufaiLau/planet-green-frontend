import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

import '../styles/CheckoutSteps.css';


function PaymentScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [paymentMethod, setPaymentMethod] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    props.history.push('signin?redirect=placeorder');
  };
  return (
    <div>
      <div className='back-to-homepage'>
        <Link to='/shipping'>Back to shipping</Link>
      </div>
      {userInfo && userInfo?.role === 'user' ? (
        <>
          <CheckoutSteps step1 step2 step3></CheckoutSteps>
          <div className='form'>
            <form onSubmit={submitHandler}>
              <ul className='form-container'>
                <li>
                  <h2>Payment</h2>
                </li>
                <li>
                  <div>
                    <input
                      type='radio'
                      name='paymentMethod'
                      id='paymentMethod'
                      value='paypal'
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    ></input>
                    <label htmlFor='paymentMethod'>Paypal</label>
                  </div>
                </li>
                <li>
                  <button type='submit' className='button primary'>
                    Continue
                  </button>
                </li>
              </ul>
            </form>
          </div>
        </>
      ) : (
        <Redirect to='/signin' />
      )}
    </div>
  );
}
export default PaymentScreen;

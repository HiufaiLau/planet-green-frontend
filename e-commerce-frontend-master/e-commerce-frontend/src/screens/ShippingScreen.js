import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

import '../styles/Form.css';
import '../styles/CheckoutSteps.css';

function ShippingScreen(props) {
  const [title, setTitle] = useState('');
  const [shippingName, setShippingName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShipping({ title, shippingName, address, city, postalCode, country })
    );
    props.history.push('/signin?redirect=payment');
  };

  const errMessageHandler = (e) => {
    if (
      shippingName.trim().length < 0 ||
      address.trim().length < 0 ||
      city.trim().length < 0 ||
      postalCode.trim().length < 0 ||
      country.trim().length < 0
    ) {
      setErrMessage('Please enter all the address informations');
    } else {
      setErrMessage('');
    }
  };
  return (
    <div>
      <div className='back-to-homepage'>
        <Link to='/'>Back to homepage</Link>
      </div>
      {userInfo && userInfo?.role === 'user' ? (
        <>
          <CheckoutSteps step1 step2></CheckoutSteps>
          <div className='form'>
            <form onSubmit={submitHandler}>
              <ul className='form-container'>
                <li>
                  <h2>Shipping</h2>
                  <p onChange={errMessageHandler}>{errMessage}</p>
                </li>
                <li>
                  <div>
                    <input
                      type='radio'
                      name='title'
                      id='title'
                      value='Mrs'
                      onChange={(e) => setTitle(e.target.value)}
                    ></input>
                    <label htmlFor='title'>Mrs.</label>
                    <input
                      type='radio'
                      name='title'
                      id='title'
                      value='Mr'
                      onChange={(e) => setTitle(e.target.value)}
                    ></input>
                    <label htmlFor='title'>Mr.</label>
                  </div>
                </li>
                <li>
                  <label htmlFor='address'>Recipient Name</label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    onChange={(e) => setShippingName(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor='address'>Address</label>
                  <input
                    type='text'
                    name='address'
                    id='address'
                    onChange={(e) => setAddress(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor='city'>City</label>
                  <input
                    type='text'
                    name='city'
                    id='city'
                    onChange={(e) => setCity(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor='postalCode'>Postal Code</label>
                  <input
                    type='text'
                    name='postalCode'
                    id='postalCode'
                    onChange={(e) => setPostalCode(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor='country'>Country</label>
                  <input
                    type='text'
                    name='country'
                    id='country'
                    onChange={(e) => setCountry(e.target.value)}
                  ></input>
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
export default ShippingScreen;

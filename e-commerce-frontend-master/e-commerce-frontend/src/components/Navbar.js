import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from '../actions/userActions';

import '../styles/Navbar.css';
import '../styles/DropdownBar.css';

const Navbar = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };

  const signoutHandler = (user) => {
    dispatch(signout(user));
  };

  return (
    <header className='header sticky'>
      <div className='brand'>
        <button onClick={openMenu}>&#9776;</button>
        <Link to='/'>Planet Green</Link>
      </div>
      <div className='header-links'>
        {userInfo && userInfo?.role === 'user' ? (
          <>
            <Link to='/cart'>
              {`Cart ${cartItems.reduce((a, c) => a + c.qty, 0)}`}
            </Link>

            <div className='dropdown'>
              <Link to='/'>{userInfo.name}</Link>
              <ul className='dropdown-content'>
                <li>
                  <button onClick={() => signoutHandler()}>
                    <Link to='/'>Signout</Link>
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : userInfo && userInfo?.role === 'admin' ? (
          <div className='dropdown'>
            <Link to='/'>Admin</Link>
            <ul className='dropdown-content'>
              <li>
                <Link to='/management'>Products</Link>
              </li>
              <li>
                <button onClick={() => signoutHandler()}>
                  <Link to='/'>Signout</Link>
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to='/signin'>Sign In</Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;

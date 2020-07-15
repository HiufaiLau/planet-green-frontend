import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/Cart.css';

function CartScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const productId = props.match.params.id;
  const qty = props.location.search
    ? parseFloat(props.location.search.split('=')[1])
    : 1;

  const dispatch = useDispatch();
  
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };

  return (
    <div className='cart'>
      <div className='cart-list'>
        <Link to='/'>Back to homepage</Link>
        <ul className='cart-list-container'>
          <li>
            <h3>Shopping Cart</h3>
          </li>

          {cartItems.length === 0 ? (
            <div>Cart is empty</div>
          ) : cartItems.length > 0 ? (
            cartItems.map((item, i) => (
              <li>
                <h4>Item {i + 1}</h4>
                <div className='cart-image'>
                  <img
                    src={`http://localhost:5000/images/${item.image}`}
                    alt='product'
                  />
                </div>

                <div className='cart-name'>
                  <div>
                    <Link to={'/products/' + item.product}>{item.name}</Link>
                  </div>
                  <div>
                    Qty:
                    <select
                      value={parseFloat(item.qty)}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={parseFloat(x + 1)}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      type='button'
                      className='button'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className='cart-price'>${item.price}</div>
              </li>
            ))
          ) : null}
        </ul>
      </div>

      <div className='cart-action'>
        <h3>
          Subtotal ( {cartItems.reduce((a, b) => parseFloat(a + b.qty), 0)}
          items) : ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>
        <button
          onClick={checkoutHandler}
          className='button primary full-width'
          disabled={cartItems.length < 1}
        >
          <Link to='/signin'> Proceed to Checkout</Link>
        </button>
      </div>
    </div>
  );
}

export default CartScreen;

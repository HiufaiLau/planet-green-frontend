import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetail } from '../actions/productActions';
import SingleProductDetail from '../components/SingleProductDetail';

import '../styles/ProductDetails.css';

function ProductScreen(props) {
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetail(props.match.params.id));
  }, [props.match.params.id]);

  const handleAddToCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
  };

  if (!product) return <div>Loading</div>;

  return (
    <div>
      <div className='back-to-homepage'>
        <Link to='/'>Back to homepage</Link>
      </div>

      <div className='details'>
        <SingleProductDetail key={product._id} product={product} />

        <div className='details-action'>
          <ul>
            Price: <b>${product.price}</b>
            <li>
              Status: {product.countInStock > 0 ? 'In Stock' : 'Out of stock'}
            </li>
            <li>
              Qty:{' '}
              <select
                value={qty}
                onChange={(e) => {
                  setQty(e.target.value);
                }}
              >
                {[...Array(product.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </li>
            <li>
              {product.countInStock > 0 && (
                <button onClick={handleAddToCart} className='button primary'>
                  Add to Cart
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default ProductScreen;

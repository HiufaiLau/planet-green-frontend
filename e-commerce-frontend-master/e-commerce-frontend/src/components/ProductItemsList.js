import React from 'react';
import { Link } from 'react-router-dom';

const ProductItemsList = ({ product }) => {
  const { _id, image, name, price } = product;

  const renderProductImage = () =>
    image && image[0] ? (
      <img
        className='product-image'
        src={`http://localhost:5000/images/${image[0]}`}
        alt='product'
      />
    ) : null;

  return (
    <li>
      <div className='product'>
        <Link to={`/products/${_id}`}>{renderProductImage()}</Link>
        <div className='product-name'>
          <Link to={`/products/${_id}`}>{name}</Link>
        </div>
        <div className='product-price'>
          {product.countInStock > 0 ? `$${price}` : ' - Out of stock -'}
        </div>
      </div>
    </li>
  );
};

export default ProductItemsList;

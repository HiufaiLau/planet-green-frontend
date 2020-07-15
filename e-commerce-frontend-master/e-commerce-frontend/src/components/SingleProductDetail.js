import React from 'react';

const SingleProductDetail = ({ product }) => {
  const { _id, image, name, price, description } = product;

  const renderProductImages = () =>
    image
      ? image.map((i, index) => (
          <img
            key={index}
            src={`http://localhost:5000/images/${i}`}
            alt=''
          ></img>
        ))
      : null;

  return (
    <>
      <div className='details-image'>{renderProductImages()}</div>
      <div className='details-info'>
        <ul key={_id}>
          <li>
            <h4>{name}</h4>
          </li>
          <li>
            Price: <b>${price}</b>
          </li>
          <li>
            Description:
            <div>{description}</div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SingleProductDetail;

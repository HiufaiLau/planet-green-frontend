import React from 'react';

const ProductTable = (props) => {
  const { product, openModal, deleteHandler } = props;
  const { _id, name, price, category, countInStock } = product;
  return (
    <>
      <tr>
        <td>{_id}</td>
        <td>{name}</td>
        <td>{price}</td>
        <td>{category}</td>
        <td>{countInStock > 0 ? countInStock : '-'}</td>
        <td>
          <button className='button' onClick={() => openModal(product)}>
            Edit
          </button>
          <button className='button' onClick={() => deleteHandler(product)}>
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default ProductTable;

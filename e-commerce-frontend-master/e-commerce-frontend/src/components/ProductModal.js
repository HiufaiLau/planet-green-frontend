import React from 'react';

const ProductModal = (props) => {
  const {
    submitFormHandler,
    uploadImageHandler,
    deleteImageHandler,
    image,
    setName,
    id,
    loadingSave,
    errorSave,
    setPrice,
    setCountInStock,
    setCategory,
    setDescription,
    setModalVisible,
  } = props;

  return (
    <>
      <form onSubmit={submitFormHandler}>
        <ul className='form-container'>
          <li>
            <h2>Manage Product</h2>
          </li>
          <li>
            {loadingSave && <div>Loading...</div>}
            {errorSave && (
              <div className='error-message'>
                {errorSave.map((err, index) => (
                  <div key={index}>{err}</div>
                ))}
              </div>
            )}
          </li>
          <li>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              id='name'
              onChange={(e) => setName(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor='price'>Price</label>
            <input
              type='text'
              name='price'
              id='price'
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor='image'>Image</label>
            <input
              accept='image/*'
              type='file'
              id='image'
              multiple
              onChange={uploadImageHandler}
            ></input>
          </li>

          <li>
            {image && image.length > 0 ? (
              image.map((oneImg, i) => {
                if (!oneImg) return;
                return (
                  <div>
                    <img
                      key={i}
                      src={`http://localhost:5000/images/${oneImg}`}
                      alt=''
                      style={{
                        float: 'left',
                        maxWidth: '250px',
                        minWidth: '250px',
                        margin: '5px',
                      }}
                    ></img>
                    <span
                      onClick={() => deleteImageHandler(oneImg)}
                      style={{
                        float: 'left',
                        margin: '2px',
                        padding: '2px',
                        color: 'black',
                      }}
                    >
                      x
                    </span>
                  </div>
                );
              })
            ) : (
              <p>no images selected</p>
            )}
          </li>

          <li>
            <label htmlFor='countInStock'>Count in stock</label>
            <input
              type='text'
              name='countInStock'
              id='countInStock'
              onChange={(e) => setCountInStock(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor='name'>Category</label>
            <select
              name='sortOrder'
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value='' defaultValue>
                -Choose-
              </option>
              <option value='foliage'>Foliage </option>
              <option value='succulent'>Succulent</option>
            </select>
          </li>
          <li>
            <label htmlFor='description'>Description</label>
            <textarea
              name='description'
              id='description'
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </li>
          <li>
            <button type='submit' className='button primary'>
              {id ? 'Update' : 'Create'}
            </button>
          </li>
          <li>
            <button
              type='button'
              onClick={() => setModalVisible(false)}
              className='button secondary'
            >
              Back
            </button>
          </li>
        </ul>
      </form>
    </>
  );
};

export default ProductModal;

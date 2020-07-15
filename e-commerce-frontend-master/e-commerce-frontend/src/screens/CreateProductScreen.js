import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getProducts,
  saveProduct,
  deleteProdcut,
} from '../actions/productActions';
import { deleteImage, uploadImage } from '../actions/imageActions';

import '../styles/Products.css';
import '../styles/Form.css';
import '../styles/ErrorMessage.css';
import ProductTable from '../components/ProductTable';
import ProductModal from '../components/ProductModal';

function CreateProductScreen() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;

  const imageDelete = useSelector((state) => state.imageDelete);
  const { success: successImageDelete, image: deletedImage } = imageDelete;

  const imageUpload = useSelector((state) => state.imageUpload);
  const { success: successImageUpload, image: uploadedImage } = imageUpload;

  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState([]);
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(getProducts());
  }, [successSave, successDelete]);

  useEffect(() => {
    if (image && image.length === 0 && uploadedImage !== undefined) {
      setImage(uploadedImage);
    } else {
      if (uploadedImage !== undefined) {
        setImage(image.concat(uploadedImage));
      }
    }
  }, [successImageUpload]);

  useEffect(() => {
    const newImages = image.filter((img) => img && img !== deletedImage);
    setImage(newImages);
  }, [successImageDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    if (product.image) {
      setImage(product.image);
    } else {
      setImage([]);
    }
    setCategory(product.category);
    setCountInStock(product.countInStock);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    let product = {
      _id: id,
      name,
      price,
      description,
      image,
      category,
      countInStock,
    };
    dispatch(saveProduct(product));
  };

  const deleteHandler = (product) => {
    dispatch(deleteProdcut(product._id));
  };

  const deleteImageHandler = (image) => {
    dispatch(deleteImage(image));
  };

  const uploadImageHandler = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    let imgForm = new FormData();
    files.forEach((file) => {
      imgForm.append('image', file, file.name);
    });
    dispatch(uploadImage(imgForm));
  };

  return (
    <div>
      <div className='back-to-homepage'>
        <Link to='/'>Back to homepage</Link>
      </div>
      {userInfo && userInfo?.role === 'admin' ? (
        <div className='content content-margined'>
          <div className='product-header'>
            <h3>Products Management</h3>
            <button className='button primary' onClick={() => openModal({})}>
              Create Product
            </button>
          </div>
          {modalVisible && (
            <div className='form'>
              <ProductModal
                id={id}
                loadingSave={loadingSave}
                errorSave={errorSave}
                image={image}
                setImage={setImage}
                submitFormHandler={submitFormHandler}
                uploadImageHandler={uploadImageHandler}
                deleteImageHandler={deleteImageHandler}
                setModalVisible={setModalVisible}
                setName={setName}
                setPrice={setPrice}
                setCountInStock={setCountInStock}
                setCategory={setCategory}
                setDescription={setDescription}
              />
            </div>
          )}

          <div className='product-list'>
            <table className='table'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <ProductTable
                    key={i}
                    product={product}
                    openModal={openModal}
                    deleteHandler={deleteHandler}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Redirect to='/signin' />
      )}
    </div>
  );
}
export default CreateProductScreen;

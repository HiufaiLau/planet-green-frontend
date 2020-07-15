import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../actions/productActions';
import ProductItemsList from '../components/ProductItemsList';
import '../styles/HomeScreen.css';
function HomeScreen() {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  let list = products
    ? products.map((p) => <ProductItemsList key={p._id} product={p} />)
    : null;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return <ul className='products'>{list}</ul>;
}

export default HomeScreen;

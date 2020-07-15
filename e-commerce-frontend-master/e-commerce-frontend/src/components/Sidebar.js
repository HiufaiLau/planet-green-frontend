import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProducts } from '../actions/productActions';

import '../styles/Sidebar.css';

function Sidebar() {
  const dispatch = useDispatch();

  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };

  useEffect(() => {
    dispatch(getProducts());
  });

  const sortProducts = (sortField) => {
    const opts = ['sort', sortField];
    dispatch(getProducts(opts));
  };

  const serchProducts = (name) => {
    const searchName = ['name', name];
    dispatch(getProducts(searchName));
  };

  const categoryClickHandler = (category) => {
    const filterPlant = ['category', category];
    dispatch(getProducts(filterPlant));
  };

  return (
    <aside className='sidebar'>
      <h3>
        <Link to='/'>Plants Discovery</Link>
      </h3>
      <button className='sidebar-close-button' onClick={closeMenu}>
        x
      </button>
      <form className='search-product-bar'>
        <input
          placeholder='Filter by name'
          type='text'
          onChange={(e) => serchProducts(e.target.value)}
        />
      </form>
      <div className='select-product-bar'>
        <span>Sort by: </span>
        <select name='sortOrder' onChange={(e) => sortProducts(e.target.value)}>
          <option value='' defaultValue>
            -Choose-
          </option>
          <option value='price'>Lowest Price</option>
          <option value='-price'>Highest Price</option>
          <option value='name'>A-Z</option>
          <option value='-name'>Z-A</option>
        </select>
      </div>
      <ul className='categories'>
        <li>
          <Link to='' onClick={() => categoryClickHandler('')}>
            All
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;

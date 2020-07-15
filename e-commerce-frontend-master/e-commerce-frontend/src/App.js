import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import CreateProductScreen from './screens/CreateProductScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import PaymentSuccessScreen from './screens/PaymentSuccessScreen';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className='grid-container'>
        <Navbar />
        <Sidebar />
        <main className='main'>
          <div className='content'>
            <Route path='/management' component={CreateProductScreen} />
            <Route path='/products/:id' component={ProductScreen} />
            <Route path='/signin' component={SigninScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/paymentsuccess' component={PaymentSuccessScreen} />
            <Route path='/' exact component={HomeScreen} />
          </div>
        </main>
        <footer className='footer'>All right reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

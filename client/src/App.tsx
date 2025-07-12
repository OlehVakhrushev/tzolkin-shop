import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NavigationBar from './components/Navbar';

import CollectionPage from './pages/CollectionPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductPage from './pages/ProductPage';

import './styles/heroes-theme.css';
import './styles/custom.css';


const App: React.FC = () => {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/collection/:id" element={<CollectionPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </>
  );
};

export default App;

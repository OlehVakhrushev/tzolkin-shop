import React from 'react';
import NavigationBar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Products from '../components/Products';
import Footer from '../components/Footer'

const LandingPage: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Products />
      <Footer />
    </>
  );
};

export default LandingPage;

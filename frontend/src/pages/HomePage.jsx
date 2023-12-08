import React from 'react'
import Events from '../components/Events/Events';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import BestDeals from '../components/Route/BestDeals/BestDeals';
import Categories from '../components/Route/Categories/Categories';
import FeaturedProducts from '../components/Route/FeaturedProducts/FeaturedProducts';
import Hero from '../components/Route/Hero/Hero';
import Sponsered from '../components/Route/Sponsered/Sponsered';

const HomePage = () => {
  return (
    <div>
        <Header/>
        <Hero/>
        <Categories/>
        <BestDeals/>
        <Events/>
        <FeaturedProducts/>
        <Sponsered/>
        <Footer/>
    </div>
  )
}

export default HomePage;
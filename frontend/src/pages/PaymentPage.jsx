import React from 'react'
import CheckoutSteps from '../components/Checkout/CheckoutSteps';
import Header from '../components/Layout/Header';
import Payment from '../components/Payment/Payment';
import Footer from '../components/Layout/Footer';

const PaymentPage = () => {
  return (
    <div>
      <Header/>
      <br />
      <br />
      <CheckoutSteps/>
      <br />
      <br />
      <Payment/>
      <Footer/>
    </div>
  )
}

export default PaymentPage;
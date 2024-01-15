import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Checkout from "./components/Checkout/Checkout";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  BestSellingPage,
  ProductsPage,
  FAQPage,
  EventsPage,
  ProductDetailsPage,
  ProfilePage,
  ShopCreate,
  ShopHomePage,
  PaymentPage,
  OrderSuccessPage,
  OrderDetailsPage
} from "./Routes";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import { loadUser } from "./redux/actions/user";
import store from "./redux/store";
import { useSelector } from "react-redux";
import ShopProtectedRoute from "./ProtectedRoutes/ShopProtectedRoute";
import { ShopAllCoupons, ShopAllEvents, ShopCreateEvent, ShopDashboardPage, ShopLoginPage } from "./ShopRoutes";
import { loadSeller } from "./redux/actions/seller";
import ShopCreateProduct from "./components/Shop/ShopCreateProduct";
import ShopAllProducts from "./components/Shop/ShopAllProducts";
import ShopActivationPage from "./pages/ShopActivationPage";
import { getAllProducts } from "./redux/actions/product";
import { getAllEvents } from "./redux/actions/event";
// import ShopDashboardPage from './pages/Shop/ShopDashboardPage';
import { Elements} from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';
import { server } from "./server";
import axios from "axios";

const App = () => {
  const [stripeApikey, setStripeApikey] = useState("");

  const getStripeApiKey = async () => {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApikey(data.stripeApikey);
  };

  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadSeller());
    store.dispatch(getAllProducts());
    store.dispatch(getAllEvents());
    getStripeApiKey();
  }, []);

  return (
    <BrowserRouter>
    {stripeApikey && (
          <Elements stripe={loadStripe(stripeApikey)}>
            <Routes>
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <PaymentPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Elements>
        )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route
          path="/shop/activation/:activation_token"
          element={<ShopActivationPage />}
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
            path="/user/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetailsPage/>
              </ProtectedRoute>
            }
          />
        <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
        <Route
          path="/dashboard"
          element={
            <ShopProtectedRoute>
              <ShopDashboardPage />
            </ShopProtectedRoute>
          }
        />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route path="/shop-create" element={<ShopCreate />} />
        <Route
            path={`/shop/:id`}
            element={
              <ShopProtectedRoute>
                <ShopHomePage />
              </ShopProtectedRoute>
            }
          />
        <Route
          path="/dashboard-create-product"
          element={
            <ShopProtectedRoute>
              <ShopCreateProduct />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/dashboard-products"
          element={
            <ShopProtectedRoute>
              <ShopAllProducts />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-event"
          element={
            <ShopProtectedRoute>
              <ShopCreateEvent />
            </ShopProtectedRoute>
          }
        />
        <Route
            path="/dashboard-events"
            element={
              <ShopProtectedRoute>
                <ShopAllEvents />
              </ShopProtectedRoute>
            }
          />
          <Route
            path="/dashboard-coupons"
            element={
              <ShopProtectedRoute>
                <ShopAllCoupons />
              </ShopProtectedRoute>
            }
          />
          <Route path='/order/success' element={<OrderSuccessPage/>}/>
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
};

export default App;

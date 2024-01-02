import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
  ShopCreate
} from "./Routes";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute';
import "react-toastify/dist/ReactToastify.css";
import { loadUser } from "./redux/actions/user";
import store from "./redux/store";
import { useSelector } from "react-redux";
import ShopProtectedRoute from "./ProtectedRoutes/ShopProtectedRoute";
import { ShopDashboardPage, ShopLoginPage } from "./ShopRoutes";
import { loadSeller } from "./redux/actions/seller";
import ShopCreateProduct from "./components/Shop/ShopCreateProduct";
// import ShopDashboardPage from './pages/Shop/ShopDashboardPage';


const App = () => {
  const { loading } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadSeller());
  }, []);

  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route
              path="activation/:activation_token"
              element={<ActivationPage />}
            />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="product/:name" element={<ProductDetailsPage />} />
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
            path="/dashboard-create-product"
            element={
              <ShopProtectedRoute>
                <ShopCreateProduct />
              </ShopProtectedRoute>
            }
          />
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

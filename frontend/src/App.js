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
  ProfilePage
} from "./Routes";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute';
import "react-toastify/dist/ReactToastify.css";
import { loadUser } from "./redux/actions/user";
import store from "./redux/store";
import { useSelector } from "react-redux";

const App = () => {
  const { loading } = useSelector((state) => state.user);

  useEffect(() => {
    // axios.get(`${server}/user/getUser`, {withCredentials:true}).then((res)=>{
    //   toast.success("Welcome to E-Shop");
    // }).catch((err)=>{
    //   toast.error(err.response.data.message);
    // })
    store.dispatch(loadUser());
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

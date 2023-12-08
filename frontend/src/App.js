import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { LoginPage, SignupPage, ActivationPage, HomePage } from './Routes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {loadUser} from './redux/actions/user';
import store from './redux/store';


const App = () => {

  useEffect(()=>{
    // axios.get(`${server}/user/getUser`, {withCredentials:true}).then((res)=>{
    //   toast.success("Welcome to E-Shop");
    // }).catch((err)=>{
    //   toast.error(err.response.data.message);
    // })
    store.dispatch(loadUser());
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/sign-up' element={<SignupPage/>}/>
        <Route path='/activation/:activation_token' element={<ActivationPage/>}/>
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
  )
}

export default App
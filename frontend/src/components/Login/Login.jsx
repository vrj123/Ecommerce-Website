import React, { useState } from "react";
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";

const Login = () => {


  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [visible, setVisible]=useState(false);
  const navigate=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    await axios.post(`${server}/user/login-user`, {
      email,
      password
    }, {withCredentials:true}).then((res)=>{
      toast.success("Logged in succesfully");
      navigate('/');
      window.location.reload();
    }).catch((err)=>{
      toast.error(err.response.data.message);
      console.log(err);
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg-px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white rounded-md py-8 px-4 shadow sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-700 font-medium"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  autoComplete="email"
                  name="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className='appearance-none border border-gray-300 py-2 px-3 rounded-md shadow-sm w-full placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="passsword"
                className="block text-sm text-gray-700 font-medium"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible?"text":"password"}
                  required
                  autoComplete="current-password"
                  name="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  className='appearance-none border border-gray-300 py-2 px-3 rounded-md shadow-sm w-full placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
                {
                  visible?<AiOutlineEye
                  className='absolute cursor-pointer top-2 right-2'
                  onClick={()=>setVisible(false)}
                  size={25}
                />
                :<AiOutlineEyeInvisible
                  className='absolute cursor-pointer top-2 right-2'
                  onClick={()=>setVisible(true)}
                  size={25}
                />
                }
              </div>
            </div>
            <div className={`${styles.noramlFlex} justify-between`}>
                <div className={`${styles.noramlFlex}`}>
                  <input type="checkbox" name="remember-me" id="remember-me"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="rememver-me" className="ml-2 text-sm text-gray-900 block">Remember me</label>
                </div>
                <a href=".forgot-password"
                className="text-md text-blue-600 hover:text-blue-500">Forgot your password?</a>
            </div>
            <div>
              <button className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Submit
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
                <h4>Not have any account?</h4>
                <Link to='/sign-up' className="pl-2 text-blue-600 hover:text-blue-700">
                  Sign Up
                </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

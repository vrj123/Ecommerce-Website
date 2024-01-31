import React, { useState, useEffect } from "react";
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";
import { RxAvatar } from "react-icons/rx";
import {useSelector} from 'react-redux';

const ShopCreate = () => {


  const [email, setEmail]=useState("");
  const [name, setName]=useState("");
  const [phoneNumber, setPhoneNumber]=useState();
  const [zipCode, setZipCode]=useState();
  const [address, setAddress]=useState("");
  const [avatar, setAvatar]=useState();
  const [password, setPassword]=useState("");
  const [visible, setVisible]=useState(false);
  const navigate=useNavigate();

  const {isSeller, seller}=useSelector((state)=>state.seller);

  useEffect(()=>{
    if(isSeller){
      navigate(`/shop/${seller._id}`);
    }
  })

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const config = { header: { "Content-Type": "multipart/fprm-data" } };
    const newForm = new FormData();

    newForm.append("avatar", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);
    newForm.append("zipCode", zipCode);
    newForm.append("phoneNumber", phoneNumber);
    newForm.append("address", address);

    axios
      .post(`${server}/shop/create-shop`, {
        avatar,
        name,
        email,
        password,
        zipCode,
        phoneNumber,
        address,
      })
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setAvatar();
        setPassword("");
        setZipCode("");
        setAddress("");
        setPhoneNumber("");

      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  const handleFileInputChange=(e)=>{
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg-px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Become Sellar
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white rounded-md py-8 px-4 shadow sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm text-gray-700 font-medium"
              >
                Shop Name
              </label>
              <div className="mt-1">
                <input
                  type="name"
                  required
                  name="name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  className='appearance-none border border-gray-300 py-2 px-3 rounded-md shadow-sm w-full placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="phone-number"
                className="block text-sm text-gray-700 font-medium"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  required
                  name="phone-number"
                  value={phoneNumber}
                  onChange={(e)=>setPhoneNumber(e.target.value)}
                  className='appearance-none border border-gray-300 py-2 px-3 rounded-md shadow-sm w-full placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-700 font-medium"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  name="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className='appearance-none border border-gray-300 py-2 px-3 rounded-md shadow-sm w-full placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm text-gray-700 font-medium"
              >
                Address
              </label>
              <div className="mt-1">
                <input
                  type="address"
                  required
                  name="address"
                  value={address}
                  onChange={(e)=>setAddress(e.target.value)}
                  className='appearance-none border border-gray-300 py-2 px-3 rounded-md shadow-sm w-full placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="zipcode"
                className="block text-sm text-gray-700 font-medium"
              >
                Zipcode
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  required
                  name="zipcode"
                  value={zipCode}
                  onChange={(e)=>setZipCode(e.target.value)}
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
            <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            <div>
              <button className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Submit
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
                <h4>Already have an account?</h4>
                <Link to='/shop-login' className="pl-2 text-blue-600 hover:text-blue-700">
                  Sign in
                </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;

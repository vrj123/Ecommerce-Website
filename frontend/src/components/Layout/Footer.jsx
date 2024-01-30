import React from "react";
import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle, AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import { footerCompanyLinks , footerProductsLinks, footerSupportLinks } from "../../static/data";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#000] text-white">
      <div className="md:flex md:items-center md:justify-between sm:px-12 px-4 bg-[#342ac8] py-7">
        <h1 className="text-3xl text-white font-semibold lg:4xl md:mb-0 md:w-2/5 mb-6">
          <span className="text-[#56d879]">Subscribe</span> us for get news{" "}
          <br />
          events and offers
        </h1>
        <div className="flex gap-[10px]">
          <input type="text" placeholder="Enter your mail" className="px-4 py-2 rounded-md"/>
          <button className="bg-[#56d879] text-white py-2 px-4 rounded-md">Submit</button>
        </div>
      </div>

      <div className="px-5 sm:px-8 py-12 grid grid-cols-1 gap-6 sm:grid-cols-3  lg:grid-cols-4">
          <div className="text-center sm:text-start">
              <img src="https://shopo.quomodothemes.website/assets/images/logo.svg" alt="" 
                  style={{filter:"brightness(0) invert(1)"}}
                  className='mx-auto sm:mx-0'
              />
              <p className="text-[20px] mt-[15px]">The home and elements needed to <br /> create beautiful products.</p>
              <div className="flex gap-[15px] mt-[10px] justify-center sm:justify-start">
                  <AiFillYoutube size={20} className='cursor-pointer'/>
                  <AiOutlineTwitter size={20} className='cursor-pointer'/>
                  <AiFillInstagram size={20} className='cursor-pointer'/>
                  <AiFillFacebook size={20} className='cursor-pointer'/>
              </div>
          </div>
          <ul className="text-center sm:text-start">
            <h1 className="mb-1 font-semibold">Company</h1>
            {footerCompanyLinks.map((link)=>{
                return(
                    <li key={link.name}>
                        <Link to={link.link}
                        className='text-gray-400 hover:text-teal-400 duration-300'
                        >{link.name}</Link>
                    </li>
                )
            })}
          </ul>
          <ul className="text-center sm:text-start">
            <h1 className="mb-1 font-semibold">Shop</h1>
            {footerProductsLinks.map((link)=>{
                return(
                    <li key={link.name}>
                        <Link to={link.link}
                        className='text-gray-400 hover:text-teal-400 duration-300'
                        >{link.name}</Link>
                    </li>
                )
            })}
          </ul>
          <ul className="text-center sm:text-start">
            <h1 className="mb-1 font-semibold">Support</h1>
            {footerSupportLinks.map((link)=>{
                return(
                    <li key={link.name}>
                        <Link to={link.link}
                        className='text-gray-400 hover:text-teal-400 duration-300'
                        >{link.name}</Link>
                    </li>
                )
            })}
          </ul>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
         text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© 2024 VijayJadhav. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <div className="sm:block flex items-center justify-center w-full">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;

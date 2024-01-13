import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { Country, State } from "country-state-city";
import { useSelector } from "react-redux";
import Header from '../Layout/Header';
import axios from 'axios';
import { server } from "../../server";
import { toast } from "react-toastify";
import CheckoutSteps from "./CheckoutSteps";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [userInfo, setUserInfo] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [couponCode, setCouponCode]=useState("");
  const [couponCodeData, setCouponCodedata]=useState(null);
  const [discount, setDiscount]=useState(0);
  const navigate=useNavigate();
 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subTotalPrice=cart.reduce((total, item)=>total+item.qty*item.discountPrice, 0);
  const shipping=subTotalPrice>500?0:40;

  // discount=couponCodeData?(subTotalPrice*(couponCodeData.value)/100).toFixed(2):0;

  let totalPrice=subTotalPrice+shipping-discount;

  const handleSubmit=async(e)=>{
    e.preventDefault();

    await axios.get(`${server}/coupon/get-coupon-value/${couponCode}`).then((res)=>{
      const {coupon}=res.data;
      const validProducts=cart && cart.filter((item)=>{
        return item.shopId===coupon.shopId;
      })

      
      if(!validProducts){
        toast.error('Coupon not applicable to any product');
      } 
      else{
        const eligiblePrice=validProducts.reduce((total, item)=>total+item.discountPrice*item.qty, 0);
        setDiscount(eligiblePrice*coupon.value/100);
        toast.success('Coupon applied successfully');
      }
    }).catch((error)=>{
      toast.error(error.response.data.message);
    })
    setCouponCode("");
  }


  const paymentSubmit=()=>{

    if(address1==="" || zipCode===null || country==="" || city===""){
      toast.error("Plese provide all shipping address details");
      return;
    }


    const shippingAddress={
      address1,
      address2,
      city,
      country,
      zipCode
    }

    const orderData={
      cart,
      totalPrice,
      subTotalPrice,
      discount,
      shipping,
      shippingAddress,
      user
    }

    localStorage.setItem('lastOrder', JSON.stringify(orderData));
    navigate('/payment');
  }

  

  return (
    <>
      <Header/>
      <br/>
      <br />
      <CheckoutSteps/>
      <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex gap-[20px]">
        <div className="w-full 1000px:w-[65%]">
          <ShippingInfo
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            zipCode={zipCode}
            setZipCode={setZipCode}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            user={user}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData 
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discount={discount}
          />
        </div>
      </div>
      <button className={`${styles.button} text-white`} onClick={paymentSubmit}>
        Go to Payment
      </button>
    </div>
    </>
  );
};

const ShippingInfo = ({
  country,
  setCountry,
  city,
  setCity,
  zipCode,
  setZipCode,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  user,
}) => {
  return (
    <div className="bg-white p-2">
      <h1 className="text-[18px] font-[600]">Shipping Address</h1>
      <div className="mt-4">
        <form action="">
          <div className="flex items-center flex-wrap gap-[2%]">
            <div className="w-[90%] 800px:w-[48%] pb-4">
              <label htmlFor="" className="text-gray-700 block pb-2">
                Full Name
              </label>
              <input
                type="text"
                className={`${styles.input} w-[95%]`}
                value={user && user.name}
              />
            </div>
            <div className="w-[90%] 800px:w-[48%] pb-4">
              <label htmlFor="" className="text-gray-700 block pb-2">
                Email Address
              </label>
              <input
                type="email"
                className={`${styles.input} w-[95%]`}
                value={user && user.email}
              />
            </div>
            <div className="w-[90%] 800px:w-[48%] pb-4">
              <label htmlFor="" className="text-gray-700 block pb-2">
                Phone Number
              </label>
              <input
                type="number"
                className={`${styles.input} w-[95%]`}
                value={user && user.phoneNumber}
              />
            </div>
            <div className="w-[90%] 800px:w-[48%] pb-4">
              <label htmlFor="" className="text-gray-700 block pb-2">
                Zipcode
              </label>
              <input
                type="number"
                className={`${styles.input} w-[95%]`}
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </div>
            <div className="w-[90%] 800px:w-[48%] pb-4">
              <label htmlFor="">Country</label>
              <select
                name=""
                id=""
                className="block border border-gray-300 w-full py-1 px-2"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                <option value="">Choose your country</option>
                {Country.getAllCountries().map((item) => (
                  <option value={item.isoCode} key={item.isoCode}>
                    {item.isoCode}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[90%] 800px:w-[48%] pb-4">
              <label htmlFor="">City</label>
              <select
                name=""
                id=""
                className="block border border-gray-300 w-full py-1 px-2"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              >
                <option value="">Choose your city</option>
                {State &&
                  State.getStatesOfCountry(country).map((item) => (
                    <option value={item.isoCode} key={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-[90%] 800px:w-[48%] pb-4">
              <label htmlFor="" className="text-gray-700 block pb-2">
                Address1
              </label>
              <input type="text" className={`${styles.input} w-[95%]`} value={address1}
                onChange={(e) => setAddress1(e.target.value)} required/>
            </div>
            <div className="w-[90%] 800px:w-[48%] pb-4">
              <label htmlFor="" className="text-gray-700 block pb-2">
                Address2
              </label>
              <input type="text" className={`${styles.input} w-[95%]`} value={address2}
                onChange={(e) => setAddress2(e.target.value)}/>
            </div>
            <h5
              className="cursor-pointer place-self-start w-[100%]"
              onClick={() => setUserInfo(!userInfo)}
            >
              Choose from saved
            </h5>
            {userInfo && (
              <div>
                {user &&
                  user.addresses.map((address, index) => (
                    <div key={index} className="flex gap-[4px]">
                      <input type="radio" name="address" onClick={()=>{
                        setAddress1(address.address1)
                        setAddress2(address.address2)
                        setCountry(address.country)
                        setCity(address.city)
                        setZipCode(address.zipCode)
                      }}/>
                      <h2>{address.addressType}</h2>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discount,
}) => {
  return(
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
    <div className="flex justify-between">
      <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
      <h5 className="text-[18px] font-[600]">${subTotalPrice}</h5>
    </div>
    <br />
    <div className="flex justify-between">
      <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
      <h5 className="text-[18px] font-[600]">${shipping}</h5>
    </div>
    <br />
    <div className="flex justify-between border-b pb-3">
      <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
      <h5 className="text-[18px] font-[600]">${discount}</h5>
    </div>
    <h5 className="text-[18px] font-[600] text-end pt-3">${totalPrice}</h5>
    <br />
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className={`${styles.input} h-[40px] pl-2`}
        placeholder="Coupoun code"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        required
      />
      <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Apply code"
          type="submit"
        />
      </form>
      </div>
  )
};

export default Checkout;

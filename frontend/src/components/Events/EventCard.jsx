import React from "react";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cart";
import { local_server } from "../../server";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const EventCard = ({event}) => {

  const {cart}=useSelector((state)=>state.cart);
  const dispatch=useDispatch();

  const addToCartHandler = (id) => {
    const isProductExists = cart && cart.find((i) => i._id === id);
    if (isProductExists) {
      toast.error("Product already in cart");
    } else {
      if (event.stock < 1) toast.error("Product quantity is less");
      else {
        const cartData = { ...event, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart");
      }
    }
  };


  return (
    <div className="w-full bg-white block rounded-lg p-2 lg:flex">
      <div className="w-full lg:w-[50%] m-auto">
        <img src={`${event?.images[0].url}`} alt="" />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>Iphone14 pro max</h2>
        <p>
         {event?.description}
        </p>
        <div className="py-2 flex justify-between">
          <div className="flex">
            <h5 className='font-[500] text-[18px] text-[#d55b45] pr-3 line-through'>{event?.originalPrice}$</h5>
            <h5 className='font-bold text-[20px] text-[#333] font-Roboto'>{event?.discountPrice}$</h5>
          </div>
          <p className="text-[green]">{event?.sold_out} sold</p>
        </div>
        <div>
            <CountDown event={event}/>
        </div>
        <div className="mt-6 flex gap-[10px]">
          <Link to={`/product/${event?._id}?isEvent=true`} className={`${styles.button} text-white !w-[120px]`}>See details</Link>
          <div className={`${styles.button} text-white`} onClick={()=>addToCartHandler(event._id)}>
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

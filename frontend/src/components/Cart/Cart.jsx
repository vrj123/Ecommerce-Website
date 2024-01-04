import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import styles from "../../styles/styles";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import { local_server } from "../../server";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const totalPrice = cart.reduce(
    (total, item) => total + item.discountPrice * item.qty,
    0
  );

  const deleteFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const quantityHandler = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <div className="fixed top-0 left-0 bg-[#0000004b] w-full h-screen z-10">
      <div className="fixed top-0 right-0 bg-white w-[25%] flex flex-col justify-between shadow-sm min-h-full">
      {cart.length !== 0 ? (
          <>
            <div>
              <div
                className="flex justify-end pt-5 pr-5 cursor-pointer"
                onClick={() => setOpenCart(false)}
              >
                <RxCross1 size={20} />
              </div>
              <div className={`${styles.noramlFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {cart.length} items
                </h5>
              </div>
              <div className="w-full border-t">
                {cart &&
                  cart.map((data, index) => {
                    return (
                      <CartSingle
                        key={index}
                        data={data}
                        quantityHandler={quantityHandler}
                        removeFromCart={deleteFromCart}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="px-5 mb-3">
              <Link to="/checkout">
                <div className="rounded-[5px] w-full h-[45px] bg-[#e44343] flex items-center py-2 px-4 justify-center">
                  <h1 className="font-[000] text-[18px] text-white">
                    Checkout Now ${totalPrice}
                  </h1>
                </div>
              </Link>
            </div>
          </>
        ) : (
          <div>
            <div
              className="flex justify-end pt-5 pr-5 cursor-pointer"
              onClick={() => setOpenCart(false)}
            >
              <RxCross1 size={20} />
            </div>
            <div className="font-[600] text-[18px] mt-[40px] pl-[10px]">
              No item in the cart
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityHandler, removeFromCart }) => {
  const [value, setValue] = useState(1);
  const totalPrice = value * data.discountPrice;

  const incrementValue = (data) => {
    if (data.stock < value + 1) {
      toast.error("Item quntity is less");
    } else {
      setValue(value + 1);
      const updatedCart = { ...data, qty: value + 1 };
      quantityHandler(updatedCart);
    }
  };
  const decrementValue = (data) => {
    if (value > 1) {
      setValue(value - 1);
      const updatedCart = { ...data, qty: value - 1 };
      quantityHandler(updatedCart);
    }
  };
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className="w-[25px] h-[25px] cursor-pointer rounded-full bg-[#e44343] border border-[#e4434373] flex items-center justify-center"
            onClick={() => incrementValue(data)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{value}</span>
          <div
            className="w-[25px] h-[25px] cursor-pointer rounded-full bg-[#a7abb14f] flex items-center justify-center"
            onClick={() => decrementValue(data)}
          >
            <HiOutlineMinus size={18} color="#7d879c" />
          </div>
        </div>
        <img
          src={`${local_server}${data.images[0]}`}
          alt=""
          className="w-[80px] h-[80px] ml-2"
        />
        <div className="pl-[5px]">
          <h1>{data.name.slice(0, 20)}...</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
          {data.discountPrice}*{data.qty}
          </h4>
          <h4 className="text-[17px] font-[600] pt-[3px] font-Roboto text-[#d02222]">
            ${totalPrice}
          </h4>
        </div>
        <MdDelete
          className="ml-[20px] text-[red] self-start cursor-pointer"
          size={25}
          onClick={() => removeFromCart(data)}
        />
      </div>
    </div>
  );
};

export default Cart;

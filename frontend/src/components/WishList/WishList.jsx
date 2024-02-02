import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import styles from "../../styles/styles";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {removeFromWishlist} from '../../redux/actions/wishlist';
import { local_server } from "../../server";
import { addToCart } from "../../redux/actions/cart";

const WishList = ({ setOpenWishList }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (item) => {
    dispatch(removeFromWishlist(item));
  };
  const addToCartHandler = (data) => {
    const cartData = { ...data, qty: 1 };
    dispatch(addToCart(cartData));
    setOpenWishList(false);
  };

  return (
    <div className="fixed top-0 left-0 bg-[#0000004b] w-full h-screen z-10">
      <div className="fixed top-0 right-0 bg-white w-[80%] md:w-[35%] 800px:w-[25%] flex flex-col justify-between shadow-sm min-h-full">
        {wishlist && wishlist.length !== 0 ? (
          <div>
            <div
              className="flex justify-end pt-5 pr-5 cursor-pointer"
              onClick={() => setOpenWishList(false)}
            >
              <RxCross1 size={20} />
            </div>
            <div className={`${styles.noramlFlex} p-4`}>
              <AiOutlineHeart size={25} />
              <h5 className="pl-2 text-[20px] font-[500]">
                {wishlist.length} items
              </h5>
            </div>
            <div className="w-full border-t">
              {wishlist &&
                wishlist.map((data, index) => {
                  return (
                    <CartSingle
                      key={index}
                      data={data}
                      removeFromWishlistHandler={removeFromWishlistHandler}
                      addToCartHandler={addToCartHandler}
                    />
                  );
                })}
            </div>
          </div>
        ) : (
          <div>
            <div
              className="flex justify-end pt-5 pr-5 cursor-pointer"
              onClick={() => setOpenWishList(false)}
            >
              <RxCross1 size={20} />
            </div>
            <div className="pl-2 pt-4">No item in wishlist!</div>
          </div>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <BsCartPlus
          className="cursor-pointer"
          size={20}
          onClick={() => addToCartHandler(data)}
        />
        <img src={`${local_server}${data.images[0]}`} />
        <div className="pl-[5px]">
          <h1>{data.name.slice(0, 20)}...</h1>
          <h4 className="text-[17px] font-[600] pt-[3px] font-Roboto text-[#d02222]">
            ${data.discountPrice}
          </h4>
        </div>
        <MdDelete
          className="ml-[20px] text-[red] self-start cursor-pointer"
          size={25}
          onClick={() => removeFromWishlistHandler(data)}
        />
      </div>
    </div>
  );
};

export default WishList;

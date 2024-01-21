import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import ProductDetails from "../ProductDetailsCard/ProductDetails";
import { useDispatch, useSelector } from "react-redux";
import {addToWishlist, removeFromWishlist} from '../../../redux/actions/wishlist';
import {addToCart} from '../../../redux/actions/cart';
import {local_server} from '../../../server';
import {toast} from 'react-toastify';
import Ratings from "../../Product/Ratings";

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const { isSeller, seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const d = data.name;
  const product_name = d?.replace(/\s+/g, "-");
  const addToWishlistHandler = () => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const removeFromWishlistHandler = () => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isProductExists = cart && cart.find((i) => i._id === id);
    if (isProductExists) {
      toast.error("Product already in cart");
    } else {
      if (data.stock < 1) toast.error("Product quantity is less");
      else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart");
      }
    }
  };

  return (
    <div className="w-[250px] md:w-full h-[390px] bg-white rounded-lg shadow-sm relative overflow-hidden pt-2">
      <div className="flex justify-center">
        <div>
          <Link to={`/product/${data._id}`}>
            <img
              src={`${local_server}${data.images && data.images[0]}`}
              className="w-full h-[170px] object-contain"
            />
          </Link>
          <div className="p-4">
            <Link
              to={
                isSeller
                  ? `/shop/${data.shop._id}`
                  : `/shop/preview/${data.shop._id}`
              }
            >
              <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
            </Link>
            <Link to={`/product/${data._id}`}>
              <h4 className="pb-3 font-[500]">
                {data.name.length > 40
                  ? data.name.slice(0, 40) + "..."
                  : data.name}
              </h4>
              <div className="flex">
              <Ratings rating={data?.ratings}/>
              </div>
              <div className="flex justify-between py-2 flex-col">
                <div className="flex">
                  <h5 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}$ $
                  </h5>
                  <h4 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + " $" : null}
                  </h4>
                </div>
                <span className="font-[400] text-[17px] text-[#68d284]">
                  {data.sold_out} sold
                </span>
              </div>
            </Link>
          </div>
        </div>

        <div>
          {click ? (
            <AiFillHeart
              className="cursor-pointer absolute right-2 top-5"
              size={22}
              color="red"
              onClick={() => removeFromWishlistHandler()}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              className="cursor-pointer absolute right-2 top-5"
              size={22}
              onClick={() => addToWishlistHandler()}
              title="Add to wishlist"
              color="#333"
            />
          )}
          <AiOutlineEye
            className="cursor-pointer absolute right-2 top-14"
            size={22}
            title="Quick view"
            color="#333"
            onClick={() => setOpen(!open)}
          />
          <AiOutlineShoppingCart
            className="cursor-pointer absolute right-2 top-24"
            size={22}
            title="Add to cart"
            color="#333"
            onClick={() => addToCartHandler(data._id)}
          />
          {open ? <ProductDetails setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

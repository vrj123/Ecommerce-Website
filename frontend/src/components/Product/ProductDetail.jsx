import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { AiOutlineShoppingCart, AiOutlineMessage } from "react-icons/ai";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { local_server } from "../../server";
import Ratings from "./Ratings";

const ProductDetail = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const {allProducts}=useSelector((state)=>state.product);

  const decrementCount = () => {
    if (count > 1) setCount(count - 1);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const handleSubmit = () => {
    navigate("/inbox?coversation=507ebjver884ehfdjeriv84");
  };

  const addToCartHandler = (id) => {
    const isProductExists = cart && cart.find((i) => i._id === id);
    if (isProductExists) {
      toast.error("Product already in cart");
    } else {
      if (data.stock < count) toast.error("Product quantity is less");
      else {
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart");
      }
    }
  };

  const shopProducts=allProducts && allProducts.filter((product)=>product?.shopId===data?.shopId);
  let totalReviews=shopProducts && shopProducts.reduce((acc, product)=>acc+product?.reviews?.length, 0);
  const totalRatings=shopProducts && shopProducts.reduce((acc, product)=>acc+ product?.reviews?.reduce((sum, review)=>sum+review?.rating, 0), 0);
  const avg=totalRatings / totalReviews || 0;
  const avgRating = avg.toFixed(2);

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%] mt-[100px]`}>
          <div className="w-full py-5">
            <div className="w-full 800px:flex block">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${data.images[select].url}`}
                  alt=""
                  className="w-[80%] sm:h-[500px] mx-auto 1000px:mx-0 object-contain"
                />
                <div className="w-full flex mt-6">
                  {data.images &&
                    data.images.map((image, index) => (
                      <div
                        className={`cursor-pointer ${
                          select === index ? "border" : "null"
                        }`}
                        key={index}
                      >
                        <img
                          src={`${image.url}`}
                          alt="Product"
                          className="h-[150px] md:h-[200px]"
                          onClick={() => setSelect(index)}
                        />
                      </div>
                    ))}
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.discount_price}`}>
                    {data.discountPrice}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                  {data.originalPrice ? data.originalPrice + "$" : null}
                  </h3>
                </div>
                <div className="flex pt-12">
                  <button
                    className="bg-gradient-to-r from-teal-400 to-teal-500 text-white py-1 px-3 text-[20px] rounded-sm"
                    onClick={incrementCount}
                  >
                    +
                  </button>
                  <span className="bg-gray-200 py-1 px-3">{count}</span>
                  <button
                    className="bg-gradient-to-r from-teal-400 to-teal-500 text-white py-1 px-3 text-[20px] rounded-sm"
                    onClick={decrementCount}
                  >
                    -
                  </button>
                </div>
                <div
                  className={`${styles.button} bg-[#000] mt-8 !rounded-sm h-[11]`}
                  onClick={() => addToCartHandler(data._id)}
                >
                  <span className="text-white flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
                <div className="flex items-center gap-[20px] mt-[50px]">
                  <div className="flex items-center mt-[10px]">
                  <Link to={`/shop/preview/${data.shop._id}`}>
                      <img
                        src={`${data?.shop?.avatar?.url}`}
                        className="w-[50px] h-[50px] rounded-full mr-2"
                      />
                    </Link>
                    <div>
                      <h3 className={`${styles.shop_name}`}>
                        {data.shop.name}
                      </h3>
                      <h5 className="pb-3 text-[15px]">
                        ({avgRating}) rating
                      </h5>
                    </div>
                  </div>
                  <div
                    className={`${styles.button} mt-4 !rounded-sm h-[11] bg-[#6443d1]`}
                    onClick={handleSubmit}
                  >
                    <span className="text-white flex items-center">
                      Send message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ProDetailsInfo data={data} avgRating={avgRating}/>
        </div>
      ) : null}
    </div>
  );
};

const ProDetailsInfo = ({data, avgRating}) => {
  const [active, setActive] = useState(1);
  const { products } = useSelector((state) => state.product);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10px py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2 ">
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(3)}
          >
            Sellar Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
      </div>

      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line h-[40vh] overflow-y-scroll">
            {data.description}
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <p className="flex flex-col h-[40vh] overflow-y-scroll py-4">
          {
            (data && data?.reviews!==null) ?(
              data.reviews.map((review, index)=>(
              <div key={index} className='flex items-center'>
                <img src={`${local_server}${review.user.avatar}`} className='w-[50px] h-[50px] rounded-full' />
                <div className="pl-2">
                  <h1>{review.user.name}</h1>
                  <Ratings rating={review.rating}/>
                  <p className="font-[500]">{review.comment}</p>
                  <p>{review.createdAt}</p>
                </div>
              </div>
            ))):(
              <div>No reviews yet!</div>
            )
          }
        </p>
      ) : null}

      {
        active===3?(
          <div className="w-full block 800px:flex p-5 h-[40vh] overflow-y-scroll">
            <div className="800px:w-[50%]">
              <div className="flex items-center gap-[10px]">
                <img src={`${data?.shop?.avatar?.url}`} alt="" className="w-[50px] h-[50px] rounded-full" />
                <div>
                <h3 className={`${styles.shop_name}`}>
                        {data.shop.name}
                      </h3>
                      <h5 className="pb-3 text-[15px]">
                        ({avgRating}) rating
                      </h5>
                </div>
              </div>
              <p>{data.shop.description}</p>
            </div>
            <div className="800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
              <div className="text-left">
                <h5 className="font-[600]">
                  Joined on:{" "} <span className="font-[500]">{data.createAt.slice(0, 10)}</span>
                </h5>
                <h5 className="font-[600] pt-3">
                  Total Products:{" "} <span className="font-[500]">{products && products.length}</span>
                </h5>
                <h5 className="font-[600] pt-3">
                  Joined Reviews: <span className="font-[500]">200</span>
                </h5>
                <Link to={`/shop/preview/${data.shop._id}`}>
                  <div className={`${styles.button} text-[#fff] font-semibold !rounded-[4px] mt-3`}>
                    <h4>Visit Shop</h4>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ):null
      }
    </div>
  );
};

export default ProductDetail;

import React, { useState } from "react";
import { AiOutlineMessage, AiOutlineShoppingCart } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";

const ProductDetails = ({ setOpen, data }) => {
  const [count, setCount] = useState(1);

  const decrementCount = () => {
    if (count > 1) setCount(count - 1);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };
  return (
    <div className="bg-[#fff]">
      {data && (
        <div className="w-full fixed top-0 left-0 flex items-center justify-center z-40 bg-[#00000030] h-screen">
          <div className="h-[90vh] 800px:h-[75vh] w-[90%] 800px:w-[60%] overflow-y-scroll rounded-md bg-white shadow-sm relative p-4">
            <RxCross1
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img src={data.image_Url[0].url} />
                <div className="flex">
                  <img
                    src={data.shop.shop_avatar.url}
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div>
                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                    <h5 className="pb-3 text-[15px]">
                      ({data.shop.ratings}) rating
                    </h5>
                  </div>
                </div>
                <div
                  className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-[11]`}
                >
                  <span className="text-white flex items-center">
                    Send message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
                <h5 className="text-[red] mt-5 text-[16px]">
                  ({data.total_sell}) Sold out
                </h5>
              </div>

              <div className="w-full 800px:w-[50%] px-[5px] pt-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.name}
                </h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discount_price}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.price ? data.price + " $" : null}
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
                  className={`${styles.button} bg-[#000] mt-8 rounded-[4px] h-[11]`}
                >
                  <span className="text-white flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

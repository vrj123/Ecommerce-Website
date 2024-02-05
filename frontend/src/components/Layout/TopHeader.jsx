import React, { useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import Cart from "../Cart/Cart";
import WishList from "../WishList/WishList";
import Navbar from "./Navbar";

const TopHeader = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const { allProducts } = useSelector((state) => state.product);
  const { isSeller } = useSelector((state) => state.seller);
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [openCart, setOpenCart] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredProducts = allProducts.filter((product) => {
      return product.name.toLowerCase().includes(term.toLowerCase());
    });
    if (term === "") setSearchData(null);
    else setSearchData(filteredProducts);
  };

  return (
    <div>
      <div className={`px-2 shadow-sm z-20`}>
        <div className="hidden 800px:py-[10px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
              />
            </Link>
          </div>
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search here..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              className="absolute right-2 top-1.5 cursor-pointer"
              size={30}
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4 w-full overflow-y-scroll">
                {searchData.map((product, i) => {
                  return (
                    <Link to={`/product/${product._id}`}>
                      <div className="w-full flex shadow-sm mt-[10px]">
                        <img
                          src={`${product?.images[0]?.url}`}
                          alt=""
                          className="w-[40px] h-[40px] mr-[40px]"
                        />
                        <h1>{product.name}</h1>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div className={`${styles.button}`}>
            <Link to="/shop-create">
              <h1 className="text-[#fff] flex items-center">
                {isSeller ? "Seller Dashboard" : "Become Seller"}{" "}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full h-[50px] sticky top-0 left-0 bg-[#fff] shadow-sm z-10 800px:hidden">
        <div className="w-full flex items-center justify-between h-full">
          <div>
            <AiOutlineMenu
              size={40}
              className="ml-4 cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
              />
            </Link>
          </div>
          <div className="relative cursor-pointer mr-[15px] flex items-center">
            {isAuthenticated ? (
              <Link to="/profile">
                <img
                  src={`${user?.avatar?.url}`}
                  alt=""
                  className="w-[30px] h-[30px] rounded-full"
                />
              </Link>
            ) : (
              <Link to="/login">
                <CgProfile className="" size={30} />
              </Link>
            )}
            <AiOutlineShoppingCart
              className=""
              size={30}
              onClick={() => setOpenCart(true)}
            />
            <span className="bg-[#3bc177] rounded-full h-4 w-4 text-[12px] absolute top-0 right-0 leading-tight text-center text-white font-mono">
              {cart.length}
            </span>
          </div>
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
          {openWishList ? <WishList setOpenWishList={setOpenWishList} /> : null}
        </div>

        {open && (
          <div className="w-full h-full bf-[#0000005f] fixed left-0 top-0">
            <div className="bg-white w-[60%] md:w-[35%] h-screen fixed top-0 left-0 p-2 overflow-y-scroll">
              <div className="flex items-center justify-between">
                <div
                  className="relative cursor-pointer mr-[15px]"
                  onClick={() => setOpenWishList(true)}
                >
                  <AiOutlineHeart size={30} />
                  <span className="bg-[#3bc177] rounded-full h-4 w-4 text-[12px] absolute top-0 right-0 leading-tight text-center text-white font-mono">
                    {wishlist.length}
                  </span>
                </div>
                <RxCross1
                  size={20}
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-[100%] relative mt-[20px]">
                <input
                  type="text"
                  placeholder="Search here..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                />
                <AiOutlineSearch
                  className="absolute right-2 top-1.5 cursor-pointer"
                  size={30}
                />
                {searchData && searchData.length !== 0 ? (
                  <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                    {searchData.map((product, i) => {
                      return (
                        <Link to={`/product/${product._id}`}>
                          <div className="w-full flex mt-[20px]">
                            <img
                              src={product.images[0]?.url}
                              alt=""
                              className="w-[40px] h-[40px] mr-[20px]"
                            />
                            <h1>{product.name.slice(0, 40)}...</h1>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
              <div>
                <Navbar />
              </div>
              <div className="bg-white border border-black border-1 py-2 w-fit px-4 rounded-sm mt-4">
                <Link to="/shop-create">
                  <h1 className="flex items-center">
                    {isSeller ? "Seller Dashboard" : "Become Seller"}{" "}
                    <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopHeader;

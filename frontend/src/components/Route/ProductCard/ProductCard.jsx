import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../styles/styles';
import {AiFillHeart, AiFillStar, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart} from 'react-icons/ai';
import ProductDetails from '../ProductDetailsCard/ProductDetails';

const ProductCard = ({data}) => {

    const [click, setClick]=useState(false);
    const [open, setOpen]=useState(false);

    const d=data.name;
    const product_name=d.replace(/\s+/g, "-");


  return (
    <div className='w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer'>
    <div className='flex justify-center'> 
        <div>
            <Link to={`/product/${product_name}`}>
                <img src={data.image_Url[0].url} className="w-full h-[170px] object-contain"/>
            </Link>
            <Link to='/'>
            <h5 className={`${styles.shop_name}`}>
            {data.shop.name}
            </h5>
            </Link>
            <Link to={`/product/${product_name}`}>
                <h4 className='pb-3 font-[500]'>
                    {data.name.length>40?data.name.slice(0, 40)+"...":data.name}
                </h4>
                <div className="flex">
                    <AiFillStar className='cursor-pointer mr-2 text-[#F6BA00]' size={20}/>
                    <AiFillStar className='cursor-pointer mr-2 text-[#F6BA00]' size={20}/>
                    <AiFillStar className='cursor-pointer mr-2 text-[#F6BA00]' size={20}/>
                    <AiFillStar className='cursor-pointer mr-2 text-[#F6BA00]' size={20}/>
                    <AiFillStar className='cursor-pointer mr-2 text-[#F6BA00]' size={20}/>
                </div>
                <div className='flex items-center justify-between py-2'>
                    <div className='flex'>
                        <h5 className={`${styles.productDiscountPrice}`}>
                            {data.price===0?
                            data.price:data.discount_price
                            }
                            $
                        </h5>
                        <h4 className={`${styles.price}`}>
                            {data.price?data.price+" $":null}
                        </h4>
                    </div>
                    <span className='font-[400] text-[17px] text-[#68d284]'>
                        {data.total_sell} sold
                    </span>
                </div>
            </Link>
        </div>

        <div>
            {
                click?(<AiFillHeart
                    className='cursor-pointer absolute right-2 top-5'
                    size={22}
                    color='red'
                    onClick={()=>setClick(!click)}
                    title='Remove from wishlist'
                />):
                (<AiOutlineHeart
                    className='cursor-pointer absolute right-2 top-5'
                    size={22}
                    onClick={()=>setClick(!click)}
                    title='Add to wishlist'
                    color='#333'
                />)
            }
            <AiOutlineEye
                className='cursor-pointer absolute right-2 top-14'
                size={22}
                title="Quick view"
                color='#333'
                onClick={()=>setOpen(!open)}
            />
            <AiOutlineShoppingCart
                className='cursor-pointer absolute right-2 top-24'
                size={22}
                title="Add to cart"
                color='#333'
                onClick={()=>setOpen(!open)}
            />
            {open?<ProductDetails setOpen={setOpen} data={data}/>:null}
        </div>
    </div>

    </div>
  )
}

export default ProductCard;
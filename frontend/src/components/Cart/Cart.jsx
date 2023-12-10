import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx';
import {IoBagHandleOutline} from 'react-icons/io5';
import styles from '../../styles/styles';
import {HiOutlineMinus, HiPlus} from 'react-icons/hi';
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';


const Cart = ({setOpenCart}) => {

    const cartData=[
        {
            name:"Iphone 14",
            description:"Latest mobile with high camera Queslity",
            price:999
        },
        {
            name:"Iphone 14",
            description:"Latest mobile with high camera Queslity",
            price:999
        }
    ]
  return (
    <div className='fixed top-0 left-0 bg-[#0000004b] w-full h-screen z-10'>
      <div className='fixed top-0 right-0 bg-white w-[25%] flex flex-col justify-between shadow-sm min-h-full'>
        <div>
          <div className='flex justify-end pt-5 pr-5 cursor-pointer' onClick={()=>setOpenCart(false)}>
          <RxCross1 size={20}/>
          </div>
          <div className={`${styles.noramlFlex} p-4`}>
            <IoBagHandleOutline size={25}/>
            <h5 className='pl-2 text-[20px] font-[500]'>
            {cartData.length} items
            </h5>
          </div>
          <div className='w-full border-t'>
          {
              cartData && cartData.map((data, index)=>{
                return <CartSingle key={index} data={data}/>
              })
          }
          </div>
        </div>
        <div className='px-5 mb-3'>
          <Link to='/checkout'>
            <div className='rounded-[5px] w-full h-[45px] bg-[#e44343] flex items-center py-2 px-4 justify-center'>
              <h1 className='font-[000] text-[18px] text-white'>Checkout Now</h1>
            </div>
          </Link>

        </div>
      </div>
    </div>
  )
}


const CartSingle=({data})=>{

  const [value, setValue]=useState(1);
  const totalPrice=value*data.price;
 


  const incrementValue=()=>{
    setValue(value+1);
  }
  const decrementValue=()=>{
    if(value>1) setValue(value-1);
  }
  return(
    <div className='border-b p-4'>
      <div className='w-full flex items-center'>
        <div>
          <div className='w-[25px] h-[25px] cursor-pointer rounded-full bg-[#e44343] border border-[#e4434373] flex items-center justify-center' onClick={incrementValue}>
            <HiPlus size={18} color='#fff'/>
          </div>
          <span className='pl-[10px]'>{value}</span>
          <div className='w-[25px] h-[25px] cursor-pointer rounded-full bg-[#a7abb14f] flex items-center justify-center' onClick={decrementValue}>
            <HiOutlineMinus size={18} color='#7d879c'/>
        </div>
        </div>
        <img src="https://bonik-react.vercel.app/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png" alt="" className='w-[80px] h-[80px] ml-2'/>
        <div className='pl-[5px]'>
          <h1>{data.name}</h1>
          <h4 className='font-[400] text-[15px] text-[#00000082]'>{data.price}*{value}</h4>
          <h4 className='text-[17px] font-[600] pt-[3px] font-Roboto text-[#d02222]'>
            ${totalPrice}
          </h4>
        </div>
        <MdDelete className='ml-[20px] text-[red] self-start cursor-pointer' size={25}/>
      </div>

    </div>
  )
}

export default Cart;
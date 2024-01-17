import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import styles from "../../styles/styles";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserOrders } from "../../redux/actions/order";
import { local_server } from "../../server";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from 'axios';
import {server} from '../../server';

const UserOrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [rating, setRating]=useState(0);
  const [comment, setComment]=useState("");

  useEffect(() => {
    dispatch(getAllUserOrders(user?._id));
  }, [id, dispatch, user]);

  const data = orders && orders.find((item) => item._id === id);

  const reviewHandler =async(productId) => {
    try{
        await axios.put(`${server}/product/create-new-review`, {rating, user, comment, productId, orderId:id});
        toast.success('Reviewed succesfully');
        setComment('');
        setRating(0);
        setOpen(false);
        dispatch(getAllUserOrders(user._id));
    }
    catch(error){
        toast.error(error.response.data.message);
    }
  };

  const returnHandler=async()=>{
    try{
      await axios.put(`${server}/order/return-order/${id}`, {status:"Processing return"});
      toast.success("Return succesfully");
      dispatch(getAllUserOrders(user?.id));
    }
    catch(error){
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{data?._id.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: <span>{data?.createdAt.slice(0, 10)}</span>
        </h5>
      </div>
      <div>
        {data &&
          data?.cart.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-[10px] border-b py-5">
                <img
                  src={`${local_server}${item.images[0]}`}
                  className="w-[50px] h-[50px]"
                />
                <div>
                  <h5>{item.name.slice(0, 40)}...</h5>
                  <h5 className="text-[#00000084] text-[14px]">
                    ${item.discountPrice}
                  </h5>
                </div>
              </div>
              {data?.status === "Delivered" && !item.isReviewed && (
                <div
                  className={`${styles.button} text-white`}
                  onClick={() => setOpen(true) || setSelectedItem(item)}
                >
                  Write a review
                </div>
              )}
            </div>
          ))}

        {open && (
          <div className="bg-[#0005] fixed top-0 left-0 h-screen w-full flex items-center justify-center z-50">
            <div className="w-[90%] 800px:w-[50%] bg-white overflow-y-scroll h-[80vh] p-4 relative">
              <div className="absolute top-2 right-2 cursor-pointer" onClick={()=>setOpen(false)}>
                <RxCross1 size={20} />
              </div>
              <h2 className="text-center text-[20px] font-bold my-4">
                Give A Review
              </h2>
              <div className="flex gap-[10px] items-center">
                <img
                  src={`${local_server}${selectedItem.images[0]}`}
                  className="w-[80px] h-[80px]"
                />
                <div>
                  <h2 className="text-[18px]">
                    {selectedItem?.name.slice(0, 40)}...
                  </h2>
                  <div>US${selectedItem?.discountPrice}</div>
                </div>
              </div>
              <div>
                  <h1 className="text-[18px] font-[600] mt-12 pl-4">Give a Rating <span className="text-[red]">*</span></h1>
                  <div className="flex pl-4 pt-2">
                  {
                      [1,2,3,4,5].map((i)=>(
                          rating>=i ? (
                              <AiFillStar size={25} className='cursor-pointer' onClick={()=>setRating(i)} color='rgb(246, 186, 0)'/>
                          ):(
                              <AiOutlineStar size={25} className='cursor-pointer' onClick={()=>setRating(i)} color='rgb(246, 186, 0)' />
                          )
                      ))
                  }
                  </div>
              </div>
              <div className="mt-8 pl-4">
                  <div className="flex gap-[5px] items-center">
                  <h2 className="text-[18px] font-[600]">Write a Comment</h2>
                  <h2 className="text-[#00000082]">(Optional)</h2>
                  </div>
                  <textarea name="" id="" cols="30" rows="5" className="border p-2 w-[95%] mt-2" placeholder="How was our product? Please write about the product..." value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
              </div>
              <div className={`${styles.button} text-white ml-4`} onClick={()=>reviewHandler(selectedItem._id)}>
                  Submit
              </div>
            </div>
          </div>
        )}
        <div className="text-end text-[18px]">
          Total Price: <span className="font-[600]">${data?.totalPrice}</span>
        </div>
      </div>

      <div className="w-full 800px:flex items-center mt-12">
        <div className="w-full 800px:w-[60%]">
          <h4 className="text-[20px] pt-3 font-[600]">Shipping Address:</h4>
          <h4 className="pt-3 text-[18px]">
            {data?.shippingAddress.address1 +
              " " +
              data?.shippingAddress.address2}
          </h4>
          <h4 className="text-[18px]">{data?.shippingAddress.country}</h4>
          <h4 className="text-[18px]">{data?.shippingAddress.city}</h4>
          <h4 className="text-[18px]">{data?.user.phoneNumber}</h4>
        </div>

        <div className="w-full 800px:w-[40%]">
          <h4 className="text-[20px] font-[600]">Payment Info:</h4>
          <h4>
            Status:{" "}
            {data?.paymentInfo.status ? data.paymentInfo.status : "Not paid"}
          </h4>
         {
           data?.status==='Delivered' && (
             <div className={`${styles.button} text-white text-[18px] mt-4`} onClick={returnHandler}>
               Return
             </div>
           )
         }
        </div>
      </div>
    </div>
  );
};

export default UserOrderDetails;

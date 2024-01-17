import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import styles from "../../styles/styles";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllShopOrders } from "../../redux/actions/order";
import { local_server, server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const { id } = useParams();
  const { seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllShopOrders(seller._id));
  }, [id, dispatch, seller._id]);

  const data = orders && orders.find((item) => item._id === id);

  const orderUpdateHandler = async (e) => {
    try {
      await axios.put(
        `${server}/order/update-order-status/${id}`,
        { status },
        { withCredentials: true }
      );
      toast.success("Status updated successfully");
      navigate("/dashboard-orders");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const refundHandler=async()=>{
    try{
      await axios.put(`${server}/order/order-refund-success/${id}`, {status:'Refund success'}, {withCredentials:true});
      toast.success("Refunded successfully");
      dispatch(getAllShopOrders(seller._id));
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
        <Link to="/dashboard-orders">
          <div
            className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] text-[18px]`}
          >
            Order List
          </div>
        </Link>
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
          ))}
        <div className="text-end text-[18px]">
          Total Price: <span className="font-[600]">${data?.totalPrice}</span>
        </div>
      </div>

      <div className="w-full 800px:flex justify-between mt-8">
        <div>
          <h4 className="text-[20px] font-[600]">Shipping Address:</h4>
          <h4 className="pt-3 text-[18px]">
            {data?.shippingAddress.address1 +
              " " +
              data?.shippingAddress.address2}
          </h4>
          <h4 className="text-[18px]">{data?.shippingAddress.country}</h4>
          <h4 className="text-[18px]">{data?.shippingAddress.city}</h4>
          <h4 className="text-[18px]">{data?.user.phoneNumber}</h4>
        </div>

        <div>
          <h4 className="text-[20px] font-[600]">Payment Info:</h4>
          <h4>
            Status:{" "}
            {data?.paymentInfo.status ? data.paymentInfo.status : "Not paid"}
          </h4>
        </div>

        <div>
          <h4 className="text-[20px] font-[600]">Order Status:</h4>
          {data?.status !== "Processing return" &&
          data?.status !== "Refund success" ? (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="p-2"
            >
              {[
                "Processing",
                "Transferred to delivery partner",
                "Shipping",
                "Received",
                "On the way",
                "Delivered",
              ]
                .slice(
                  [
                    "Processing",
                    "Transferred to delivery partner",
                    "Shipping",
                    "Received",
                    "On the way",
                    "Delivered",
                  ].indexOf(data?.status)
                )
                .map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          ) : (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="p-2"
            >
              {["Processing return", "Refund success"]
                .slice(
                  ["Processing return", "Refund success"].indexOf(data?.status)
                )
                .map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          )}
          <div
            className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] text-[18px] mt-6`}
            onClick={status!=='Refund success'?orderUpdateHandler:refundHandler}
          >
            Update status
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

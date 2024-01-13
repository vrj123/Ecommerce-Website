import React, { useEffect, useState } from "react";
import {
  cardNumberElement,
  CardCvcelemnt,
  CardExpiryElement,
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { RxCross1 } from "react-icons/rx";

const Payment = () => {
  const [orderData, setOrderData] = useState();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("lastOrder"));
    setOrderData(data);
  }, []);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: orderData?.totalPrice,
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;

      let paymentInfo = payer;

      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };

  const paypalPaymentHandler = async (paymentInfo) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: "succeeded",
      type: "Paypal",
    };

    await axios
      .post(`${server}/order/create-order`, order, config)
      .then((res) => {
        setOpen(false);
        navigate("/order/success");
        toast.success("Order successful!");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        window.location.reload();
      });
  };

  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  };

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${server}/payment/process`,
        paymentData,
        config
      );
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          };
          await axios.post(`${server}/order/create-order`, order, config);
          setOpen(false);
          navigate("/order/success");
          toast.success("Order placed successfully");
          localStorage.setItem("cartItems", JSON.stringify([]));
          localStorage.setItem("lastOrder", JSON.stringify([]));
          window.location.reload();
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();

    try{
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      
      order.paymentInfo = {
        type: "Cash on delivery",
      };
      await axios.post(`${server}/order/create-order`, order, config);
      setOpen(false);
      navigate("/order/success");
      toast.success("Order placed successfully");
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("lastOrder", JSON.stringify([]));
      window.location.reload();
    }
    catch(error){
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] md:w-[70%] block md:flex gap-[2%] mx-auto">
        <div className="bg-white rounded-sm w-full md:w-[68%] pb-4">
          <PaymentInfo
            user={user}
            open={open}
            setOpen={setOpen}
            onApprove={onApprove}
            createOrder={createOrder}
            paymentHandler={paymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
          />
        </div>
        <div className="bg-white rounded-sm w-[70%] md:w-[30%] h-fit mt-[20px] md:mt-0">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({
  user,
  open,
  setOpen,
  onApprove,
  createOrder,
  paymentHandler,
  cashOnDeliveryHandler,
}) => {
  const [select, setSelect] = useState(0);
  console.log(open);
  return (
    <>
      <div className="px-2 py-4 border-b w-[90%] mx-auto">
        <input
          type="radio"
          name="payment"
          className="mr-[8px]"
          onChange={() => setSelect(1)}
        />
        <label htmlFor="" className="text-[18px] font-[600]">
          Pay with debit/credit card
        </label>
        {select === 1 && (
          <form onSubmit={paymentHandler}>
            <div className="w-full mt-[10px] flex flex-wrap gap-[2%]">
              <div className="w-full 800px:w-[48%] mt-[20px]">
                <label htmlFor="" className="block">
                  Name on card
                </label>
                <input type="text" className="border-b w-[95%]" required />
              </div>
              <div className="w-full 800px:w-[48%] mt-[20px]">
                <label htmlFor="" className="block">
                  Exp Date
                </label>
                <CardExpiryElement
                  className="border-b w-[95%]"
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        lineHeight: 1.5,
                        color: "#444",
                      },
                      empty: {
                        color: "#3a120a",
                        backgroundColor: "transparent",
                        "::placeholder": {
                          color: "#444",
                        },
                      },
                    },
                  }}
                />
              </div>
              <div className="w-full 800px:w-[48%] mt-[20px]">
                <label htmlFor="" className="block">
                  Card number
                </label>
                <CardNumberElement
                  className="border-b w-[95%]"
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        lineHeight: 1.5,
                        color: "#444",
                      },
                      empty: {
                        color: "#3a120a",
                        backgroundColor: "transparent",
                        "::placeholder": {
                          color: "#444",
                        },
                      },
                    },
                  }}
                />
              </div>
              <div className="w-full 800px:w-[48%] mt-[20px]">
                <label htmlFor="" className="block">
                  CVV
                </label>
                <CardCvcElement
                  className="border-b w-[95%]"
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        lineHeight: 1.5,
                        color: "#444",
                      },
                      empty: {
                        color: "#3a120a",
                        backgroundColor: "transparent",
                        "::placeholder": {
                          color: "#444",
                        },
                      },
                    },
                  }}
                />
              </div>
              <div className="w-full 800px:w-[48%] mt-[20px]">
                <input
                  type="submit"
                  className="border-b w-[95%] bg-[#f63b60] py-1 px-4 rounded-sm w-fit text-white text-[18px] font-[600] cursor-pointer"
                  value="Submit"
                />
              </div>
            </div>
          </form>
        )}
      </div>
      <div className="px-2 py-4 border-b w-[90%] mx-auto">
        <input
          type="radio"
          name="payment"
          className="mr-[8px]"
          onChange={() => setSelect(2)}
        />
        <label htmlFor="" className="text-[18px] font-[600]">
          Pay with Paypal
        </label>
        {select === 2 && (
          <div>
            <div
              className="bg-[#f63b60] py-1 px-4 rounded-sm w-fit text-white text-[18px] font-[600] cursor-pointer mt-6"
              onClick={() => setOpen(true)}
            >
              Pay Now
            </div>
            {open && (
              <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
                <div className="w-full 800px:w-[40%] h-screen 800px:h-[80vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 relative overflow-y-scroll">
                  <div className="w-full flex justify-end p-3">
                    <RxCross1
                      size={30}
                      className="cursor-pointer absolute top-3 right-3"
                      onClick={() => setOpen(false)}
                    />
                  </div>
                  <PayPalScriptProvider
                    options={{
                      "client-id":
                        "AYMXug1HpQb7jRYzuwLcEvDvVavc88xdLsBXPTauLWYRyjubOPixq1Phh9oID7mGn7q6QoC1SLzVWQCu",
                    }}
                  >
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      onApprove={onApprove}
                      createOrder={createOrder}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* <div className="px-2 py-4 border-b w-[90%] mx-auto">
        <div className="bg-[#f63b60] py-1 px-4 rounded-sm w-fit text-white text-[18px] font-[600] cursor-pointer">
          Pay Now
        </div>
      </div> */}
      <div className="px-2 py-4 border-b w-[90%] mx-auto">
        <input
          type="radio"
          name="payment"
          className="mr-[8px]"
          onChange={() => setSelect(3)}
        />
        <label htmlFor="" className="text-[18px] font-[600]">
          Cash on Delivery
        </label>
        {select === 3 && (
          <div className="w-full flex">
            <form className="w-full" onSubmit={cashOnDeliveryHandler}>
              <input
                type="submit"
                value="Confirm"
                className="bg-[#f63b60] py-1 px-4 rounded-sm w-fit text-white text-[18px] font-[600] cursor-pointer mt-6"
              />
            </form>
          </div>
        )}
      </div>
    </>
  );
};

const CartData = ({ orderData }) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${orderData?.subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">${orderData?.shipping}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">${orderData?.discount}</h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        ${orderData?.totalPrice}
      </h5>
      <br />
    </div>
  );
};

export default Payment;

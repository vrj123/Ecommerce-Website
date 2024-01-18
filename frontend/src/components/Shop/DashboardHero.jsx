import React, { useEffect, useState } from "react";
import { AiOutlineMoneyCollect, AiOutlineShopping } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllShopOrders } from "../../redux/actions/order";
import { getShopAllProducts } from "../../redux/actions/product";
import Loader from '../Layout/Loader';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { AiOutlineArrowRight } from 'react-icons/ai';


const DashboardHero = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { orders, isLoading } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.product);
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  useEffect(() => {
    dispatch(getAllShopOrders(seller._id));
    dispatch(getShopAllProducts(seller._id));

    const orderData =
      orders && orders.filter((order) => order.status === "Delivered");
    setDeliveredOrders(orderData);
  }, [dispatch, seller._id]);

  const totalEarning =
    deliveredOrders &&
    deliveredOrders.reduce((acc, item) => acc + item.totalPrice, 0);
  const serviceCharge = totalEarning * 0.1;
  const availableBalance = (totalEarning - serviceCharge).toFixed(2);
  const Orders=orders && [...orders];
  const latestOrders=Orders && Orders.sort((a, b)=>b.createdAt-a.createdAt).slice(0, 3);


  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        const status = params.value || "";

        return status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  latestOrders &&
    latestOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="w-full p-8">
      <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
      <div className="w-full block 800px:flex items-center justify-between">
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-4">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Account Balance
            </h3>
          </div>
          <h5 className="pt-4 text-[22px] font-[600] pl-8">
            ${availableBalance || 0}
          </h5>
          <Link to="/dashboard-withdraw-money">
            <h5 className="pl-4 pt-2 text-[#077f9c]">Withdraw money</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-4">
          <div className="flex items-center">
            <AiOutlineShopping size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All orders
            </h3>
          </div>
          <h5 className="pt-4 text-[22px] font-[600] pl-8">{orders?.length}</h5>
          <Link to="/dashboard-orders">
            <h5 className="pl-4 pt-2 text-[#077f9c]">View orders</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-4">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Products
            </h3>
          </div>
          <h5 className="pt-4 text-[22px] font-[600] pl-8">
            {products?.length}
          </h5>
          <Link to="/dashboard-products">
            <h5 className="pl-4 pt-2 text-[#077f9c]">View all products</h5>
          </Link>
        </div>
      </div>

      <div className="mt-4">
        <h1 className='text-[22px] font-[400]'>Latest orders</h1>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="w-full pt-1 mt-4 bg-white">
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHero;

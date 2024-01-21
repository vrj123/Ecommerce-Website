import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../Layout/Loader';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { getAllAdminOrders } from "../../redux/actions/order";


const AllOrders = () => {
  const dispatch = useDispatch();
  const {AdminOrders, isLoading}=useSelector((state)=>state.order);

  useEffect(() => {
    dispatch(getAllAdminOrders());

  }, []);



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

    // {
    //   field: " ",
    //   flex: 1,
    //   minWidth: 150,
    //   headerName: "",
    //   type: "number",
    //   sortable: false,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Link to={`/order/${params.id}`}>
    //           <Button>
    //             <AiOutlineArrowRight size={20} />
    //           </Button>
    //         </Link>
    //       </>
    //     );
    //   },
    // },
  ];

  const row = [];

  AdminOrders &&
    AdminOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="w-full p-8">
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

export default AllOrders;

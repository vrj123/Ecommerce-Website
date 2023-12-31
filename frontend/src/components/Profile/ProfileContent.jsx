import React, { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useSelector } from "react-redux";
import { local_server } from "../../server";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineDelete } from "react-icons/ai";
import {Button} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {MdOutlineTrackChanges} from 'react-icons/md';

const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail]=useState(user && user.email);
  const [phoneNumber, setPhoneNumber]=useState("");
  const [zipCode, setZipCode]=useState("");
  const [address1, setAddress1]=useState();
  const [address2, setAddress2]=useState();

  const handleSubmit=(e)=>{
      e.preventDefault();
  }

  return (
    <div className="w-full">
      {active === 1 && (
        <>
          <div className="w-full flex justify-center">
            <div className="relative">
              <img
                src={`${local_server}${user?.avatar}`}
                alt=""
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
              />
              <div>
                <AiOutlineCamera className="absolute w-[30px] h-[30px] rounded-full right-4 bottom-4 bg-[#E3E9EE] flex items-center justify-center" />
              </div>
            </div>
          </div>
          <div className="w-full p-4">
            <form action="" aria-required={true} onSubmit={handleSubmit}>
              <div className="flex items-center flex-wrap gap-[2%]">
                <div className="w-[100%] 800px:w-[48%] pb-4">
                  <label htmlFor="" className="text-gray-700 block pb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} w-[95%]`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[48%] pb-4">
                  <label htmlFor="" className="text-gray-700 block pb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`${styles.input} w-[95%]`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[48%] pb-4">
                  <label htmlFor="" className="text-gray-700 block pb-2">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    className={`${styles.input} w-[95%]`}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[48%] pb-4">
                  <label htmlFor="" className="text-gray-700 block pb-2">
                    Zip Code
                  </label>
                  <input
                    type="number"
                    className={`${styles.input} w-[95%]`}
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[48%] pb-4">
                  <label htmlFor="" className="text-gray-700 block pb-2">
                    Address 1
                  </label>
                  <input
                    type="address"
                    className={`${styles.input} w-[95%]`}
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[48%] pb-4">
                  <label htmlFor="" className="text-gray-700 block pb-2">
                    Address 2
                  </label>
                  <input
                    type="address"
                    className={`${styles.input} w-[95%]`}
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
              </div>
              <input type="submit" value="Update" className="text-[#3a24db] border border-[#3a24db] py-2 px-4 mt-4 rounded-md cursor-pointer"/>
            </form>
          </div>
        </>
      )}
      {
          active===2 && (
              <AllOrders/>
          )
      }
      {
          active===3 && (
              <AllRefundOrders/>
          )
      }
      {
          active===5 && (
              <TrackOrders/>
          )
      }
      {
          active===6 && (
              <PaymentMethod/>
          )
      }
      {
          active===7 && (
              <Address/>
          )
      }
    </div>
  );
};


const AllOrders=()=>{

    const orders=[
        {
            _id:"sdlc",
            orderItems:[
                {
                    name:"Iphone 14 pro max"
                }
            ],
            totalPrice:140,
            orderStatus:"Processing"
        }
    ];

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
                <Link to={`/user/order/${params.id}`}>
                  <Button>
                    <AiOutlineArrowRight size={20} />
                  </Button>
                </Link>
              </>
            );
          },
        },
      ];

      const row=[];

      orders && orders.forEach((item)=>{
          row.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            total: "US$ " + item.totalPrice,
            status: item.orderStatus,
          })
      })

    return(
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
    )
}


const AllRefundOrders=()=>{

  const orders=[
      {
          _id:"sdlc",
          orderItems:[
              {
                  name:"Iphone 14 pro max"
              }
          ],
          totalPrice:140,
          orderStatus:"Processing"
      }
  ];

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
              <Link to={`/user/order/${params.id}`}>
                <Button>
                  <AiOutlineArrowRight size={20} />
                </Button>
              </Link>
            </>
          );
        },
      },
    ];

    const row=[];

    orders && orders.forEach((item)=>{
        row.push({
          id: item._id,
          itemsQty: item.orderItems.length,
          total: "US$ " + item.totalPrice,
          status: item.orderStatus,
        })
    })

  return(
  <div className="pl-8 pt-1">
    <DataGrid
      rows={row}
      columns={columns}
      pageSize={10}
      disableSelectionOnClick
      autoHeight
    />
  </div>
  )
}

const TrackOrders=()=>{
  const orders=[
    {
        _id:"sdlc",
        orderItems:[
            {
                name:"Iphone 14 pro max"
            }
        ],
        totalPrice:140,
        orderStatus:"Processing"
    }
];

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
                <MdOutlineTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row=[];

  orders && orders.forEach((item)=>{
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      })
  })

return(
<div className="pl-8 pt-1">
  <DataGrid
    rows={row}
    columns={columns}
    pageSize={10}
    disableSelectionOnClick
    autoHeight
  />
</div>
)
}



const PaymentMethod = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          Payment Methods
        </h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <img
            src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg"
            alt=""
          />
          <h5 className="pl-5 font-[600] text-[12px] 800px:text-[unset]">
            Shahriar Sajeeb
          </h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6 className="text-[12px] 800px:text-[unset]">1234 **** *** ****</h6>
          <h5 className="pl-6 text-[12px] 800px:text-[unset]">08/2022</h5>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

const Address = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <h5 className="pl-5 font-[600]">Default</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6 className="text-[12px] 800px:text-[unset]">
            494 Erdman Pasaage, New Zoietown, Paraguay
          </h6>
        </div>
        <div className="pl-8 flex items-center">
          <h6 className="text-[12px] 800px:text-[unset]">(213) 840-9416</h6>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
export default ProfileContent;

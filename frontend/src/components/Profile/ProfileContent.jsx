import React, { useState, useEffect } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { local_server } from "../../server";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineDelete } from "react-icons/ai";
import {Button} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {MdOutlineTrackChanges} from 'react-icons/md';
import {toast} from 'react-toastify';
import axios from 'axios';
import {server} from '../../server';
import { deleteUserAddress, loadUser, updateUserAddress, updateUserInformation } from "../../redux/actions/user";
import { getAllUserOrders } from "../../redux/actions/order";
import { Country, State } from "country-state-city";
import { RxCross1 } from "react-icons/rx";


const ProfileContent = ({ active }) => {
  const { user, error, addressUpdateMessage, deleteUserAddressMessage  } =
    useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail]=useState(user && user.email);
  const [phoneNumber, setPhoneNumber]=useState(user && user.phoneNumber);
  const [password, setPassword]=useState();
  const [avatar, setAvatar]=useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "cleanError" });
    }
    if (addressUpdateMessage) {
      toast.success(addressUpdateMessage);
      dispatch({ type: "cleanAddressUpdateMessage" });
    }
    if (deleteUserAddressMessage) {
      toast.success(deleteUserAddressMessage);
      dispatch({
        type: "cleanDeleteUserAddressMessage",
      });
    }
  }, [error, addressUpdateMessage, deleteUserAddressMessage]);

  useEffect(()=>{
    setName(user?.name);
    setEmail(user?.email);
    setPhoneNumber(user?.phoneNumber);
  }, [user])

  const handleImageChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios
          .put(
            `${server}/user/update-avatar`,
            { avatar: reader.result },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            dispatch(loadUser());
            toast.success("avatar updated successfully!");
          })
          .catch((error) => {
            toast.error(error);
          });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(email, phoneNumber, password, name));
  };

  return (
    <div className="w-full">
      {active === 1 && (
        <>
          <div className="w-full flex justify-center">
            <div className="relative">
              <img
                src={`${user?.avatar?.url}`}
                alt=""
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
              />
              <div className="absolute w-[30px] h-[30px] rounded-full right-4 bottom-4 bg-[#E3E9EE] flex items-center justify-center cursor-pointer">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={(e)=>handleImageChange(e)}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <div className="w-full p-4">
            <form action="" aria-required={true} onSubmit={(e)=>handleSubmit(e)}>
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
                    Password
                  </label>
                  <input
                    type="password"
                    className={`${styles.input} w-[95%]`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              <ChangePassword/>
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

  const {user}=useSelector((state)=>state.user);
  const {orders}=useSelector((state)=>state.order);
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getAllUserOrders(user._id));
  }, [user])


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
            itemsQty: item.cart.length,
            total: "US$ " + item.totalPrice,
            status: item.status,
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

  const {user}=useSelector((state)=>state.user);
  const {orders}=useSelector((state)=>state.order);
  const dispatch=useDispatch();


  useEffect(()=>{
    dispatch(getAllUserOrders(user._id));
  }, [user])


  const eligibleOrders=orders && orders.filter((order)=>order.status==='Processing return' || order.status==='Refund success');
  


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

    eligibleOrders && eligibleOrders.forEach((item)=>{
        row.push({
          id: item._id,
          itemsQty: item.cart.length,
          total: "US$ " + item.totalPrice,
          status: item.status,
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



const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleChangePassword = async(e) => {
    e.preventDefault();
    await axios.put(`${server}/user/update-user-password`, {oldPassword, newPassword, confirmPassword}, {withCredentials:true}).then((res)=>{
      toast.success('Password updated successfully');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }).catch((error)=>{
      toast.error(error.response.data.message);
    })
  };

  return (
    <div className="w-full px-5">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2 text-center">
          Change Password
        </h1>
        <div className="w-[80%] 800px:w-[50%] mx-auto mt-5">
          <form aria-required onSubmit={handleChangePassword} className="w-full">
            <div className="mb-6 w-full">
              <label htmlFor="oldPassword">Enter old password</label>
              <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="py-1 px-2 border border-gray-200 block mt-2 w-full"
              />
            </div>
            <div className="mb-6 w-full">
              <label htmlFor="newPassword">Enter new password</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="py-1 px-2 border border-gray-200 block mt-2 w-full"
              />
            </div>
            <div className="mb-6 w-full">
              <label htmlFor="newPassword">Confirm new password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="py-1 px-2 border border-gray-200 block mt-2 w-full"
              />
            </div>
            <div className="w-full">
              <input
                type="Submit"
                value="Update Password"
                className="py-1 px-2 border border-blue-500 text-blue-500 w-full cursor-pointer"
              />
            </div>
          </form>
        </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "default",
    },
    {
      name: "office",
    },
    {
      name: "home",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (country === "" || city === "" || zipCode === "" || addressType === "") {
      toast.error("Please provide all fields");
    } else {
      dispatch(
        updateUserAddress({
          country,
          city,
          zipCode,
          addressType,
          address1,
          address2,
        })
      );

      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setAddressType("");
      setZipCode("");
    }
  };

  const handleDeleteAddress = (id) => {
    dispatch(deleteUserAddress(id));
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed top-0 left-0 w-full h-screen bg-[#0000006a] z-[2000] flex items-center justify-center">
          <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md p-4 overflow-y-scroll">
            <div className="flex justify-end">
              <RxCross1
                onClick={() => setOpen(false)}
                size={30}
                className="cursor-pointer"
              />
            </div>
            <h5 className="text-[30px] text-center font-Poppins">
              Add new address
            </h5>

            <form action="" onSubmit={handleSubmit} aria-required={true}>
              <div className="mb-6">
                <label className="pb-3">
                  Country <span className="text-[red]">*</span>
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="mt-2 w-full px-2 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300"
                >
                  <option value="">Choose your country</option>
                  {Country &&
                    Country.getAllCountries().map((item) => (
                      <option value={item.isoCode} key={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mb-6">
                <label className="pb-3">
                  City <span className="text-[red]">*</span>
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-2 w-full px-2 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300"
                >
                  <option value="">Choose your city</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option value={item.isoCode} key={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mb-6">
                <label className="pb-3">
                  Address 1 <span className="text-[red]">*</span>
                </label>
                <input
                  type="text"
                  name="address1"
                  required
                  className="mt-2 w-full px-2 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300"
                  placeholder="Enter address here..."
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="pb-3">
                  Address 2 <span className="text-[red]">*</span>
                </label>
                <input
                  type="text"
                  name="address2"
                  className="mt-2 w-full px-2 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300"
                  placeholder="Enter address here..."
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="pb-3">
                  Zipcode <span className="text-[red]">*</span>
                </label>
                <input
                  type="number"
                  name="zipCode"
                  required
                  className="mt-2 w-full px-2 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300"
                  placeholder="Enter zipcode here..."
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="pb-3">
                  Choose address type <span className="text-[red]">*</span>
                </label>
                <select
                  value={addressType}
                  onChange={(e) => setAddressType(e.target.value)}
                  className="mt-2 w-full px-2 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300"
                >
                  <option value="">Choose address type</option>
                  {addressTypeData &&
                    addressTypeData.map((item) => (
                      <option value={item.name} key={item.name}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <input
                  type="submit"
                  value="Add address"
                  className="px-2 py-1 rounded-sm w-full border border-gray-500 cursor-pointer hover:bg-[#000] hover:text-white"
                />
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div
          className={`${styles.button} !rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      {user && user.addresses.length === 0 ? (
        <div className="text-center font-[600]">
          You don't any address, please add to deliver your order at correct
          location
        </div>
      ) : (
        user.addresses.map((address, index) => (
          <div
            className="w-full bg-white mb-[10px] 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow-md justify-between pr-10"
            key={index}
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{address.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {address.address1} {address.address2}
              </h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {user.phoneNumber}
              </h6>
            </div>
            <div
              className="min-w-[10%] flex items-center justify-between pl-8"
              onClick={() => handleDeleteAddress(address._id)}
            >
              <AiOutlineDelete size={25} className="cursor-pointer" />
            </div>
          </div>
        ))
      )}
    </div>
  );
};
export default ProfileContent;

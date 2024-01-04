import React, { useEffect, useState } from "react";
import { getShopAllEvents } from "../../redux/actions/event";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
// import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { deleteEvent } from "../../redux/actions/event";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const AllCouponCodes = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState();
  const [minAmount, setMinAmount] = useState();
  const [maxAmount, setMaxAmount] = useState();
  const [selectedProduct, setSelectedProduct] = useState();
  const [isLoading, setIsLoading]=useState(true);
  const [coupons, setCoupons]=useState([]);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product);
//   const { events, isLoading } = useSelector((state) => state.event);
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`${server}/coupon/get-coupons/${seller._id}`, {withCredentials:true}).then((res)=>{
        setCoupons(res.data.coupons);
        setIsLoading(false);
    }).catch((err)=>{
        setIsLoading(false)
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${server}/coupon/create-coupon-code`, {
        name,
        shop:seller,
        shopId:seller._id,
        value,
        minAmount,
        maxAmount,
        selectedProduct
    }, {withCredentials:true}).then((res)=>{
        toast.success("coupon created successfully");
        setOpen(false);
        window.location.reload();
    }).catch((error)=>{
        toast.error(error.response.data.message)
    })

  };

  const handleDelete = async(id) => {
    try{
      await axios.delete(`${server}/coupon/delete-coupon/${id}`, {withCredentials:true});
      toast.success('Coupon deleted successfully');
      window.location.reload();
    }
    catch(error){
      toast.error(error.response.data.message);
    }
  };

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "discount",
      headerName: "Discount %",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "Delete Item",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  coupons &&
    coupons.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        discount:item.value,
      });
    });

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="flex justify-end mb-[20px]">
            <div
              className="bg-[#000] text-white text-[18px] py-1 px-2 w-fit rounded-sm cursor-pointer"
              onClick={() => setOpen(true)}
            >
              Create Coupon
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
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
                  Create Coupon Code
                </h5>

                <form action="" onSubmit={handleSubmit} aria-required={true}>
                  <div className="mb-6">
                    <label className="pb-3">
                      Name <span className="text-[red]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="mt-2 w-full px-2 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300"
                      placeholder="Enter Coupon code here..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label className="pb-3">
                      Discount Percentage <span className="text-[red]">*</span>
                    </label>
                    <input
                      type="number"
                      name="discount"
                      required
                      className="mt-2 w-full px-2 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300"
                      placeholder="Enter discount percentage here..."
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label className="pb-3">
                      Min. Amount
                    </label>
                    <input
                      type="number"
                      name="minAmount"
                      className="mt-2 w-full px-2 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300"
                      placeholder="Enter minimum amount here..."
                      value={minAmount}
                      onChange={(e) => setMinAmount(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label className="pb-3">
                      Max. Amount
                    </label>
                    <input
                      type="number"
                      name="maxAmount"
                      className="mt-2 w-full px-2 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300"
                      placeholder="Enter maximum amount here..."
                      value={maxAmount}
                      onChange={(e) => setMaxAmount(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label className="pb-3">
                      Select product
                    </label>
                    <select
                      className="block mt-2 w-full px-2 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300"
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                      <option value="Choose a product">Choose a product</option>
                      {products &&
                        products.map((i) => (
                          <option value={i._id} key={i._id}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <input
                      type="submit"
                      value="Create Coupon"
                      className="px-2 py-1 rounded-sm w-full border border-gray-500 cursor-pointer hover:bg-[#000] hover:text-white"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllCouponCodes;

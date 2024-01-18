import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { local_server, server } from "../../server";
import { CiCamera } from "react-icons/ci";
import { AiOutlineCamera } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import {loadSeller} from '../../redux/actions/seller';

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [name, setName] = useState("");
  const [zipCode, setZipcode] = useState(null);
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const dispatch=useDispatch();

  const imageChangeHandler = (e) => {
    const image = e.target.files[0];
    axios
      .put(
        `${server}/shop/update-shop-avatar`,
        { image },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      )
      .then(() => {
          dispatch(loadSeller());
          toast.success("Avatar updated succesfully");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleSubmit = async(e) => {
      e.preventDefault();
    if (
      name === "" &&
      phoneNumber === null &&
      zipCode === null &&
      address === "" &&
      description === ""
    ) {
      toast.error("plase provoide at least 1 field to update");
      return;
    }
    try {
        await axios.put(`${server}/shop/update-shop-info`, {name, phoneNumber, zipCode, address, description}, {withCredentials:true});
        toast.success("Info updated successfully");
        dispatch(loadSeller());
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };


  return (
    <div className="mt-4 w-full">
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={`${local_server}${seller.avatar}`}
            className="w-[150px] h-[150px] rounded-full border"
          />
          <div className="absolute bottom-3 right-3">
            <input
              type="file"
              id="avatar"
              className="hidden"
              onChange={imageChangeHandler}
            />
            <label htmlFor="avatar">
              <div className="bg-gray-200 rounded-full p-2 cursor-pointer">
                <AiOutlineCamera />
              </div>
            </label>
          </div>
        </div>
        <div className="w-[90%] 800px:w-[40%]">
          <form action="" onSubmit={(e)=>handleSubmit(e)}>
            <div className="mb-4">
              <label htmlFor="" className="block">
                Shop Name
              </label>
              <input
                type="text"
                className="border w-full px-2 py-1 rounded-sm"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="" className="block">
                Shop Description
              </label>
              <textarea
                name=""
                id=""
                cols="50"
                rows="2"
                className="border w-full px-2 py-1 rounded-sm"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="" className="block">
                Shop Address
              </label>
              <input
                type="text"
                className="border w-full px-2 py-1 rounded-sm"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="" className="block">
                Phone Number
              </label>
              <input
                type="number"
                className="border w-full px-2 py-1 rounded-sm"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="" className="block">
                Zip code
              </label>
              <input
                type="number"
                className="border w-full px-2 py-1 rounded-sm"
                onChange={(e) => setZipcode(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="submit"
                value="Update info"
                className="border border-pink-300 text-pink-300 w-full px-2 py-1 rounded-sm cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopSettings;

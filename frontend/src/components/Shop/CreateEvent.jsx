import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import {categoriesData} from '../../static/data';
import {createEvent} from '../../redux/actions/event';
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";

const CreateEvent = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [tags, setTags] = useState("");
  const [images, setImages] = useState("");
  const [startDate, setStartDate]=useState();
  const [endDate, setEndDate]=useState();

  const { seller } = useSelector((state) => state.seller);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {success, error}=useSelector((state)=>state.event);



  useEffect(()=>{
    if(error){
        toast.error(error)
    }
    if(success){
        toast.success("Event created successfully");
        navigate('/dashboard-events');
        window.location.reload();
    }
}, [dispatch, error, success])


  const handleStartDateChange=(e)=>{
      const startDate=new Date(e.target.value);
      const minEndDate=new Date(startDate.getTime()+3*24*60*60*1000);
      setStartDate(startDate);
      setEndDate(null);
      document.getElementById('end-date').min=minEndDate.toISOString().slice(0, 10);
  }
  
  const handleEndDateChange=(e)=>{
      const endDate=new Date(e.target.value);
      setEndDate(endDate);
  }

  const today=new Date().toISOString().slice(0, 10);
  const minEndDate=startDate?new Date(startDate.getTime()+3*24*60*60*1000).toISOString().slice(0, 10):today;

  

    const handleImageChange=(e)=>{
        const files=Array.from(e.target.files);
        setImages((prevImages)=>[...prevImages, ...files]);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();

        const newForm=new FormData();
        images.forEach((image)=>{
            newForm.append('images', image);
        })

        newForm.append('name', name);
        newForm.append('description', description);
        newForm.append('category', category);
        newForm.append('tags', tags);
        newForm.append('originalPrice', originalPrice);
        newForm.append('discountPrice', discountPrice);
        newForm.append('stock', stock);
        newForm.append('shopId', seller._id);
        newForm.append('startDate', startDate.toISOString());
        newForm.append('endDate', endDate.toISOString());
        dispatch(createEvent(newForm));
    }


  return (
    <div className="bg-white w-[90%] 800px:w-[50%] rounded-sm p-3 overflow-y-scroll h-[80vh]">
      <h5 className="text-[30px] text-center font-Poppins">Create Event</h5>

      <form action="" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="pb-3">
            Name <span className="text-[red]">*</span>
          </label>
          <input
            type="text"
            name='name'
            className="mt-2 w-full px-2 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300"
            placeholder="Enter product name here..."
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="pb-3">
            Description <span className="text-[red]">*</span>
          </label>
          <textarea
            cols='30'
            row='20'
            type="text"
            name='description'
            className="mt-2 w-full px-2 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300"
            placeholder="Enter product info here..."
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="pb-3">
            Category <span className="text-[red]">*</span>
          </label>
          <select className="block mt-2 w-full px-2 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300"
          value={category} onChange={(e)=>setCategory(e.target.value)}
          >
              <option value="Choose a category">
                  Choose a category
              </option>
              {
                  categoriesData && 
                  categoriesData.map((i)=>(
                      <option value={i.title} key={i.title}>
                        {i.title}
                      </option>
                  ))
              }
          </select>
        </div>
        <div className="mb-6">
          <label className="pb-3">
            Tags
          </label>
          <input
            type="text"
            name='tags'
            className="mt-2 w-full px-2 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300"
            placeholder="Enter tags here..."
            value={tags}
            onChange={(e)=>setTags(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="pb-3">
            Start Date
          </label>
          <input
            type="date"
            name='startDate'
            id='start-date'
            className="mt-2 w-full px-2 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300"
            placeholder="Enter start date here..."
            value={startDate ? startDate.toISOString().slice(0,10) : ""}
            onChange={handleStartDateChange}
            min={today}
          />
        </div>
        <div className="mb-6">
          <label className="pb-3">
            End Date
          </label>
          <input
            type="date"
            name='endDate'
            id='end-date'
            className="mt-2 w-full px-2 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300"
            placeholder="Enter end date here..."
            value={endDate ? endDate.toISOString().slice(0,10) : ""}
            onChange={handleEndDateChange}
            min={minEndDate}
          />
        </div>
        <div className="mb-6">
          <label className="pb-3">
            Original Price
          </label>
          <input
            type="number"
            name='originalPrice'
            className="mt-2 w-full px-2 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300"
            placeholder="Enter product original price here..."
            value={originalPrice}
            onChange={(e)=>setOriginalPrice(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="pb-3">
            Price (With Discount) <span className="text-[red]">*</span>
          </label>
          <input
            type="number"
            name='discountPrice'
            className="mt-2 w-full px-2 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300"
            placeholder="Enter product discount price here..."
            value={discountPrice}
            onChange={(e)=>setDiscountPrice(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="pb-3">
            Product Stock <span className="text-[red]">*</span>
          </label>
          <input
            type="number"
            name='stock'
            className="mt-2 w-full px-2 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300"
            placeholder="Enter product stock here..."
            value={stock}
            onChange={(e)=>setStock(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="pb-3">
            Product Images <span className="text-[red]">*</span>
          </label>
          <input type="file" className="hidden" id='upload' multiple onChange={handleImageChange} />
          <label htmlFor="upload">
              <AiOutlinePlusCircle
                  size={30}
                  className="mt-3"
                  color="#555"
              />
          </label>
          <div className="flex flex-wrap gap-[10px]">
          {
              images && (
                  images.map((i)=>(
                      <img src={URL.createObjectURL(i)} alt="" key={i} className="w-[120px] h-[120px] object-cover m-2"/>
                  ))
              )
          }
          </div>
        </div>
        <div>
            <input type="submit" value="Create" className="px-2 py-1 rounded-sm w-full border border-gray-500 cursor-pointer hover:bg-[#000] hover:text-white"/>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;

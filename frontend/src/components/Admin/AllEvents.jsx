import React, {useEffect, useState} from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import {Link} from 'react-router-dom';
import { server } from '../../server';
import axios from 'axios';


const AllEvents = () => {

    const [events, setEvents]=useState([]);
    
    useEffect(()=>{
        const getEvents=async()=>{
            const {data}=await axios.get(`${server}/event/get-all-events`, {withCredentials:true});
            setEvents(data.events);
        }
        getEvents();
    }, [])



    const columns = [
        { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
        {
          field: "name",
          headerName: "Name",
          minWidth: 180,
          flex: 1.4,
        },
        {
          field: "price",
          headerName: "Price",
          minWidth: 100,
          flex: 0.6,
        },
        {
          field: "Stock",
          headerName: "Stock",
          type: "number",
          minWidth: 80,
          flex: 0.5,
        },
    
        {
          field: "sold",
          headerName: "Sold out",
          type: "number",
          minWidth: 130,
          flex: 0.6,
        },
        {
          field: "Preview",
          flex: 0.8,
          minWidth: 100,
          headerName: "Preview",
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <>
                <Link to={`/product/${params.id}?isEvent=true`}>
                  <Button>
                    <AiOutlineEye size={20} />
                  </Button>
                </Link>
              </>
            );
          },
        },
      ];
    
      const row = [];
    
      events &&
        events.forEach((item) => {
          row.push({
            id: item._id,
            name: item.name,
            price: "US$ " + item.discountPrice,
            Stock: item.stock,
            sold:item.sold_out,
          });
        });
    
  return (
      <div className="w-full mx-8 pt-1 mt-10 bg-white">
      <h1 className='text-[22px] font-[400]'>All Events</h1>
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

export default AllEvents;
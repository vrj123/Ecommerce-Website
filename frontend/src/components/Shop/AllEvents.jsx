import React, {useEffect} from 'react';
import {getShopAllEvents} from '../../redux/actions/event';
import {useSelector, useDispatch} from 'react-redux';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
// import Loader from '../Layout/Loader';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import {Link} from 'react-router-dom';
import {deleteEvent} from '../../redux/actions/event';


const AllEvents = () => {

    const {seller}=useSelector((state)=>state.seller);
    const{events, isLoading}=useSelector((state)=>state.event);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getShopAllEvents(seller._id));
    }, [dispatch])


    const handleDelete=(id)=>{
        dispatch(deleteEvent(id))
        window.location.reload();
    }

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
                <Link to={`/product/${params.id}`}>
                  <Button>
                    <AiOutlineEye size={20} />
                  </Button>
                </Link>
              </>
            );
          },
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
                <Button onClick={()=>handleDelete(params.id)}>
                  <AiOutlineDelete size={20} />
                </Button>
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
            sold: 10,
          });
        });
    
  return (
    <>
    {isLoading ? (
      <div>Loading...</div>
    ) : (
      <div className="w-full mx-8 pt-1 mt-10 bg-white">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    )}
  </>
  )
}

export default AllEvents;
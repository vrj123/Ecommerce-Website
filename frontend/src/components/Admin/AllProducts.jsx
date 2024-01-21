import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Layout/Loader';
import { AiOutlineEye} from 'react-icons/ai';
import { Button } from '@mui/base';
import { getAllProducts } from '../../redux/actions/product';
import { useNavigate } from 'react-router-dom';

const AllProducts = () => {

    const {allProducts, isLoading}=useSelector((state)=>state.product);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    useEffect(()=>{
      dispatch(getAllProducts());
    }, [])
    

   

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 150, flex: 0.7 },
    
        {
          field: "name",
          headerName: "Name",
          minWidth: 130,
          flex: 0.7,
        },

        {
          field: "price",
          headerName: "Price",
          type: "number",
          minWidth: 130,
          flex: 0.7,
        },
    
        {
          field: "stock",
          headerName: "Stock",
          type: "number",
          minWidth: 130,
          flex: 0.8,
        },

        {
            field: "sold_out",
            headerName: "Sold out",
            type: "number",
            minWidth: 130,
            flex: 0.8,
          },
    
        {
          field: " ",
          flex: 1,
          minWidth: 130,
          headerName: "Preview",
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <>
                  <Button onClick={()=>navigate(`/product/${params.id}`)}>
                    <AiOutlineEye size={20} />
                  </Button>
              </>
            );
          },
        },
      ];
    
      const row = [];
    
      allProducts &&
        allProducts.forEach((item) => {
          row.push({
            id: item._id,
            name: item.name,
            price: item.discountPrice,
            sold_out:item.sold_out,
            stock:item.stock,
          });
        });


  return (
    <div className="mt-4 w-full p-4">
        <h1 className='text-[22px] font-[400]'>All Products</h1>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="w-full pt-1 mt-4 bg-white mx-auto">
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
  )
}

export default AllProducts;
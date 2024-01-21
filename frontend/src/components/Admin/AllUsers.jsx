import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Layout/Loader';
import {AiOutlineDelete} from 'react-icons/ai';
import { Button } from '@mui/base';
import axios from 'axios';
import {toast} from 'react-toastify';
import {server} from '../../server';
import { getAllAdminUsers } from '../../redux/actions/user';

const AllUsers = () => {

    const {AdminUsers, isLoading}=useSelector((state)=>state.user);
    const dispatch=useDispatch();

    useEffect(()=>{
      dispatch(getAllAdminUsers());
    }, [])
    

    const handleDelete=async(id)=>{
      axios.delete(`${server}/user/delete-user/${id}`, {withCredentials:true}).then((res)=>{
        toast.success(res.data.message);
        dispatch(getAllAdminUsers());
      }).catch((error)=>{
        console.log(error);
      })
    }

    const columns = [
        { field: "id", headerName: "User ID", minWidth: 150, flex: 0.7 },
    
        {
          field: "name",
          headerName: "Name",
          minWidth: 130,
          flex: 0.7,
          cellClassName: (params) => {
            const status = params.value || "";
    
            return status === "Delivered" ? "greenColor" : "redColor";
          },
        },
        {
          field: "email",
          headerName: "Email",
          type: "number",
          minWidth: 130,
          flex: 0.7,
        },
    
        {
          field: "createdAt",
          headerName: "Joined at",
          type: "number",
          minWidth: 130,
          flex: 0.8,
        },
    
        {
          field: " ",
          flex: 1,
          minWidth: 150,
          headerName: "Delete User",
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
    
      AdminUsers &&
        AdminUsers.forEach((item) => {
          row.push({
            id: item._id,
            name: item.name,
            email: item.email,
            createdAt: item.createdAt.slice(0, 10),
          });
        });


  return (
    <div className="mt-4 w-full p-4">
        <h1 className='text-[22px] font-[400]'>All Users</h1>
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
  )
}

export default AllUsers;
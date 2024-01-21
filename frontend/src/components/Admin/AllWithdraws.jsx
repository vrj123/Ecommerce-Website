import React, {useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { server } from '../../server';
import axios from 'axios';
import {BsPencil} from 'react-icons/bs';
import { RxCross1 } from 'react-icons/rx';
import styles from '../../styles/styles';
import { toast } from 'react-toastify';


const AllWithdraws = () => {

    const [data, setData]=useState(null);
    const [open, setOpen]=useState(false);
    const [withdrawData, setWithdrawData]=useState(null);
    const [withdrawStaus, setWithdrawStatus]=useState("Processing");
    
    useEffect(()=>{
        axios.get(`${server}/withdraw/get-all-withdraw-requests`, {withCredentials:true}).then((res)=>{
            setData(res.data.withdraws);
        }).catch((error)=>{
            console.log(error);
        })
    }, [])



    const handleSubmit=(id)=>{
        axios.put(`${server}/withdraw/update-withdraw-status/${id}`,{sellerId:withdrawData.shop_id}, {withCredentials:true}).then((res)=>{
            toast.success("Withdraw status updated successfully");
            axios.get(`${server}/withdraw/get-all-withdraw-requests`, {withCredentials:true}).then((res)=>{
                setData(res.data.withdraws);
            }).catch((error)=>{
                console.log(error);
            })
            setOpen(false);
        }).catch((error)=>{
            console.log(error);
        })
    }



    const columns = [
        { field: "id", headerName: "Withdraw Id", minWidth: 150, flex: 0.7 },
        {
          field: "shop_name",
          headerName: "Shop name",
          minWidth: 180,
          flex: 1.4,
        },
        {
            field: "shop_id",
            headerName: "Shop Id",
            minWidth: 180,
            flex: 1.4,
          },
        {
          field: "amount",
          headerName: "Amount",
          minWidth: 100,
          flex: 0.6,
        },
        {
          field: "status",
          headerName: "Status",
          minWidth: 80,
          flex: 0.5,
        },
    
        {
          field: "date",
          headerName: "Request date",
          minWidth: 130,
          flex: 0.6,
        },
        {
            field: " ",
            flex: 1,
            minWidth: 150,
            type:"number",
            headerName: "Update status",
            sortable: false,
            renderCell: (params) => {
              return (
                  <>
                  {
                      params.row.status!=="Successful" && (
                        <BsPencil className='cursor-pointer' onClick={()=>setOpen(true) || setWithdrawData(params.row)}/>
                      )
                  }
                  </>
              );
            },
          },
      ];
    
      const row = [];
    
      data &&
        data.forEach((item) => {
          row.push({
            id: item._id,
            shop_name: item.seller.name,
            amount: item.amount,
            status: item.status,
            date:item.createdAt.slice(0, 10),
            shop_id:item.seller._id,
          });
        });
    
  return (
      <div className="w-full mx-8 pt-1 mt-10 bg-white">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
        {
            open && (
                <div className='bg-[#00000084] w-full h-screen z-[60] fixed top-0 left-0 flex items-center justify-center'>
                    <div className='bg-white h-[40vh] md:w-[50%] w-[90%] p-4'>
                        <div className='flex justify-end cursor-pointer' onClick={()=>setOpen(false)}>
                            <RxCross1 size={20}/>
                        </div>
                        <h1 className='text-[22px] font-Poppins text-center'>Update Withdraw Status</h1>
                       <div className='flex flex-col items-center mt-6'>
                       <div>
                            <select name="" id="" value={withdrawStaus} onChange={(e)=>setWithdrawStatus(e.target.value)} className='border p-2 w-[150px]'>
                                <option value={withdrawData?.status}>{withdrawData?.status}</option>
                                <option value="Succeed">Succeed</option>
                            </select>
                        </div>
                        <div className={`${styles.button} text-white`} onClick={()=>handleSubmit(withdrawData.id)}>
                            Update
                        </div>
                       </div>
                    </div>
                </div>
            )
        }
      </div>
  )
}

export default AllWithdraws;
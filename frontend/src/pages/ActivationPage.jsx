import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {server} from '../server';

const ActivationPage = () => {

    const [error, setError]=useState(false);
    const {activation_token}=useParams();
    useEffect(()=>{
        if(activation_token){
            const activationEmail=async()=>{
                    await axios.post(`${server}/user/activation`, {
                        activation_token,
                    })
                    .then((res)=>{
                        console.log(res);
                    })
                    .catch((err)=>{
                        setError(true);
                    });
            }
            activationEmail();
        }
        
    }, [])


  return (
    <div>
        {
            error?<p>Token is expired</p>
            :<p>Your account has been created succesfully</p>
        }
    </div>
  )
}

export default ActivationPage;
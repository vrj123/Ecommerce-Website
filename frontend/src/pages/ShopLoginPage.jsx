import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import ShopLogin from '../components/Shop/ShopLogin'

const ShopLoginPage = () => {

  const {isSeller, seller, isLoading}=useSelector((state)=>state.seller);
  const navigate=useNavigate();

  useEffect(()=>{
    if(isSeller){
      navigate(`/dashboard`);
    }
  }, [isSeller, isLoading])
  return (
    <div>
        <ShopLogin/>
    </div>
  )
}

export default ShopLoginPage
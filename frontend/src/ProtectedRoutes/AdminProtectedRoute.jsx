import React from 'react'
import { Navigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
import Loader from '../components/Layout/Loader';

const AdminProtectedRoute = ({children}) => {

    const {isAuthenticated, loading, user}=useSelector((state)=>state.user);

    

    if(loading){
        return <Loader/>
    }

    if(!loading){
        if(!isAuthenticated){
            return <Navigate to='/login' replace/>
        }
        else if(user.role!=="Admin"){
            return <Navigate to='/'/>
        }
        return children;
    }
}

export default AdminProtectedRoute;
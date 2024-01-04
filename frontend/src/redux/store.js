import {configureStore} from '@reduxjs/toolkit';
import { userReducer } from './reducers/user';
import { sellerReducer } from './reducers/seller';
import { productReducer } from './reducers/product';
import { eventReducer } from './reducers/event';
import { wishlistReducer } from './reducers/wishlist';
import { cartReducer } from './reducers/cart';

const store=configureStore({
    reducer:{
        user:userReducer,
        seller:sellerReducer,
        product:productReducer,
        event:eventReducer,
        cart:cartReducer,
        wishlist:wishlistReducer
    }
});

export default store;
import { configureStore } from '@reduxjs/toolkit';
import OrdersReducer from '../OrdersReducer.js';
import CurrentClientReducer from '../CurrentClientReducer.js';


export const store = configureStore({
    reducer: {
        orders: OrdersReducer,
        currentClient: CurrentClientReducer,
    },
});
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


const initialState = {
    data: [],
    loaded: false,
};

export const ORDERS_URL = 'http://localhost:5051/orders';

export const getOrdersAsync = createAsyncThunk ('orders/getOrders',async () => {
    const result = await axios.get(ORDERS_URL);
    return result.data;
}) 
    
export const createOrderAsync = createAsyncThunk('orders/createOrder', async (payload) => {
    const newOrder = {
        id: uuidv4(),
        date: new Date().toISOString(),

        client:{
            id: uuidv4(),
            ...payload.client,
        },

        items: payload.items.map(item => ({
            id: uuidv4(),
            ...item,
        })),

        total: payload.items.reduce((sum, item) => sum + item.price * item.quantity, 0),

    }

    const result = await axios.post(ORDERS_URL, newOrder);
    return result.data;

})

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        


    },
    extraReducers: (builder) => {
        // builder.addCase(getOrdersAsync.fulfilled, (state, action) => {
        //     state.data = action.payload;
        // });

        // builder.addCase(createOrderAsync.fulfilled, (state,action) =>{
        //     state.data.push(action.payload);
        //     state.loaded = true;
        // } )
        builder.addCase(getOrdersAsync.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loaded = true;
          });
          builder.addCase(getOrdersAsync.rejected, (state) => {
            state.loaded = true;
          });
    },
});


export default ordersSlice.reducer;



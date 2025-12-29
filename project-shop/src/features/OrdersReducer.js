import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  data: [],
  filtered: [],
  search: "",
  loaded: false,
};

export const ORDERS_URL = "http://localhost:5051/orders";

export const getOrdersAsync = createAsyncThunk("orders/getOrders", async () => {
  const result = await axios.get(ORDERS_URL);
  return result.data;
});

export const createOrderAsync = createAsyncThunk(
  "orders/createOrder",
  async (payload) => {
    const newOrder = {
      date: new Date().toISOString(),
      client: { id: uuidv4(), ...payload.client },
      items: payload.items.map((item) => ({ id: uuidv4(), ...item })),
      total: payload.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    };

    const result = await axios.post(ORDERS_URL, newOrder);
    return result.data;
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setSearch(state, action) {
      const search = action.payload.toLowerCase().trim();
      state.search = search;

      state.filtered = state.data.filter((order) => {
        const orderId = String(order.id).toLowerCase().includes(search);
        const clientName = order.client.name.toLowerCase().includes(search);
        const itemsLower = order.items.map((item) => item.title.toLowerCase());
        const orderItems = itemsLower.some((title) => title.includes(search));
        return orderId || clientName || orderItems;
      });
    },

    deleteOrder(state, action) {
      const id = String(action.payload);

      state.data = state.data.filter((order) => String(order.id) !== id);
      state.filtered = state.filtered.filter(
        (order) => String(order.id) !== id
      );

      const deleted = JSON.parse(
        localStorage.getItem("deletedOrders") || "[]"
      ).map(String);
      if (!deleted.includes(id)) {
        deleted.push(id);
        localStorage.setItem("deletedOrders", JSON.stringify(deleted));
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrdersAsync.fulfilled, (state, action) => {
      state.data = action.payload;
      state.filtered = action.payload;
      state.loaded = true;
    });
    builder.addCase(getOrdersAsync.rejected, (state) => {
      state.loaded = true;
    });
    builder.addCase(createOrderAsync.fulfilled, (state, action) => {
      state.data.push(action.payload);
      state.loaded = true;
    });
  },
});

export const { setSearch, deleteOrder } = ordersSlice.actions;

export default ordersSlice.reducer;

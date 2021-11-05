import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './ui-slice';
import cartSlice from './cart-slice';

//store 
const store = configureStore({
  reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer }, //reducer created by uislice
});

export default store;
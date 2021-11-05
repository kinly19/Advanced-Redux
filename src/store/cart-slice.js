import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload; //payload will be what we pass it
      const existingItem = state.items.find((item) => item.id === newItem.id); //check if item already exists
      state.totalQuantity++;

      if (!existingItem) {
        //push a new object into state.items
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++; //take existing value plus 1
        existingItem.totalPrice = existingItem.totalPrice + newItem.price; // existing price plus the price again
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price //total price - the existing item price
      }
    },
  },
});

export const cartActions = cartSlice.actions; //exporting our cartSlice actions 
export default cartSlice;
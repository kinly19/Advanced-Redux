import { createSlice } from '@reduxjs/toolkit'; 

const initialState = {cartIsVisible: false};
const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    toggleCart(state){
      state.cartIsVisible = !state.cartIsVisible;
      console.log('Cart Toggled')
    }
  }
});

//export actions
export const uiActions = uiSlice.actions;

export default uiSlice; 

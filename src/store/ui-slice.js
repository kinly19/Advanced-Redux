import { createSlice } from '@reduxjs/toolkit'; 

const initialState = {cartIsVisible: false, notification: null};
const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    toggleCart(state){
      state.cartIsVisible = !state.cartIsVisible;
      console.log('Cart Toggled');
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

//export actions
export const uiActions = uiSlice.actions;

export default uiSlice; 

import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";
// ======================================= Notes =======================================
// Action creator - is a function that literally creates an action object
// Thunk - Redux Thunk is a middleware that lets you call action creators that return a FUNCTION
//   instead of an action object
// try...catch - statement marks a block of statements to try and specifies a response should an exception be thrown.
// The await keyword is only valid inside async functions
//======================================================================================

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

//Redux thunk function 
export const sendCartData = (cart) => {
  return async (dispatch) => {
    //dispatch update notification (return new object)
    dispatch(
      uiActions.showNotification({
        status: "Pending",
        title: "Sending...",
        message: "Sending cart data.",
      })
    );

    //function for making a PUT request
    const sendRequest = async () => {
      const response = await fetch(
        "https://redux-backend-bbe09-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart), //stringify cart
        }
      );

      if (!response.ok) {
        throw new Error("Sending Cart Data Failed.");
      }
    };

    //try sendRequest function
    try {
      await sendRequest();
      //if above function completes with no errors then,
      //dispatch and update notifications
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Sent",
          message: "Cart data sent succesfully!",
        })
      );

      //if sendRequest function fails
    } catch (error) {
      //dispatch error notification
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions; //exporting our cartSlice actions 
export default cartSlice;
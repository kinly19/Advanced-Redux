import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";


export const fetchCartData = () => {
  return async (dispatch) => {
    //fetch
    const fetchData = async () => {
      const response = await fetch(
        "https://redux-backend-bbe09-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
      );
      //check for errors
      if (!response.ok) {
        throw new Error("Fetch failed");
      }
      //store fetched data
      const data = await response.json();
      //return stored data
      return data;
    };

    //try...catch statement
    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity,
      }))//pass in cartData as a payload
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Fetching cart data failed!",
        })
      );
    };
  };
};

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
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity
          }), //stringify cart
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
import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from './store/ui-slice';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notfication';

//define outside the component function, so this doesnt change and reinitialized if the component re renders
let isInitial = true;

function App() {

  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);//gets hold of overall cart
  const notification = useSelector((state) => state.ui.notification);
  
  //send http request when cart changes
  useEffect(() => {
    const sendCartDate = async () => {
      //Handling notifications
      dispatch(uiActions.showNotification({
        status: 'Pending',
        title: 'Sending...',
        message: 'Sending cart data.'
      }));
      //Fetch endpoint
      const response = await fetch(
        "https://redux-backend-bbe09-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart), //stringify cart
        }
      );
      
      if(!response.ok){
        throw new Error('Sending Cart Data Failed.')
      }
      const responseData = await response.json();

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Sent',
        message: 'Cart data sent succesfully!'
      }));
    };

    if(isInitial){
      isInitial=false;
      return; 
    };

    sendCartDate().catch(error => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error',
        message: 'Sending cart data failed!'
      }));
    });
  },[cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
};

export default App;

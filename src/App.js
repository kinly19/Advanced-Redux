import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendCartData,fetchCartData } from './store/cart-actions'; //import function

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
  
  useEffect(() => {
    dispatch(fetchCartData());
  },[]);

  //send http request when cart changes
  useEffect(() => {

    if (isInitial) {
      isInitial = false;
      return;
    };

    if (cart.isChanged){
      dispatch(sendCartData(cart)); //comes from store overall state
    }

  }, [cart, dispatch]);

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

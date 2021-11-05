import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';

import Card from '../UI/Card';
import classes from './ProductItem.module.css';

// ========================================== Notes ==============================================
// 
// Object Property Value Shorthand - if you want to define an object who's keys 
//  have the same name as the variables passed-in as properties, you can use the shorthand and simply pass the key name
// ===============================================================================================

const ProductItem = ({title, price, description, id}) => {

  const dispatch = useDispatch()
  const addToCart = (e) => {
    e.preventDefault();
    dispatch(cartActions.addItemToCart({
      //passing what we need into our actions payload
      //JavaScript shortcut
      id,
      title,
      price,
    }));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCart}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;

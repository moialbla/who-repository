import './Cart.scss';
import { t } from '../../core';
import { CartProps } from '../Models/CartProps';
import { dispatch } from '../../store';
import { addProduct, removeProduct, substractProduct } from '../../contexts/cart';

export const Cart = ({ item, incrementEvent, decrementEvent, removeEvent }: CartProps) => {

  const increment = () => {
    if ((item.stock - 1) < 0) {
      alert("No more articles");
    } else {
      dispatch(addProduct(item));
      incrementEvent && incrementEvent(item);
    }
  };

  const decrement = () => {
    if ((item.totalCount - 1) === 0) {
      remove()
    }
    else {
      dispatch(substractProduct(item));
      decrementEvent && decrementEvent(item);
    }
  };

  const remove = () => {
    dispatch(removeProduct(item));
    removeEvent && removeEvent(item);
  }

  return <div className="app-col-12 app-grid cart">
    <div className="app-col cart__image"><img src={item.image_url}></img></div>
    <div className="app-col app-dir-row block">
      <div className="app-col block__title"><span>{item.productName}</span></div>
      <div className="app-col app-grid ">
        <div className="app-col-4">
          <a href="#" className="cart__button"  data-testid="cart__increment" onClick={increment}>+</a>
        </div>
        <div className="app-col-4">{item.totalCount}</div>
        <div className="app-col-4">
          <a href="#" className="cart__button" data-testid="cart__decrement" onClick={decrement}>-</a>
        </div>
      </div>
    </div>
    <div className="app-col cart__price"><span>{item.totalPrice}{t("item.currency")}</span></div>
    <a href="#" className="cart__button" data-testid="cart__remove" onClick={remove} >X</a>
  </div>
}

export default Cart;

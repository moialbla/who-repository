import { useState } from 'react';
import './App.scss';
import '../../core/Internationalization';
import { t, Router, changeLanguage, Languages } from '../../core';
import { ReactComponent as Left } from '../../assets/img/left-arrow-button.svg';
import { ReactComponent as Right } from '../../assets/img/right-arrow-button.svg';
import classNames from 'classnames';
import { ProductList } from '../ProductList';
import { CartList } from '../CartList';
import { useDispatch } from '../../core/Context';
import { CartItemType } from '../../common/Models/CartItemType';
import { addProduct } from '../../contexts/cart';
import { addStock, removeStock, resetStock } from '../../contexts/grocery';

function App() {
  const dispatch = useDispatch();
  const [showList, setShowList] = useState(true);
  const [showCart, setShowCart] = useState(false);
  let listClasses = classNames('list', 'app-col-9', { 'hidden': !showList });
  let cartClasses = classNames('cartBlock', 'app-col-3', { 'show': showCart });

  const swapLayers = () => {
    setShowCart(!showCart);
    setShowList(!showList);
  }

  const addToCart = (product: CartItemType) => {
    dispatch(addProduct(product));
    dispatch(removeStock(product));
  }

  const removeItem = (item: CartItemType) => {
    const stock = item.stock + item.totalCount;
    const newItem = {...item, stock};
    dispatch(resetStock(newItem))
  }

  const decrementEvent = (item: CartItemType) => dispatch(addStock(item));
  
  const incrementEvent =  (item: CartItemType) => dispatch(removeStock(item));

  return (
    < Router >
      <div id="main" className="main full-height">
        <div className="main__languages">
          <span>{t('languages.title')} </span> <a href="#es" onClick={() => changeLanguage(Languages.ES)}>{t('languages.es')} </a> |  <a href="#en" onClick={() => changeLanguage(Languages.EN)}>{t('languages.en')} </a>
        </div>
        <div id="layout" className="layout app-grid">
          <div id="list" className={listClasses}>
            <div className="app-grid">
              <div className="app-col-11"></div>
              <div id="arrow-left" className="arrow-left app-col-1">
                <Left className="icon" onClick={swapLayers} />
              </div>
            </div>
            <ProductList handleAddToCart={addToCart}></ProductList>
          </div>

          <div id="cart" className={cartClasses}>
            <div className="app-grid">
              <div id="arrow-right" className="arrow-left app-col-1">
                <Right className="icon" onClick={swapLayers} />
              </div>
              <div className="app-col-11"></div>
            </div>
            <CartList incrementEvent={incrementEvent}
              decrementEvent={decrementEvent}
              removeEvent={removeItem}></CartList>
          </div>
        </div>
      </div>
    </Router >
  );
}
export { App };
export default App;

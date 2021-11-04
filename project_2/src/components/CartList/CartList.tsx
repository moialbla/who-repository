import './CartList.scss';
import { Cart } from '../../common';
import { t } from '../../core';
import { Button } from '../../common/Button';
import { RootState } from '../../store';
import { useSelector } from '../../core/Context';
import { CartListProps } from '../../common/Models/CartListProps';
import { useHistory } from 'react-router-dom';

export const CartList = ({ incrementEvent, decrementEvent, removeEvent }: CartListProps) => {
    const carts = useSelector((state: RootState) => state.cart.products);
    const total = useSelector((state: RootState) => state.cart.total);
    const history = useHistory();
    return <div className="app-grid app-dir-row cartList">
        <div className="app-col-12 app-col">{t("cart_title")}</div>
        <div className="app-col-12 pp-grid app-dir-row productList__items">
            {carts.length > 0 && carts.map(item => <Cart key={item.id} item={item} incrementEvent={incrementEvent} decrementEvent={decrementEvent} removeEvent={removeEvent}></Cart>)}
        </div>
        <div className="app-grid cartList__checkout">
            <div className="app-col-6"><Button text={t("cart.checkout")} click={() => {
                history.push({
                    pathname: `/about`,
                    state: {},
                });
            }}></Button></div>
            <div className="app-col-6">{t("total_amount")} {total} {t("item.currency")} </div>
        </div>
    </div>;
}
import {CartItemType} from './CartItemType';

export type ItemProps = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
    setFavorite : (clickedItem: CartItemType) => void;
}
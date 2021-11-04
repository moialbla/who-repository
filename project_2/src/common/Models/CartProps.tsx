import {CartItemType} from './CartItemType';

export type CartProps = {
    item: CartItemType;
    incrementEvent?: (clickedItem: CartItemType) => void;
    decrementEvent?: (clickedItem: CartItemType) => void;
    removeEvent?: (clickedItem: CartItemType) => void;
}
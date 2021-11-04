import {CartItemType} from './CartItemType';

export type CartListProps = {
    incrementEvent?: (clickedItem: CartItemType) => void;
    decrementEvent?: (clickedItem: CartItemType) => void;
    removeEvent?: (clickedItem: CartItemType) => void;
}

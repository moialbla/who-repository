import {CartItemType} from './CartItemType';

export type GrocerySearchResult = {
    result: Array<CartItemType>;
    totalcount: number;
}
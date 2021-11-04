import {CartItemType} from './CartItemType';

export type ProductListProps = {
    handleAddToCart: (product:CartItemType)=>void;  
}
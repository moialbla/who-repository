import { createSlice } from '../../core/Context';
import { PayloadAction } from '@reduxjs/toolkit';
import { CartItemType } from '../../common/Models/CartItemType';
import { CartItemAddedType } from '../../common/Models/CartItemAddedType';

type CartContextType = {
  products: Array<CartItemType>,
  total: number
}

export const initialState: CartContextType = {
  products: [],
  total: 0
}

function sumTotal(state: any) {
  let total = 0;
  state.products.forEach((value: CartItemType) => {
    if (value.totalPrice) {
      total += value.totalPrice;
    }
  });
  state.total = total;
}

function totalPrice(cart: CartItemAddedType) {
  cart.totalPrice = cart.totalCount * cart.price;
}

const cartSlice = createSlice({
  name: 'grocery',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartItemType>) => {
      const { payload } = action;
      const productHit = (state.products.find((element: CartItemType) => element.id === payload.id) as CartItemAddedType);
      const cart = productHit || { ...payload };

      if (!cart.stock) return;

      if (productHit) {
        --cart.stock;
        ++cart.totalCount;
        totalPrice(cart);
      } else {
        cart.totalCount = 1;
        --cart.stock;
        totalPrice(cart);
        state.products.push(cart);
      }
      sumTotal(state);
    },
    substractProduct: (state, action: PayloadAction<CartItemType>) => {
      const { payload } = action;
      const productHit = state.products.find((element: CartItemType) => element.id === payload.id) as CartItemAddedType;
      if (productHit) {
        ++productHit.stock;
        --productHit.totalCount;
        totalPrice(productHit);
      }
      sumTotal(state);
    },
    removeProduct: (state, action: PayloadAction<CartItemType>) => {
      const productHitIndex = state.products.findIndex((element: CartItemType) => element.id === action.payload.id);
      if (~productHitIndex) {
        state.products.splice(productHitIndex, 1);
      }
      sumTotal(state);
    },
  }
});

export const {
  addProduct,
  substractProduct,
  removeProduct
} = cartSlice.actions

export default cartSlice.reducer;



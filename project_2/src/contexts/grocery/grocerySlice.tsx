import { createSlice } from '../../core/Context';
import { AppThunk } from '../../store';
import { getGrocery, getFavouriteGrocery, patchProduct } from '../../services/grocery';
import { GrocerySearchResult } from '../../common/Models/GrocerySearchResult';
import { PayloadAction } from '@reduxjs/toolkit';
import { CartItemType } from '../../common/Models/CartItemType';

type ProductsContextType = {
  products: any[],
  totalResults: number,
  inProgress: boolean,
  currentPage: number
}

export const initialState: ProductsContextType = {
  products: [],
  totalResults: 0,
  inProgress: true,
  currentPage: 1,
}


const grocerySlice = createSlice({
  name: 'grocery',
  initialState,
  reducers: {
    getProductsInProgress: state => {
      state.inProgress = true;
    },
    addProducts: (state, action: PayloadAction<GrocerySearchResult>) => {
      //state.products = action.payload.result.map(t1 => ({...t1, ...state.products.find(t2 => t2.id === t1.id)}))
      state.products = [...state.products, ...action.payload.result];
      state.totalResults = action.payload.totalcount;
    },
    addFavoritesProducts: (state, action: PayloadAction<GrocerySearchResult>) => {
      state.products = [...state.products, ...action.payload.result];
      state.totalResults = action.payload.totalcount;
    },
    setFavorite: (state, action: PayloadAction<CartItemType>) => {
      const { payload } = action;
      const productHit: CartItemType = state.products.find((element: CartItemType) => element.id === payload.id);
      productHit.favorite = payload.favorite;
    },
    getProductsFinish: state => {
      state.inProgress = false;
    },
    clearProductList: state => {
      state.products.length = 0;
    },
    addStock: (state, action: PayloadAction<CartItemType>) => {
      const productHit = getProduct(action, state);
      if (productHit) {
        ++productHit.stock;
      }
    },
    removeStock: (state, action: PayloadAction<CartItemType>) => {
      const productHit = getProduct(action, state);
      if (productHit) {
        --productHit.stock;
      }
    },
    resetStock: (state, action: PayloadAction<CartItemType>) => {
      const productHit = getProduct(action, state);
      if (productHit) {
        productHit.stock = action?.payload?.stock;
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage += action.payload;
    },
  }
});

function getProduct(action: { payload: CartItemType; type: string; }, state: any) {
  const { payload } = action;
  const productHit = (state.products.find((element: CartItemType) => element.id === payload.id) as CartItemType);
  return productHit;
}

export const {
  getProductsInProgress,
  addProducts,
  getProductsFinish,
  addFavoritesProducts,
  clearProductList,
  setFavorite,
  addStock,
  removeStock,
  resetStock,
  setCurrentPage
} = grocerySlice.actions

export default grocerySlice.reducer


function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const getProductsAction = (page: number = 1, loading: boolean = true): AppThunk => async dispatch => {
  try {
    if (loading) {
      dispatch(getProductsInProgress());
    }
    await timeout(500);
    const searchResult: GrocerySearchResult = await getGrocery(page);
    dispatch(addProducts(searchResult));
    if (loading) {
      dispatch(getProductsFinish());
    }
  } catch (err) {
    console.error(err);
  }
}

export const getProductsFavoriteAction = (): AppThunk => async dispatch => {
  try {
    dispatch(getProductsInProgress());
    await timeout(500);
    const searchResult: GrocerySearchResult = await getFavouriteGrocery();
    dispatch(addFavoritesProducts(searchResult));
    dispatch(getProductsFinish());
  } catch (err) {
    console.error(err);
  }
}

export const setFavoriteAction = (product: CartItemType): AppThunk => async dispatch => {
  try {
    const favorite = product.favorite === "1" ? "0" : "1";
    const newCarItem = { ...product, favorite };
    await patchProduct(newCarItem);
    dispatch(setFavorite(newCarItem))
  } catch (err) {
    console.error(err);
  }
}

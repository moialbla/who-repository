import { configureStore, combineReducers, Action } from './core/Context';
// Wrap in Context
import { ThunkAction } from 'redux-thunk';
// Slices
import grocery from './contexts/grocery';
import cart from './contexts/cart';

const rootReducer = combineReducers({ grocery, cart});

export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('state');

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state:any) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('state', serializedState);
  } catch (error) {
    console.error(error);
  }
};
const persistedState = loadState();
const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof rootReducer>
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
export const { getState, dispatch } = store;
export default store;
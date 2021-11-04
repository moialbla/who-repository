import {
  createSlice, combineReducers, configureStore, useSelector, useDispatch, Action as Action_T, Provider,
} from './Context';

export type Action<T = any> = Action_T;

export { createSlice, combineReducers, configureStore, useSelector, useDispatch, Provider }
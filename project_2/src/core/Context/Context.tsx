import {
  Action as RTKAction,
  createSlice as RTKCreateSlice,
  combineReducers as RTKCombineReducers,
  configureStore as RTKConfigureStore,
} from '@reduxjs/toolkit';

import {
  useSelector as ReduxUseSelector,
  useDispatch as ReduxUseDispatch,
  Provider as ReduxProvider,
} from 'react-redux';

export type Action<T = any> = RTKAction;

export const createSlice = RTKCreateSlice;

export const combineReducers = RTKCombineReducers;

export const configureStore = RTKConfigureStore;

export const useSelector = ReduxUseSelector;

export const useDispatch = ReduxUseDispatch;

export const Provider = ReduxProvider;
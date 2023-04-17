import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import generalSlice from './general-slice';

const rootReducer = combineReducers({
  general: generalSlice,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;

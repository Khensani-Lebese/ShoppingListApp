// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import listReducer from './reducer'; // Adjust import path if necessary

const store = configureStore({
  reducer: {
    lists: listReducer,
  },
});

export default store;

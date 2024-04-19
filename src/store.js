import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { api } from "apiSlice";

const reducer = combineReducers({
  // Include your API slice reducer
  [api.reducerPath]: api.reducer,
  // Include other reducers if you have them
  // reducerName: reducerFunction,
});

const store = configureStore({
  reducer: reducer,
  // Add middleware for RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;

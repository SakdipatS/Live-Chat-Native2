// Store.js
import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./Reducer";

export default configureStore({
  reducer: {
    registerListing: registerSlice,
  },
});

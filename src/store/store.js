import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "../store/data"

const store = configureStore({
  reducer: {
    data: dataSlice


  },
});
export default store
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import categoryReducer from "./slice/categorySlice";
import movieReducer from "./slice/movieSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    movie: movieReducer,
  },
});
export default store;

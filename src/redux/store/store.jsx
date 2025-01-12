import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import disasterReducer from "../slice/disasterSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    disasters: disasterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Untuk menangani data non-serializable seperti error
    }),
});

export default store;

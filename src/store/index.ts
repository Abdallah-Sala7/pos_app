import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./server/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userSlice } from "./reducer/auth";
import { mainApi } from "./server/mainApi";
import { appSlice } from "./reducer/appSlice";
import { productsApi } from "./server/productsApi";
import { ordersApi } from "./server/ordersApi";
import { categoriesApi } from "./server/categoriesApi";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    app: appSlice.reducer,

    productsApi: productsApi.reducer,

    authApi: authApi.reducer,
    mainApi: mainApi.reducer,
    ordersApi: ordersApi.reducer,
    categoriesApi: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      mainApi.middleware,
      productsApi.middleware,
      ordersApi.middleware,
      categoriesApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

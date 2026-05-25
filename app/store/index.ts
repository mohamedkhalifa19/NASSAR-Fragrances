import { configureStore } from "@reduxjs/toolkit";

import cart from "./features/cart/cart";
import perfume from "./features/perfume/perfume";
import offer from "./features/offer/offer";
import news from "./features/news/news";

export const store = configureStore({
  reducer: {
    cart,
    perfume,
    offer,
    news,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

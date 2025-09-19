import { configureStore } from '@reduxjs/toolkit';

import sessionReducer from "./reduces/session";
import heroReducer from "./reduces/hero"
import promotionReducer from "./reduces/promotion";
import aboutReducer from "./reduces/about";
import menuReducer from "./reduces/menu";
import eventReducer from "./reduces/event";
import bookingReducer from "./reduces/booking";

const store = configureStore({
  reducer: {
    session: sessionReducer,
    hero: heroReducer,
    promotion: promotionReducer,
    about: aboutReducer,
    menu: menuReducer,
    event: eventReducer,
    booking: bookingReducer
  },
});

export default store;
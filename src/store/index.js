import { legacy_createStore as createStore, applyMiddleware, combineReducers, compose } from "redux";
import { thunk } from "redux-thunk";

import sessionReducer from "./reduces/session";
import heroReducer from "./reduces/hero"
import promotionReducer from "./reduces/promotion";

const rootReducer = combineReducers({
    session: sessionReducer,
    hero: heroReducer,
    promotion: promotionReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store
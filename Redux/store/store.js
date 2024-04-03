import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
// import {persistStore , persistReducer} from "redux-persist";
// import  storage from  "redux-persist/lib/storage";
import  promiseMiddleware from  "redux-promise";
import {combinedReducer} from "../Reducers/Root_reducer";
import {persistReducer, persistStore} from "redux-persist";
import {getCookie} from "cookies-next";

// Check window is exits or not
const isClient = typeof window !== "undefined"
// Make store
let store;
//Register middleware
const middleware =  [thunk , promiseMiddleware];
// check the server side or client side
const gettingStore = (isClient) => {
    if (isClient){
        const {persistReducer} = require('redux-persist');
        const storage = require('redux-persist/lib/storage').default;
        const persistConfiq = {
            key : "root",
            storage
        };
        const  persistReducers = persistReducer(persistConfiq, combinedReducer);
        store = createStore(persistReducers , applyMiddleware(...middleware));
        store._PERSISTOR = persistStore(store);
    }else{
        store = createStore(combinedReducer , applyMiddleware(...middleware))
    }
    return store;
}
export const serverStore = gettingStore(isClient);






// const persistReducers = persistReducer(persistConfiq, combinedReducer);
// export  const store = createStore(persistReducers, applyMiddleware(...middleware));
// export const  persist = persistStore(store);
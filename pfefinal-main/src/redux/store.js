import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from "../features/articleslice"
import cartsliceReducer from "../features/cartslice"
import scategoriesReducer from "../features/scategorieslice"
import categoriesReducer from "../features/categorieslice"
import authReducer from "../features/AuthSlice"
import orderReducer from "../features/orderslice"

import {persistReducer,persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER} from 'redux-persist'

import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

const persistedReducer = persistReducer(persistConfig, cartsliceReducer)

const persistedReducerAuth = persistReducer(persistConfig, authReducer)

const store = configureStore({
reducer: {
storearticles:articlesReducer,
storecart:persistedReducer,
storescategories: scategoriesReducer,
storecategories: categoriesReducer,
auth:persistedReducerAuth,
order:orderReducer
},
middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  })
})
export const persistor = persistStore(store);
export default store;

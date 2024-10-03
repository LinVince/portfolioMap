/*import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './reducers/darkModeReducer'

const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
  },
});

export default store;*/

import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './reducers/darkModeReducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';

// Persist configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage, // Local storage is used by default
  whitelist: ['darkMode'], // Only persist the darkMode reducer
};

// Combine reducers if you have more in the future
const rootReducer = combineReducers({
  darkMode: darkModeReducer,
});

// Wrap the reducer with persistReducer to enable persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignore persist actions for serializable checks
      },
    }),
});

export const persistor = persistStore(store); // This persists the store
export default store;


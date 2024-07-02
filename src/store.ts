import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './reducers/darkModeReducer'

const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
  },
});

export default store;

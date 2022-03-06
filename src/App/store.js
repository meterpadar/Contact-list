import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './../slices/usersSlice.js';
import contactsReducer from './../slices/contactsSlice.js';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    contacts: contactsReducer
  }
});
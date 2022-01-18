import { configureStore } from "@reduxjs/toolkit";
import emailsReducer from "../features/email/emailsSlice";

export const store = configureStore({
  reducer: {
    emails: emailsReducer,
  },
});

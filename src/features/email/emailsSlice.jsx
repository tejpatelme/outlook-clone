import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../api/axiosInstance";

export const getAllEmails = createAsyncThunk(
  "getAllEmails",
  async (_, thunkAPI) => {
    try {
      const response = await instance.get();
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getEmailBody = createAsyncThunk(
  "getEmailBody",
  async (id, thunkAPI) => {
    try {
      const response = await instance.get(`/?id=${id}`);

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const emailsSlice = createSlice({
  name: "emails",
  initialState: {
    emails: [],
    loadingEmailsStatus: "idle",
    loadingEmailBodyStatus: "idle",
    currentEmailBody: null,
    totalEmails: null,
    activeTab: "All",
  },
  reducers: {
    addtoRead: (state, action) => {
      const readEmailIndex = state.emails.findIndex(
        (email) => email.id === action.payload.id
      );
      state.emails[readEmailIndex].read = true;
    },
    changeActiveTab: (state, action) => {
      state.activeTab = action.payload.tab;
    },
    addToFavorite: (state, action) => {
      const emailIndex = state.emails.findIndex(
        (email) => email.id === action.payload.id
      );
      state.emails[emailIndex].favorite = true;
    },
  },
  extraReducers: {
    [getAllEmails.pending]: (state) => {
      state.loadingEmailsStatus = "pending";
    },
    [getAllEmails.fulfilled]: (state, action) => {
      state.loadingEmailsStatus = "fulfilled";
      state.emails = action.payload.list;
      state.totalEmails = action.payload.length;
    },
    [getEmailBody.pending]: (state) => {
      state.loadingEmailBodyStatus = "pending";
    },
    [getEmailBody.fulfilled]: (state, action) => {
      state.loadingEmailBodyStatus = "fulfilled";
      state.currentEmailBody = action.payload;
    },
  },
});

export default emailsSlice.reducer;
export const { addtoRead, changeActiveTab, addToFavorite } =
  emailsSlice.actions;

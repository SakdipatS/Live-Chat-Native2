// Reducer (Reducer.js)
import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "registerListing",
  initialState: {
    username: "",
    phoneNumber: "",
    subject: "",
  },
  reducers: {
    addRegister: (state, action) => {
      state.username = action.payload.username;
      state.phoneNumber = action.payload.phoneNumber;
      state.subject = action.payload.subject;
    },
  },
});

export const { addRegister, setUserData, } = registerSlice.actions;
export const selectUser = (state) => state.registerListing;
export default registerSlice.reducer;

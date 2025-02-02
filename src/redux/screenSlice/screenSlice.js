import { createSlice } from "@reduxjs/toolkit";

const screenSlice = createSlice({
  name: "screen",
  initialState: { isMobileScreen: false },

  reducers: {
    //used for feed UI.
    setIsMobileScreen: (state, action) => {
      state.isMobileScreen = action.payload;
    },
  },
});

export const { setIsMobileScreen } = screenSlice.actions;
export default screenSlice.reducer; // export reducer biar bisa disimpen ke dalam store

import { createSlice } from "@reduxjs/toolkit";

const screenSlice = createSlice({
  name: "screen", //nama slice
  //initialState : nilai awal state
  initialState: { isMobileScreen: false, isLargeScreen: false, username: "" },
  //reducers : objek yang berisi kumpulan reducer yang akan dipake buat ngubah state slice
  reducers: {
    //setIsMobileScreen : nama reducer.
    setIsMobileScreen: (state, action) => {
      //untuk mengubah / memperbarui nilai state ismobilescreen menjadi nilai yang dikirimdari action.payload
      state.isMobileScreen = action.payload;
    },
    setIsLargeScreen: (state, action) => {
      state.isLargeScreen = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

/**export action creator yang bernamasetIsMobileScreen dari slice screenSliceUntuk ngirim action ke
 * store redux dan memicu perubahan state
 */
export const { setIsMobileScreen, setIsLargeScreen, setUsername } = screenSlice.actions;
export default screenSlice.reducer; // export reducer biar bisa disimpen ke dalam store

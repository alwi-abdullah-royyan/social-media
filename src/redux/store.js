import { configureStore } from "@reduxjs/toolkit";
import screenSlice from "./screenSlice/screenSlice";
import postsSlice from "./postsSlice/postSlice";
/** store : objek yang nyimpen semua state aplikasi
 * dan menyediakan metod untuk dispatch (ngirim) action dan mengakses
 */
export const store = configureStore({
  reducer: {
    screen: screenSlice,
    posts: postsSlice,
  },
});

export default store;

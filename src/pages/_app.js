import { setIsMobileScreen } from "@/redux/screenSlice/screenSlice";
import store from "@/redux/store";
import "@/styles/globals.css";
import { useEffect } from "react";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  //usesetatom buat perbaruhi nilai state
  useEffect(() => {
    function handleResize() {
      //dispatch : aksi yang memicu perubahan nilai state
      store.dispatch(setIsMobileScreen(window.innerWidth < 768));
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

/**dibuat otomatis oleh nextjs
 * fungsinya untuk menerapkan perilaku/elemen global yang dibutuhin sama halaman/app nextjs
 * 1. untuk ngatur layout global
 * 2. untuk menyelesaikan stata global
 * 3. menggunakan css global yang berulaku diterima
 */

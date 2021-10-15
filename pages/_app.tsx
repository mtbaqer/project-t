import "../styles/globals.css";
import type { AppProps } from "next/app";
import "reset-css";
import GlobalStyles from "../styles/GlobalStyles";
import "../firebase/firebase";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;

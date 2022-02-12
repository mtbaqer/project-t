import "../styles/globals.css";
import type { AppProps } from "next/app";
import "reset-css";
import GlobalStyles from "../styles/GlobalStyles";
import "../firebase/firebase";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/700.css";
import "@fontsource/nunito/900.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;

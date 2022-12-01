import "@fontsource/nunito/400.css";
import "@fontsource/nunito/700.css";
import "@fontsource/nunito/900.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
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

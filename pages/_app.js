import "@/styles/globals.css";
import MainHeader from "@/components/layout/mainHeader";

export default function App({ Component, pageProps }) {
  return (
    <>
      <MainHeader />
      <Component {...pageProps} />
    </>
  );
}

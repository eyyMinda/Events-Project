import "@/styles/globals.css";
import Head from "next/head";
import Layout from "@/components/layout/layout";
import { NotificationContextProvider } from "@/store/notification-context";

export default function App({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Next.js: Dynamic Events, Server-Side Rendering, & More</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta
            name="description"
            content="Embark on a journey to master Next.js, the powerful React framework. Explore dynamic events, server-side rendering, and more. Learn best practices for building high-performance web applications."
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

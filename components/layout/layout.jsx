import { Fragment } from "react";
import MainHeader from "./mainHeader";
import Head from "next/head";

export default function Layout(props) {
  return (
    <Fragment>
      <Head>
        <title>Events Nextjs</title>
      </Head>
      <MainHeader />

      <main>{props.children}</main>
    </Fragment>
  );
}

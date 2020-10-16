/* /components/Layout.js */

import React, { useContext } from "react";
import Head from "next/head";

import AppContext from "../context/AppContext";

import { CustomFooter } from "./general/CustomFooter";
import { CustomHeader } from "./general/CustomHeader";
import { MaterialLayout } from "../MUI/Templates/MaterialLayout";
import Container from "@material-ui/core/Container";

const Layout = (props) => {
  const title = "Welcome to Nextjs";
  const { user, setUser } = useContext(AppContext);

  return (
    <MaterialLayout>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script src="https://js.stripe.com/v3" />
      </Head>
      <div className="content">
        <header>
          <CustomHeader user={user} setUser={setUser} />
        </header>
        <Container>{props.children}</Container>
      </div>
      <footer>
        <CustomFooter />
      </footer>
    </MaterialLayout>
  );
};

export default Layout;

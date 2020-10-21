/* _app.js */
import React, { useState, useEffect } from "react";
import App from "next/app";
import Head from "next/head";
import Cookie from "js-cookie";
import Layout from "../components/Layout";
import AppContext from "../context/AppContext";
// import withData from "../lib/apollo";

import { ApolloProvider } from "@apollo/react-hooks";
import withApollo from "../lib/apollo";

import { parserCookies } from "../lib/parserCookies";
import Router from "next/router";
import Loader from "../components/Loaders/Loader";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "../MUI/theme";

import {
  manageCart,
  manageCookieCart,
  setCartUtil,
  checkItemAndTotalCart
} from "../utils/cartUtils";
import { userFetch } from "../utils/userUtils";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { toast } from "react-toastify";
import { ToastMessage } from "../components/general/ToastMessage";

function MyApp({ Component, pageProps, apollo }) {
  const isDarkCookie = pageProps && pageProps.isDarkCookie;

  const [user, setUser] = useState(null);
  const [logouted, setLogouted] = useState(false);
  const [cart, setCart] = useState({ items: [], total: 0, orderId: null });
  const [cartLoaded, setCartLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [manageObjectItem, setManageObjectItem] = useState(null);
  const [isDark, setIsDark] = useState(isDarkCookie || false);

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    Router.events.on("routeChangeStart", (url) => {
      console.log(`Loading: ${url}`);
      setIsLoading(true);
    });
    Router.events.on("routeChangeComplete", () => {
      setIsLoading(false);
    });
    Router.events.on("routeChangeError", () => {
      setIsLoading(false);
    });
    //check token
    const token = Cookie.get("token");
    async function getStateFunc() {
      if (token) {
        //get user and cart from db
        const user = await userFetch();
        if (!user) {
          setUser(null);
          setCart({ items: [], total: 0, orderId: null });
          setCartLoaded(true);
          return null;
        }
        setUser(user);
      } else {
        // restore cart from cookie, without db
        const cart = checkItemAndTotalCart();
        // if items in cart, set items and total from cookie
        setUser(null);
        setCart(cart);
        setCartLoaded(true);
      }
    }
    getStateFunc();
    return () => {};
  }, []);

  useEffect(() => {
    if (user && user.cart_id) {
      setCartFunc(user.cart_id);
    }
    return () => {};
  }, [user]);

  useEffect(() => {
    if (logouted && user === null) {
      //logout?
      setCart({ items: [], total: 0, orderId: null });
    }
    return () => {};
  }, [logouted]);

  useEffect(() => {
    if (manageObjectItem) {
      let newCart = null;
      async function getCartFunc() {
        if (user && user.cart_id) {
          console.log(cart.items);
          newCart = await manageCart(user.cart_id, cart.items, user.id);
        } else {
          console.log(cart, cart.items);
          newCart = await manageCookieCart(
            manageObjectItem && manageObjectItem.id,
            cart.items
          );
        }
        if (newCart) {
          setCart(newCart);
          Cookie.set("cart", newCart.items);
        } else {
          console.error("WHAT THE HECK");
        }
      }
      getCartFunc();
    }
    return () => {};
  }, [manageObjectItem]);

  const setUserFunc = (user) => {
    setUser(user);
    setLogouted(false);
  };
  const handleLogouted = () => {
    setLogouted(true);
  };
  const setCartFunc = async (cart_id) => {
    const cart = await setCartUtil(cart_id);
    // console.log(cart);
    setCart(cart);
    setCartLoaded(true);
  };
  // getIsDark = () => {
  //   const isDark = JSON.parse(Cookie.get("isDark") || this.props.isDark);
  //   // console.log(isDark, JSON.parse(Cookie.get("isDark")), this.props.isDark);
  //   // return localStorage.getItem("isDark") || this.state.isDark;
  //   this.setState({ isDark: isDark });
  // };
  const setTheme = (setCookieDark) => {
    setIsDark(setCookieDark);
    Cookie.set("isDark", JSON.stringify(setCookieDark));
  };

  const addItem = (objectItem) => {
    let { items } = cart;

    setManageObjectItem({
      id: objectItem.id,
      name: objectItem.name,
      price: objectItem.price
    });
    //check for item already in cart
    //if not in cart, add item if item is found increase quanity ++
    const newItem = items.find((i) => i.id === objectItem.id);
    // let newCart = null;
    toast.info(ToastMessage(objectItem.name, "add"));

    // if item is not new, add to cart, set quantity to 1
    if (!newItem) {
      //set quantity property to 1
      setCart({
        items: [
          ...items,
          {
            id: objectItem.id,
            name: objectItem.name,
            price: objectItem.price,
            quantity: 1
          }
        ],
        total: cart.total + objectItem.price,
        orderId: cart.orderId
      });
    } else {
      setCart({
        items: cart.items.map((item) =>
          item.id === newItem.id
            ? Object.assign({}, item, { quantity: item.quantity + 1 })
            : item
        ),
        total: cart.total + objectItem.price,
        orderId: cart.orderId
      });
    }
  };
  const removeItem = (item) => {
    let { items } = cart;

    // cart object item
    setManageObjectItem({
      id: item.id,
      name: item.name,
      price: item.price
    });

    toast.info(ToastMessage(item.name, "remove"), {
      className: "black-background"
    });
    //check for item already in cart
    //if not in cart, add item if item is found increase quanity ++
    const newItem = items.find((i) => i.id === item.id);
    // let newCart = null;

    if (newItem.quantity > 1) {
      setCart({
        items: cart.items.map((item) =>
          item.id === newItem.id
            ? Object.assign({}, item, { quantity: item.quantity - 1 })
            : item
        ),
        total: cart.total - item.price,
        orderId: cart.orderId
      });
    } else {
      const items = [...cart.items];
      const index = items.findIndex((i) => i.id === newItem.id);

      items.splice(index, 1);
      setCart({
        items: items,
        total: cart.total - item.price,
        orderId: cart.orderId
      });
    }
  };

  // const { Component, pageProps } = props;
  // const { isLoading, user, cart, cartLoaded, isDark } = state;
  return (
    <>
      <ApolloProvider client={apollo}>
        <AppContext.Provider
          value={{
            user,
            isAuthenticated: !!user,
            setUserFunc,
            cart,
            cartLoaded,
            setCartFunc,
            handleLogouted,
            addItem,
            removeItem,
            isDark,
            setTheme
          }}
        >
          <Head>
            {/* PWA primary color */}
            <meta
              name="theme-color"
              content={theme(isDark).palette.primary.main}
            />
          </Head>
          <ThemeProvider theme={theme(isDark)}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Layout>
              <Component {...pageProps} isLoading={isLoading} />

              <ToastContainer
                hideProgressBar={false}
                position="top-right"
                autoClose={2000}
                removeCloseButton={true}
              />
            </Layout>
            {isLoading && <Loader />}
          </ThemeProvider>
        </AppContext.Provider>
      </ApolloProvider>
    </>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  let isDarkCookie;
  const cookies = parserCookies(ctx.req);
  isDarkCookie = cookies && cookies.isDark && JSON.parse(cookies.isDark);

  // expose the query to the user
  pageProps.query = ctx.query;
  pageProps.isDarkCookie = isDarkCookie;
  return { pageProps };
};

export default withApollo(MyApp);

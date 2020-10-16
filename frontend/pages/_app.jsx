/* _app.js */
import React from "react";
import App from "next/app";
import Head from "next/head";
import Cookie from "js-cookie";
import Layout from "../components/Layout";
import AppContext from "../context/AppContext";
import withData from "../lib/apollo";
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

class MyApp extends App {
  state = {
    user: null,
    cart: { items: [], total: 0, orderId: null },
    isLoading: false,
    cartLoaded: false,
    isDark: false
  };

  componentDidUpdate(prevProps, prevState) {
    //logout state clear.
    if (prevState.user !== this.state.user && this.state.user === null) {
      this.setState({
        cart: {
          items: [],
          total: 0,
          orderId: null
        }
      });
    }
  }
  async componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    Router.events.on("routeChangeStart", (url) => {
      console.log(`Loading: ${url}`);
      this.setState({ isLoading: true });
    });
    Router.events.on("routeChangeComplete", () => {
      this.setState({ isLoading: false });
    });
    Router.events.on("routeChangeError", () => {
      this.setState({ isLoading: false });
    });

    this.getIsDark();

    //check token
    const token = Cookie.get("token");
    if (token) {
      //get user and cart from db
      const user = await userFetch();
      if (!user) {
        this.setState({
          user: null,
          cart: { items: [], total: 0, orderId: null },
          cartLoaded: true
        });
        return null;
      }
      this.setUser(user);
    } else {
      // restore cart from cookie, without db
      const cart = checkItemAndTotalCart();
      // if items in cart, set items and total from cookie
      this.setState({
        cart,
        user: null,
        cartLoaded: true
        // isDark: this.getIsDark()
      });
    }
  }

  setUser = (user) => {
    this.setState({ user }, () => {
      if (user && user.cart_id) {
        // setCart(user.cart_id)
        this.setCart(user.cart_id);
      }
    });
  };
  setCart = async (cart_id) => {
    const cart = await setCartUtil(cart_id);
    this.setState({ cart, cartLoaded: true });
  };
  getIsDark = () => {
    const isDark =
      JSON.parse(localStorage.getItem("isDark")) || this.state.isDark;
    // return localStorage.getItem("isDark") || this.state.isDark;
    this.setState({ isDark: isDark });
  };
  setTheme = (isDark) => {
    localStorage.setItem("isDark", isDark);
    this.setState({ isDark: isDark });
  };
  addItem = (objectItem) => {
    let { items } = this.state.cart;
    let { user } = this.state;

    // cart object item
    let addObjectItem = {
      id: objectItem.id,
      name: objectItem.name,
      price: objectItem.price
    };

    //check for item already in cart
    //if not in cart, add item if item is found increase quanity ++
    const newItem = items.find((i) => i.id === addObjectItem.id);
    let newCart = null;
    toast.info(ToastMessage(objectItem.name, "add"));

    // if item is not new, add to cart, set quantity to 1
    if (!newItem) {
      //set quantity property to 1
      addObjectItem.quantity = 1;

      this.setState(
        {
          cart: {
            items: [...items, addObjectItem],
            total: this.state.cart.total + addObjectItem.price,
            orderId: this.state.cart.orderId
          }
        },
        async () => {
          if (user && user.cart_id) {
            newCart = await manageCart(
              user.cart_id,
              this.state.cart.items,
              user.id
            );
          } else {
            newCart = await manageCookieCart(
              addObjectItem.id,
              this.state.cart.items
            );
          }
          if (newCart) {
            this.setState({ cart: newCart });
            Cookie.set("cart", newCart.items);
          } else {
            console.error("WHAT THE HECK");
          }
        }
      );
    } else {
      this.setState(
        {
          cart: {
            items: this.state.cart.items.map((item) =>
              item.id === newItem.id
                ? Object.assign({}, item, { quantity: item.quantity + 1 })
                : item
            ),
            total: this.state.cart.total + addObjectItem.price,
            orderId: this.state.cart.orderId
          }
        },
        async () => {
          if (user && user.cart_id) {
            newCart = await manageCart(
              user.cart_id,
              this.state.cart.items,
              user.id
            );
          } else {
            newCart = await manageCookieCart(
              addObjectItem.id,
              this.state.cart.items
            );
          }
          if (newCart) {
            this.setState({ cart: newCart });
            Cookie.set("cart", newCart.items);
          } else {
            console.error("WHAT THE HECK");
          }
        }
      );
    }
  };
  removeItem = (item) => {
    let { items } = this.state.cart;
    let { user } = this.state;
    // cart object item
    let removeObjectItem = {
      id: item.id,
      name: item.name,
      price: item.price
    };
    toast.info(ToastMessage(item.name, "remove"), {
      className: "black-background"
    });
    //check for item already in cart
    //if not in cart, add item if item is found increase quanity ++
    const newItem = items.find((i) => i.id === item.id);
    let newCart = null;

    if (newItem.quantity > 1) {
      this.setState(
        {
          cart: {
            items: this.state.cart.items.map((item) =>
              item.id === newItem.id
                ? Object.assign({}, item, { quantity: item.quantity - 1 })
                : item
            ),
            total: this.state.cart.total - item.price,
            orderId: this.state.cart.orderId
          }
        },
        async () => {
          if (user && user.cart_id) {
            newCart = await manageCart(
              user.cart_id,
              this.state.cart.items,
              user.id
            );
          } else {
            newCart = await manageCookieCart(
              removeObjectItem.id,
              this.state.cart.items
            );
          }
          if (newCart) {
            this.setState({ cart: newCart });
            Cookie.set("cart", newCart.items);
          } else {
            console.error("WHAT THE HECK");
          }
        }
      );
    } else {
      const items = [...this.state.cart.items];
      const index = items.findIndex((i) => i.id === newItem.id);

      items.splice(index, 1);
      this.setState(
        {
          cart: {
            items: items,
            total: this.state.cart.total - item.price,
            orderId: this.state.cart.orderId
          }
        },
        async () => {
          if (user && user.cart_id) {
            newCart = await manageCart(
              user.cart_id,
              this.state.cart.items,
              user.id
            );
          } else {
            newCart = await manageCookieCart(
              removeObjectItem.id,
              this.state.cart.items
            );
          }
          if (newCart) {
            this.setState({ cart: newCart });
            Cookie.set("cart", newCart.items);
          } else {
            console.error("WHAT THE HECK");
          }
        }
      );
    }
  };

  render() {
    const { Component, pageProps } = this.props;
    const { isLoading, user, cart, cartLoaded, isDark } = this.state;
    return (
      <>
        <AppContext.Provider
          value={{
            user: user,
            isAuthenticated: !!user,
            setUser: this.setUser,
            cart: cart,
            cartLoaded: cartLoaded,
            setCart: this.setCart,
            addItem: this.addItem,
            removeItem: this.removeItem,
            isDark: isDark,
            setTheme: this.setTheme
          }}
        >
          <Head>
            {/* <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          /> */}
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
      </>
    );
  }
}

export default withData(MyApp);
// export default withApollo(MyApp);

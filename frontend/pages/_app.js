/* _app.js */
import React from "react";
import App from "next/app";
import Head from "next/head";
import Cookie from "js-cookie";
import Layout from "../components/Layout";
import AppContext from "../context/AppContext";
import withData from "../lib/apollo";
import Router from 'next/router'
import Loader from '../components/Loader'
import { manageCart, manageCookieCart, setCartUtil, checkItemAndTotalCart } from '../utils/cartUtils'
import { userFetch } from '../utils/userUtils'

class MyApp extends App {
  state = {
    user: null,
    cart: { items: [], total: 0 },
    isLoading: false
  };
  
  componentDidUpdate(prevProps, prevState) {
    //logout state clear
    if (prevState.user !== this.state.user&&this.state.user===null) {
      this.setState({
        cart: { 
          items: [],
          total: 0
         }
      });
    }
  }
  async componentDidMount() {
    Router.events.on('routeChangeStart', (url) => {
      console.log(`Loading: ${url}`)
      this.setState({ isLoading: true })
    })
    Router.events.on('routeChangeComplete', () => {
      this.setState({ isLoading: false })
    })
    Router.events.on('routeChangeError', () => {
      this.setState({ isLoading: false })
    })

    //check token
    const token = Cookie.get("token");
    if (token) {
      //get user and cart from db
      const user = await userFetch();
      if (!user) {
        this.setState({ 
          user: null,
          cart: { items: [], total: 0 },
        })
        return null;
      }
      this.setUser(user)
    } else {
      // restore cart from cookie, without db
      const cart = checkItemAndTotalCart()
      // if items in cart, set items and total from cookie
      this.setState({ cart });
    }
  }

  setUser = (user) => {
    this.setState({ user }, ()=>{
      if (user&&user.cart_id) {
        // setCart(user.cart_id)
        this.setCart(user.cart_id)
      }
    } );
  };
  setCart = async (cart_id) => {
    const cart = await setCartUtil(cart_id);
    this.setState({ cart });
  }
  addItem = (objectItem) => {
    
    let { items } = this.state.cart;
    let { user } = this.state;

    // cart object item
    let addObjectItem = {
      id: objectItem.id,
      name: objectItem.name,
      price: objectItem.price,
    }

    //check for item already in cart
    //if not in cart, add item if item is found increase quanity ++
    const newItem = items.find((i) => i.id === addObjectItem.id);
    let newCart = null
    // if item is not new, add to cart, set quantity to 1
    if (!newItem) {
      //set quantity property to 1
      addObjectItem.quantity = 1;

      this.setState(
        {
          cart: {
            items: [...items, addObjectItem],
            total: this.state.cart.total + addObjectItem.price,
          },
        },
        async () => {
          if (user&&user.cart_id) {
            newCart = await manageCart(user.cart_id, this.state.cart.items)
          } else {
            newCart = await manageCookieCart(addObjectItem.id, this.state.cart.items)
          }
          if (newCart) {
            this.setState({ cart: newCart })
            Cookie.set("cart", newCart.items)
          } else {
            console.error("WHAT THE HECK")
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
          },
        },
        async () => {
          if (user&&user.cart_id) {
            newCart = await manageCart(user.cart_id, this.state.cart.items)
          } else {
            newCart = await manageCookieCart(addObjectItem.id, this.state.cart.items)
          }
          if (newCart) {
            this.setState({ cart: newCart })
            Cookie.set("cart", newCart.items)
          } else {
            console.error("WHAT THE HECK")
          }
        }
      );
    }
  };
  removeItem = (item) => {
    let { items } = this.state.cart;
    let { user } = this.state
    // cart object item
    let removeObjectItem = {
      id: item.id,
      name: item.name,
      price: item.price,
    }
    //check for item already in cart
    //if not in cart, add item if item is found increase quanity ++
    const newItem = items.find((i) => i.id === item.id);
    let newCart = null

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
          },
        },
        async () => {
          if (user&&user.cart_id) {
            newCart = await manageCart(user.cart_id, this.state.cart.items)
          } else {
            newCart = await manageCookieCart(removeObjectItem.id, this.state.cart.items)
          }
          if (newCart) {
            this.setState({ cart: newCart })
            Cookie.set("cart", newCart.items)
          } else {
            console.error("WHAT THE HECK")
          }
        }
      );
    } else {
      const items = [...this.state.cart.items];
      const index = items.findIndex((i) => i.id === newItem.id);

      items.splice(index, 1);
      this.setState(
        { cart: { items: items, total: this.state.cart.total - item.price } },
        async () => {
          if (user&&user.cart_id) {
            newCart = await manageCart(user.cart_id, this.state.cart.items)
          } else {
            newCart = await manageCookieCart(removeObjectItem.id, this.state.cart.items)
          }
          if (newCart) {
            this.setState({ cart: newCart })
            Cookie.set("cart", newCart.items)
          } else {
            console.error("WHAT THE HECK")
          }
        }
      );
    }
  };
  
  render() {
    const { Component, pageProps } = this.props;
    const { isLoading } = this.state
    return (
      <>
      <AppContext.Provider
        value={{
          user: this.state.user,
          isAuthenticated: !!this.state.user,
          setUser: this.setUser,
          cart: this.state.cart,
          addItem: this.addItem,
          removeItem: this.removeItem,
        }}
      >
        <Head>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          />
        </Head>

        <Layout>
          <Component {...pageProps} isLoading={isLoading}/>
        </Layout>
      </AppContext.Provider>
      {isLoading && <Loader />}
      </>
    );
  }
}

export default withData(MyApp);
// export default withApollo(MyApp);

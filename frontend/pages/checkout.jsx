/* pages/checkout.js */

import React, { useContext } from "react";

import Grid from "@material-ui/core/Grid";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import InjectedCheckoutForm from "../components/checkout/CheckoutForm";
import AppContext from "../context/AppContext";

import Cart from "../components/cart/CartPage";

function Checkout() {
  // get app context
  const appContext = useContext(AppContext);
  // isAuthenticated is passed to the cart component to display order button
  const { isAuthenticated } = appContext;

  // load stripe to inject into elements components
  const stripePromise = loadStripe("YOUR STRIPE PUBLIC KEY pk_");

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <h1 style={{ margin: 20 }}>Checkout</h1>
        <Cart isAuthenticated={isAuthenticated} />
      </Grid>
      <Grid item xs={6}>
        <Elements stripe={stripePromise}>
          <InjectedCheckoutForm />
        </Elements>
      </Grid>
    </Grid>
  );
  // }
}
export default Checkout;

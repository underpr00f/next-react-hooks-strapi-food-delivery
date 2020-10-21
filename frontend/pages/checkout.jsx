/* pages/checkout.js */

import React, { useContext } from "react";

import Grid from "@material-ui/core/Grid";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import TestCheckoutForm from "../components/checkout/TestCheckoutForm";
import AppContext from "../context/AppContext";

import Cart from "../components/cart/CartPage";
import { MaterialCheckout } from "../MUI/Organisms/MaterialCheckout";

function Checkout() {
  // get app context
  const appContext = useContext(AppContext);
  // isAuthenticated is passed to the cart component to display order button
  const { user, isAuthenticated } = appContext;

  // load stripe to inject into elements components
  const stripePromise = loadStripe("YOUR STRIPE PUBLIC KEY pk_");

  return (
    <MaterialCheckout>
      <Grid item xs={12} md={6}>
        <h1 style={{ margin: 20 }}>Checkout</h1>
        <Cart isAuthenticated={isAuthenticated} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Elements stripe={stripePromise}>
          <TestCheckoutForm />
        </Elements>
      </Grid>
    </MaterialCheckout>
  );
  // }
}
export default Checkout;

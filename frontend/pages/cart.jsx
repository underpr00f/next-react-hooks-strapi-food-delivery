/* /pages/restaurants.js */
import React from "react";
// import { useContext } from "react";
import CartPage from "../components/cart/CartPage";
// import AppContext from "../../../context/AppContext";
// import {errorSlugChecker} from "../../../utils/errorChecker";
// import { API_URL } from '../../../utils/constants'
import Grid from "@material-ui/core/Grid";

export default function Cart() {
  return (
    <>
      <h1>Cart Page</h1>
      <Grid container>
        <Grid item xs={12}>
          <div>
            <CartPage />
          </div>
        </Grid>
      </Grid>
    </>
  );
}

/* /pages/restaurants.js */
import React from "react";
// import { useContext } from "react";
import MyOrdersPage from "../components/MyOrdersPage";
// import AppContext from "../../../context/AppContext";
// import {errorSlugChecker} from "../../../utils/errorChecker";
// import { API_URL } from "../../../utils/constants";
import Grid from "@material-ui/core/Grid";

export default function MyOrders() {
  return (
    <>
      <h1>My Orders Page</h1>
      <Grid container>
        <Grid item xs={12}>
          <div>
            <MyOrdersPage />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
// export async function getServerSideProps(context) {
//   const { slug, division } = context.query;
//   const res = await fetch(`${API_URL}/restaurants?slug=${slug}`);
//   const data = await errorSlugChecker(res, division);

//   return {
//     props: data
//   };
// }

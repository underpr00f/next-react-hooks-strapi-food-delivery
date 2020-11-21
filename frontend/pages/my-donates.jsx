/* /pages/my-orders.js */
import React from "react"
import MyOrdersPage from "../components/MyOrdersPage"
import Grid from "@material-ui/core/Grid"

export default function MyOrders() {
  return (
    <>
      <h1>My Donates Page</h1>
      <Grid container>
        <Grid item xs={12}>
          <div>
            <MyOrdersPage />
          </div>
        </Grid>
      </Grid>
    </>
  )
}

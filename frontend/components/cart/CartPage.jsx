/* components/cart/index.js */

import React, { useContext } from "react";
import { useRouter } from "next/router";
import { ButtonLink } from "../../MUI/Molecules/ButtonLink";
import { LoaderContent } from "../Loaders/LoaderContent";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import AppContext from "../../context/AppContext";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  cardTitle: {
    color: "#000"
  }
});

function CartPage() {
  const appContext = useContext(AppContext);
  const router = useRouter();
  const classes = useStyles();
  const { cart, isAuthenticated, cartLoaded } = appContext;
  if (!cartLoaded) {
    return <LoaderContent />;
  }
  return (
    <Grid item xs={12}>
      <Card style={{ padding: "10px 5px" }} className="cart">
        <Typography
          gutterBottom
          variant="h5"
          component="h3"
          className={classes.cardTitle}
        >
          Your Order:
        </Typography>
        <hr />
        <CardContent style={{ padding: 10 }}>
          <div style={{ marginBottom: 6 }}>
            <small>Items:</small>
          </div>
          <div>
            {cart.items
              ? cart.items.map((item) => {
                  if (item.quantity > 0) {
                    return (
                      <div
                        className="items-one"
                        style={{ marginBottom: 15 }}
                        key={item.id}
                      >
                        <div>
                          <span id="item-price">&nbsp; ${item.price}</span>
                          <span id="item-name">&nbsp; {item.name}</span>
                        </div>
                        <div>
                          <Button
                            style={{
                              marginRight: 5,
                              marginLeft: 10
                            }}
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() => appContext.addItem(item)}
                          >
                            +
                          </Button>
                          <Button
                            style={{
                              marginRight: 10
                            }}
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() => appContext.removeItem(item)}
                          >
                            -
                          </Button>
                          <span style={{ marginLeft: 5 }} id="item-quantity">
                            {item.quantity}x
                          </span>
                        </div>
                      </div>
                    );
                  }
                })
              : null}
            {isAuthenticated ? (
              cart.items && cart.items.length > 0 ? (
                <div>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h3"
                    className={classes.cardTitle}
                  >
                    Total:
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h3"
                    className={classes.cardTitle}
                  >
                    ${appContext.cart.total.toFixed(2)}
                  </Typography>
                  <div
                    style={{
                      marginTop: 10,
                      marginRight: 10
                    }}
                  >
                    <ButtonLink name="Order" hrefValue={`/checkout`} />
                  </div>
                </div>
              ) : (
                <>
                  {router.pathname === "/checkout" && (
                    <small
                      style={{ color: "blue" }}
                      onClick={() => window.history.back()}
                    >
                      back to restaurant
                    </small>
                  )}
                </>
              )
            ) : (
              <>
                <h3>
                  $
                  {appContext.cart.total ? appContext.cart.total.toFixed(2) : 0}
                </h3>
                <h5>Login to Order</h5>
              </>
            )}
          </div>
        </CardContent>
      </Card>
      <style jsx>{`
        #item-price {
          font-size: 1.3em;
          color: rgba(97, 97, 97, 1);
        }
        #item-quantity {
          font-size: 0.95em;
          padding-bottom: 4px;
          color: rgba(158, 158, 158, 1);
        }
        #item-name {
          font-size: 1.3em;
          color: rgba(97, 97, 97, 1);
        }
      `}</style>
    </Grid>
  );
}
export default CartPage;

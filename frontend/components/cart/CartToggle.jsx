/* components/cart/index.js */

import React, { useContext } from "react";
import { useRouter } from "next/router";
import { Badge } from "reactstrap";
import AppContext from "../../context/AppContext";
import { useHover } from "../../hooks/hooks";
import { checkIsArray } from "../../utils/helperFunctions";

import { ButtonLink } from "../../MUI/Molecules/ButtonLink";
import Card from "@material-ui/core/Card";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(1),
    boxShadow: "none"
  },
  typography: {
    margin: 0
  },
  iconButton: {
    "& svg": {
      fontSize: "1rem"
    }
  }
}));
function CartToggle({ user }) {
  const classes = useStyles();
  const appContext = useContext(AppContext);
  const router = useRouter();
  const [hoverRef, isHovered] = useHover();
  const { cart, isAuthenticated } = appContext;

  return (
    <>
      <div className="settings" ref={hoverRef}>
        {/* <Link href="/cart">
        <a>
          <h5>{user}
            {isHovered ? '😁' : '☹️'}
          </h5>
        </a>
      </Link> */}
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <ShoppingCartIcon />
        </IconButton>
        <div className="settings-inner">
          <Card style={{ padding: "10px 5px" }} className="cart">
            <CardContent style={{ padding: 10 }}>
              {cart.items && checkIsArray(cart.items) && (
                <div style={{ marginBottom: 6 }}>
                  <small>Items:</small>
                </div>
              )}
              {cart.items && checkIsArray(cart.items) ? (
                cart.items.map((item) => {
                  if (item.quantity > 0) {
                    return (
                      <div
                        className="items-one"
                        style={{ marginBottom: 5 }}
                        key={item.id}
                      >
                        <div>
                          <span id="item-price">${item.price}</span>
                          <span id="item-name">&nbsp; {item.name}</span>
                        </div>
                        <div>
                          <IconButton
                            className={classes.iconButton}
                            onClick={() => appContext.addItem(item)}
                          >
                            <AddIcon />
                          </IconButton>
                          <IconButton
                            className={classes.iconButton}
                            onClick={() => appContext.removeItem(item)}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <span style={{ marginLeft: 5 }} id="item-quantity">
                            {item.quantity}x
                          </span>
                        </div>
                      </div>
                    );
                  }
                })
              ) : (
                <div className="empty-cart" style={{ marginBottom: 15 }}>
                  Your cart is empty
                </div>
              )}
              {cart.items && cart.items.length > 0 && (
                <div>
                  <Badge style={{ width: 200, padding: 10 }} color="light">
                    <h5
                      style={{ fontWeight: 100, color: "gray" }}
                      className={classes.typography}
                    >
                      Total:
                    </h5>
                    <h3 className={classes.typography}>
                      ${appContext.cart.total.toFixed(2)}
                    </h3>
                  </Badge>
                  <div>
                    <ButtonLink name="Cart" hrefValue={`/cart`} />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <style jsx>{`
          a:hover {
            text-decoration: none;
          }
          .settings {
            position: relative;
          }
          .settings-inner {
            position: absolute;
            min-width: 200px;
            cursor: default;
            top: 100%;
            right: 0;
            opacity: 0;
            visibility: hidden;
            z-index: 999;
            transition: all 0.3s cubic-bezier(1, -0.4, 0.69, 1.25);
          }
          .settings:hover .settings-inner {
            opacity: 1;
            visibility: visible;
          }

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
          .card-title {
            color: #000;
          }
        `}</style>
      </div>
    </>
  );
}
export default CartToggle;

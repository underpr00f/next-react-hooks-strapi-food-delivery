/* components/cart/index.js */

import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Card, CardBody, CardTitle, Badge } from "reactstrap";

import AppContext from "../../context/AppContext";
import { useHover } from "../../hooks/hooks";
import { checkIsArray } from "../../utils/helperFunctions";

function CartPublicToggle({user}) {
  const appContext = useContext(AppContext);
  const router = useRouter();
  const [hoverRef, isHovered] = useHover();
  const { cart, isAuthenticated } = appContext;

  return (
    <>

    <div  
      className="settings"
      ref={hoverRef}
    >
      <Link href="/cart">
        <a>
          <h5>
            {isHovered ? '😁' : '☹️'}
          </h5>
        </a>
      </Link>
      <div 
        className="settings-inner"
      >

      <Card style={{ padding: "10px 5px" }} className="cart">
        <CardTitle style={{ margin: 10 }}>Cart:</CardTitle>
        <CardBody style={{ padding: 10 }}>
          {cart.items && checkIsArray(cart.items) &&
            <div style={{ marginBottom: 6 }}>
              <small>Items:</small>
            </div>
          }
          {cart.items && checkIsArray(cart.items)
            ? (
              cart.items.map((item) => {
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
                            height: 25,
                            padding: 0,
                            width: 15,
                            marginRight: 5,
                            marginLeft: 10,
                          }}
                          onClick={() => appContext.addItem(item)}
                          color="link"
                        >
                          +
                        </Button>
                        <Button
                          style={{
                            height: 25,
                            padding: 0,
                            width: 15,
                            marginRight: 10,
                          }}
                          onClick={() => appContext.removeItem(item)}
                          color="link"
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
            )
            : <div
                className="empty-cart"
                style={{ marginBottom: 15 }}
              >Your cart is empty</div>
            }
            {isAuthenticated ? (
              cart.items&&cart.items.length > 0 ? (
                <div>
                  <Badge style={{ width: 200, padding: 10 }} color="light">
                    <h5 style={{ fontWeight: 100, color: "gray" }}>Total:</h5>
                    <h3>${appContext.cart.total.toFixed(2)}</h3>
                  </Badge>
                    <div
                      style={{
                        marginTop: 10,
                        marginRight: 10,
                      }}
                    >
                      <Link href="/checkout">
                        <Button style={{ width: "100%" }} color="primary">
                          <a>Order</a>
                        </Button>
                      </Link>
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
                <h3>${appContext.cart.total?appContext.cart.total.toFixed(2):0}</h3>
                <h5>Login to Order</h5>
              </>
            )}
        </CardBody>
      </Card>
      </div>
      <style jsx>{`
        h5 {
          color: white;
          padding-top: 11px;
        }
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
          color:#000;
        }
      `}</style>
    </div>
    </>
  );
}
export default CartPublicToggle;

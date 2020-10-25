/* /components/Checkout/CheckoutForm.js */

import React, { useState, useContext } from "react";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { toast } from "react-toastify";

import CardSection from "./CardSection";
import AppContext from "../../context/AppContext";
import { checkoutCart } from "../../utils/cartUtils";
import { ToastMessage } from "../general/ToastMessage";

import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { MaterialForm } from "../../MUI/Organisms/MaterialForm";

function TestCheckoutForm() {
  const [data, setData] = useState({
    address: "",
    city: "",
    state: "",
    stripe_id: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const appContext = useContext(AppContext);
  function onChange(e) {
    // set the key = to the name property equal to the value typed
    const updateItem = (data[e.target.name] = e.target.value);
    // update the state data object
    setData({ ...data, updateItem });
  }

  async function submitOrder() {
    // event.preventDefault();
    const { user, cart, setCartFunc } = appContext;
    // let checkout = null;
    // // Use elements.getElement to get a reference to the mounted Element.
    // const cardElement = elements.getElement(CardElement);
    // // Pass the Element directly to other Stripe.js methods:
    // // e.g. createToken - https://stripe.com/docs/js/tokens_sources/create_token?type=cardElement
    // get token back from stripe to process credit card
    // const token = await stripe.createToken(cardElement);
    // console.log(
    //   appContext,
    //   Number(Math.round(appContext.cart.total + "e2") + "e-2"),
    //   appContext.user.order_id,
    //   appContext.cart
    // );
    if (user && cart) {
      setLoading(true);
      // console.log(cart, cart.orderId, user.cart_id, user.id);
      const checkout = await checkoutCart(
        cart.orderId,
        user.cart_id,
        user.id,
        data
      );
      // console.log("checkout", checkout);
      if (checkout) {
        //check cart from backend
        setCartFunc(user.cart_id);
        setLoading(false);
        toast.info(ToastMessage("order confirmed"));
      } else {
        toast.error(ToastMessage("cart is empty"));
        setLoading(false);
      }
    }
    // const userToken = Cookies.get("token");
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
    //   method: "POST",
    //   headers: userToken && { Authorization: `Bearer ${userToken}` },
    //   body: JSON.stringify({
    //     amount: Number(Math.round(appContext.cart.total + "e2") + "e-2"),
    //     dishes: appContext.cart.items,
    //     address: data.address,
    //     city: data.city,
    //     state: data.state,
    //     token: token.token.id
    //   })
    // });

    // if (!response.ok) {
    //   setError(response.statusText);
    // }

    // OTHER stripe methods you can use depending on app
    // // or createPaymentMethod - https://stripe.com/docs/js/payment_intents/create_payment_method
    // stripe.createPaymentMethod({
    //   type: "card",
    //   card: cardElement,
    // });

    // // or confirmCardPayment - https://stripe.com/docs/js/payment_intents/confirm_card_payment
    // stripe.confirmCardPayment(paymentIntentClientSecret, {
    //   payment_method: {
    //     card: cardElement,
    //   },
    // });
  }

  return (
    <>
      <h5>Your information:</h5>
      <hr />
      <MaterialForm>
        <FormControl style={{ display: "flex" }}>
          <div style={{ flex: "0.90", marginRight: 10, marginBottom: 10 }}>
            <TextField
              name="address"
              label="Address"
              variant="outlined"
              onChange={onChange}
            />
          </div>
        </FormControl>
        <FormControl style={{ display: "flex" }}>
          <div style={{ flex: "0.65", marginRight: "6%", marginBottom: 10 }}>
            <TextField
              name="city"
              label="City"
              variant="outlined"
              onChange={onChange}
            />
          </div>
          <div style={{ flex: "0.25", marginRight: 0, marginBottom: 10 }}>
            <TextField
              name="state"
              label="State"
              variant="outlined"
              onChange={onChange}
            />
          </div>
        </FormControl>

        <CardSection
          data={data}
          stripeError={error}
          submitOrder={submitOrder}
          loading={loading}
        />
      </MaterialForm>
      <style jsx global>
        {`
          // .paper {
          //   border: 1px solid lightgray;
          //   box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
          //     0px 1px 1px 0px rgba(0, 0, 0, 0.14),
          //     0px 2px 1px -1px rgba(0, 0, 0, 0.12);
          //   height: 550px;
          //   padding: 30px;
          //   background: #fff;
          //   border-radius: 6px;
          //   margin-top: 90px;
          // }
          .form-half {
            flex: 0.5;
          }
          * {
            box-sizing: border-box;
          }
          body,
          html {
            background-color: #f6f9fc;
            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
          }
          h1 {
            font-weight: 400;
            line-height: 50px;
            font-size: 40px;
            margin: 20px 0;
            padding: 0;
          }
          .Checkout {
            margin: 0 auto;
            max-width: 800px;
            box-sizing: border-box;
            padding: 0 5px;
          }
          label {
            font-weight: 300;
            letter-spacing: 0.025em;
          }
          button {
            white-space: nowrap;
            border: 0;
            outline: 0;
            display: inline-block;
            height: 40px;
            line-height: 40px;
            padding: 0 14px;

            border-radius: 4px;
            font-size: 15px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.025em;
            text-decoration: none;
            -webkit-transition: all 150ms ease;
            transition: all 150ms ease;
            margin-top: 10px;
          }
          form {
            margin-bottom: 40px;
            padding-bottom: 40px;
          }
          button:hover {
            cursor: pointer;
            transform: translateY(-1px);
          }
          input,
          .StripeElement {
            display: block;
            margin: 10px 0 20px 0;
            max-width: 500px;
            padding: 10px 14px;
            font-size: 1em;
            font-family: "Source Code Pro", monospace;
            border: 0;
            outline: 0;
            border-radius: 4px;
          }

          input:focus,
          .StripeElement--focus {
            -webkit-transition: all 150ms ease;
            transition: all 150ms ease;
          }
          .StripeElement.IdealBankElement,
          .StripeElement.PaymentRequestButton {
            padding: 0;
          }
        `}
      </style>
    </>
  );
}
export default TestCheckoutForm;

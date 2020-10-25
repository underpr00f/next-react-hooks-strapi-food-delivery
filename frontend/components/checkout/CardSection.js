/* components/Checkout/cardsection.js */

import React from "react";
import { FuncButton } from "../../MUI/Atoms/SubmitButton";
import { CardElement } from "@stripe/react-stripe-js";

function CardSection(props) {
  return (
    <div>
      <div>
        <label htmlFor="card-element">Credit or debit card</label>

        <div>
          <fieldset style={{ border: "none" }}>
            <div className="form-row">
              <div id="card-element" style={{ width: "100%" }}>
                <CardElement
                  options={{
                    style: { width: "100%", base: { fontSize: "18px" } }
                  }}
                />
              </div>
              <br />

              <FuncButton
                text={"Confirm order"}
                variant="text"
                typeBtn={"button"}
                loading={props.loading}
                funcBtn={props.submitOrder}
              />
              {props.stripeError ? (
                <div>{props.stripeError.toString()}</div>
              ) : null}
              <div id="card-errors" role="alert" />
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
}
export default CardSection;

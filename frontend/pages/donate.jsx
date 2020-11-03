/* /pages/restaurants.js */
import React from "react";
import { useForm } from "react-hook-form";
// import { useContext } from "react";
import MyOrdersPage from "../components/MyOrdersPage";
// import AppContext from "../../../context/AppContext";
// import {errorSlugChecker} from "../../../utils/errorChecker";
// import { API_URL } from "../../../utils/constants";
import { RenderField } from "../MUI/Atoms/RenderField";
import { MaterialForm } from "../MUI/Organisms/MaterialForm";
import { FuncButton } from "../MUI/Atoms/SubmitButton";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({}));
export default function Donate() {
  const classes = useStyles();
  const { register, handleSubmit, reset, errors } = useForm();

  return (
    <>
      <h1>Donate Page</h1>
      <Grid container>
        <Grid item xs={12}>
          <MaterialForm>
            <div className={classes.form}>
              <RenderField
                validationType={register({
                  required: true,
                  minLength: 3
                })}
                shortName="Your name"
                nameType="identifier"
                focusField={true}
                errors={errors}
              />
              <RenderField
                validationType={register({
                  required: true,
                  minLength: 3
                })}
                shortName="Your text"
                nameType="identifier"
                focusField={true}
                errors={errors}
              />
              <RenderField
                validationType={register({
                  required: true,
                  minLength: 3
                })}
                shortName="Total donate"
                nameType="amount"
                // id="amount"
                focusField={true}
                errors={errors}
              />
              <FuncButton text={"Next"} />
            </div>
          </MaterialForm>
          <h4>Payment type</h4>
          <form
            method="POST"
            action="https://money.yandex.ru/quickpay/confirm.xml"
          >
            <input type="hidden" name="receiver" value="41001xxxxxxxxxxxx" />
            <input
              type="hidden"
              name="formcomment"
              value="‘Ironman’ Project: Arc Reactor"
            />
            <input
              type="hidden"
              name="short-dest"
              value="‘Ironman’ Project: Arc Reactor"
            />
            <input type="hidden" name="label" value="$order_id" />
            <input type="hidden" name="quickpay-form" value="donate" />
            <input
              type="hidden"
              name="targets"
              value="transaction {order_id}"
            />
            <input
              type="hidden"
              name="sum"
              value="4568.25"
              data-type="number"
            />
            <input
              type="hidden"
              name="comment"
              value="Requires remote control."
            />
            {/* <input type="hidden" name="need-fio" value="true" />
            <input type="hidden" name="need-email" value="true" />
            <input type="hidden" name="need-phone" value="false" />
            <input type="hidden" name="need-address" value="false" /> */}
            <label>
              <input type="radio" name="paymentType" value="PC" />
              YooMoney
            </label>{" "}
            <label>
              <input type="radio" name="paymentType" value="AC" />
              With bank card
            </label>{" "}
            <input type="submit" value="Transfer" />
          </form>
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

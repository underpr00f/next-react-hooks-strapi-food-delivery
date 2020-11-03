/* /components/Checkout/CheckoutForm.js */

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MuiDonateBtn } from "../../MUI/Molecules/MuiDonateBtn";
import { manageDonate } from "../../utils/donateUtils";
import Button from "@material-ui/core/Button";
import { LoaderContent } from "../../MUI/Atoms/Loaders/LoaderContent";

export const DonateBtn = ({
  activeStep,
  isLastStep,
  handleBack,
  handleNext,
  handleSubmit
}) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [newValues, setNewValues] = useState({});
  useEffect(() => {
    if (submitted && !loading) {
      handleNext(newValues);
    }
    return () => {};
  }, [loading, submitted, newValues]);

  const onSubmit = async (values) => {
    // console.log("values", values);
    setLoading(true);
    setNewValues(values);
    const response = await manageDonate(values);
    if (response) {
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
    setLoading(false);
  };
  return (
    <>
      <MuiDonateBtn>
        {" "}
        {activeStep !== 0 && (
          <Button
            onClick={() => handleBack()}
            // type="submit"
          >
            Back
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          // onClick={() => handleNext()}
          onClick={handleSubmit(onSubmit)}
          // type="submit"
        >
          {loading ? <LoaderContent /> : isLastStep ? "Place order" : "Next"}
        </Button>
      </MuiDonateBtn>
    </>
  );
};

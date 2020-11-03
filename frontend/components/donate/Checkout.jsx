import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { getLastDonate } from "../../utils/donateUtils";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

const steps = ["Shipping address", "Payment details", "Review your order"];

export default function Checkout() {
  const classes = useStyles();

  const [formValues, setFormValues] = useState({});

  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const getInitialState = await getLastDonate();
      if (getInitialState) {
        setFormValues({ message: getInitialState.message });
      }
    }
    fetchData();
    console.log(formValues);
    return () => {};
  }, []);
  const handleNext = (newValues) => {
    setFormValues({ ...formValues, ...newValues });
    setActiveStep(activeStep + 1);
    // handleSubmit(onSubmit)(e);
    // setFormValues({ ...formValues, ...newValues });
  };

  const handleBack = (newValues) => {
    setFormValues({ ...formValues, ...newValues });
    setActiveStep(activeStep - 1);
    // handleSubmit((e) => console.log(e));
    // console.log(activeStep, e);
  };
  function getStepContent(step) {
    const isLastStep = activeStep === steps.length - 1;
    switch (step) {
      case 0:
        return (
          <AddressForm
            {...formValues}
            activeStep={activeStep}
            isLastStep={isLastStep}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        );
      case 1:
        return (
          <PaymentForm
            {...formValues}
            activeStep={activeStep}
            isLastStep={isLastStep}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        );
      case 2:
        return (
          <Review
            {...formValues}
            activeStep={activeStep}
            isLastStep={isLastStep}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }
  console.log("Checkoutformvalues", formValues);
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}

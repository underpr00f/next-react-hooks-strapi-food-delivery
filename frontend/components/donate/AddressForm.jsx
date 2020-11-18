import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import { DonateBtn } from './DonateBtn'
import { ControllerField } from '../../MUI/Atoms/ControllerField'

export default function AddressForm({
  message,
  activeStep,
  isLastStep,
  handleBack,
  handleNext
}) {
  const { register, handleSubmit, errors, setValue, control } = useForm()
  const [messageNew, setMessageNew] = useState('')
  useEffect(() => {
    if (message) {
      setMessageNew(message)
      setValue('message', message)
    }
    return () => { }
  }, [message])
  // const updateUserName = (e) => {
  //   console.log(e.target.value);
  //   setUserName(e.target.value);
  // };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <form onSubmit={handleSubmit()}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <ControllerField
              control={control}
              register={register}
              errors={errors}
              dataField={messageNew}
              shortName="Your message"
              nameType="message"
              focusField={true}
              validationTypeObj={{
                required: true,
                minLength: 3
              }}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid> */}
        </Grid>
        <DonateBtn
          activeStep={activeStep}
          isLastStep={isLastStep}
          handleBack={handleBack}
          handleNext={handleNext}
          handleSubmit={handleSubmit}
        />
      </form>
    </React.Fragment>
  )
}

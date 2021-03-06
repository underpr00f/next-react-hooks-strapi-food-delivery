import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { ControllerField } from '../../MUI/Atoms/ControllerField'
import { DonateBtn } from './DonateBtn'
import { validateNumberInput } from "../../utils/Validators"

export default function PaymentForm({
  message,
  anothermessage,
  amount,
  activeStep,
  isLastStep,
  handleBack,
  handleNext
}) {
  // const { register, handleSubmit, errors, setValue, control } = useForm();
  console.log('Paymentmessage', message)
  const { register, control, handleSubmit, setValue, errors } = useForm()
  const [anothermessageNew, setAnothermessageNew] = useState('')
  const [amountNew, setAmountNew] = useState('2')
  useEffect(() => {
    if (anothermessage) {
      setAnothermessageNew(anothermessage)
      setValue('anothermessage', anothermessage)
    }
    if (amount) {
      setAmountNew(amount)
      setValue('amount', amount)
    }
    return () => { }
  }, [anothermessage, amount])

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <form onSubmit={handleSubmit()}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <ControllerField
              control={control}
              register={register}
              errors={errors}
              dataField={anothermessageNew}
              shortName="Another message"
              nameType="anothermessage"
              focusField={true}
              validationTypeObj={{
                required: true,
                minLength: 3
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ControllerField
              control={control}
              register={register}
              errors={errors}
              dataField={amountNew}
              shortName="Your Donate"
              nameType="amount"
              validationTypeObj={{
                required: true,
                maxLength: 6,
                validate: validateNumberInput
              }}
            />
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardName"
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardNumber"
              label="Card number"
              fullWidth
              autoComplete="cc-number"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="expDate"
              label="Expiry date"
              fullWidth
              autoComplete="cc-exp"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cvv"
              label="CVV"
              helperText="Last three digits on signature strip"
              fullWidth
              autoComplete="cc-csc"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveCard" value="yes" />
              }
              label="Remember credit card details for next time"
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
    </>
  )
}

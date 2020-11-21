/* /components/Checkout/CheckoutForm.js */
import React, { useState, useEffect } from 'react'

import Cookie from 'js-cookie'
import { MuiDonateBtn } from '../../MUI/Molecules/MuiDonateBtn'
import { manageDonate } from '../../utils/donateUtils'
import Button from '@material-ui/core/Button'
import { LoaderContent } from '../../MUI/Atoms/Loaders/LoaderContent'

export const DonateBtn = ({
  activeStep,
  isLastStep,
  handleBack,
  handleNext,
  handleSubmit
}) => {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [newValues, setNewValues] = useState({})
  useEffect(() => {
    if (submitted && !loading) {
      handleNext(newValues)
    }
    return () => { }
  }, [loading, submitted, newValues])

  const onSubmit = async (values) => {
    console.log(values)
    const token = Cookie.get('token')
    setLoading(true)
    const response = await manageDonate(token, values)
    if (response) {
      setNewValues({ ...values, order_id: response.order_id })
      setSubmitted(true)
    } else {
      setNewValues(values)
      setSubmitted(false)
    }
    setLoading(false)
  }
  return (
    <>
      <MuiDonateBtn>
        {' '}
        {activeStep !== 0 && (
          <Button
            onClick={() => handleBack()}
          >
            Back
          </Button>
        )}
        {isLastStep ?
          <Button
            variant="contained"
            color="primary"
            value="Transfer"
            type="submit"
          >
            {loading ? <LoaderContent /> : 'Place order'}
          </Button>
          :
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            {loading ? <LoaderContent /> : 'Next'}
          </Button>
        }
      </MuiDonateBtn>
    </>
  )
}

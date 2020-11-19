import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'
import { DonateBtn } from './DonateBtn'
import { YANDEX_WALLET_ID } from "../../utils/constants"

const products = [
  { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
  { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
  { name: 'Product 3', desc: 'Something else', price: '$6.51' },
  { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
  { name: 'Shipping', desc: '', price: 'Free' }
]
const addresses = [
  '1 Material-UI Drive',
  'Reactville',
  'Anytown',
  '99999',
  'USA'
]
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' }
]

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: 700
  },
  title: {
    marginTop: theme.spacing(2)
  }
}))

export default function Review({
  message,
  anothermessage,
  amount,
  order_id,
  activeStep,
  isLastStep,
  handleBack,
  handleNext
}) {
  // const messages = [...message, anothermessage];
  const classes = useStyles()
  const { register, control, handleSubmit, setValue, errors } = useForm()
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        <ListItem className={classes.listItem}>
          <ListItemText secondary="Donate ID" />
          <Typography variant="subtitle1" className={classes.total}>
            {order_id}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText secondary="Message" />
          <Typography variant="subtitle1" className={classes.total}>
            {message}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText secondary="Another Message" />
          <Typography variant="subtitle1" className={classes.total}>
            {anothermessage}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText secondary="Donate Sum" />
          <Typography variant="subtitle1" className={classes.total}>
            {amount}
          </Typography>
        </ListItem>
      </List>
      <h4>Payment type</h4>
      <form
        method="POST"
        action="https://money.yandex.ru/quickpay/confirm.xml"
      // onSubmit={handleSubmit()}
      >
        <input type="hidden" name="receiver" value={YANDEX_WALLET_ID || ''} />
        <input
          type="hidden"
          name="formcomment"
          value={message || ''}
        />
        <input
          type="hidden"
          name="short-dest"
          value={anothermessage || ''}
        />
        <input type="hidden" name="label" value={order_id || ""} />
        <input type="hidden" name="quickpay-form" value="donate" />
        <input type="hidden" name="targets" value={`Перевод за заказ №${order_id}`} />
        <input type="hidden" name="sum" value={amount || '0'} data-type="number" />
        <input type="hidden" name="comment" value="Requires remote control." />
        {/* <input type="hidden" name="need-fio" value="true" />
            <input type="hidden" name="need-email" value="true" />
            <input type="hidden" name="need-phone" value="false" />
            <input type="hidden" name="need-address" value="false" /> */}
        <label>
          <input type="radio" name="paymentType" value="PC" />
          YooMoney
        </label>{' '}
        <label>
          <input type="radio" name="paymentType" value="AC" />
          With bank card
        </label>{' '}
        <input type="submit" value="Transfer" />
      </form>
      {/* {products.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid> */}
      <DonateBtn
        activeStep={activeStep}
        isLastStep={isLastStep}
        handleBack={handleBack}
        handleNext={handleNext}
        handleSubmit={handleSubmit}
      />
    </React.Fragment>
  )
}

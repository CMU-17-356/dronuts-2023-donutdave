import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import AddressInfo from '../types/AddressInfo';
import PaymentInfo from '../types/PaymentInfo';
import useProductArray from './useProductArray';
import CheckoutInfo from '../types/CheckoutInfo';
import { Box, Button } from '@mui/material';
import getCountsTitle from './getCountsTitle';

type ReviewProps = {
  addressInfo : AddressInfo
  paymentInfo : PaymentInfo
  handleNext : (checkoutInfo : CheckoutInfo) => void
  handleBack : () => void
}

export default function Review(props : ReviewProps) {
  const {products, totalPrice, numInArray, getUniqueProducts } = useProductArray('cart')
  const payments = [
    { name: 'Card holder', detail: props.paymentInfo.name },
    { name: 'Card number', detail: props.paymentInfo.cardNumber },
    { name: 'Expiry date', detail: props.paymentInfo.expDate },
  ];
  const joinedAddress = [props.addressInfo.address, props.addressInfo.city,
    props.addressInfo.state, props.addressInfo.zip].join(', ')
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {getUniqueProducts().map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} />
            <Typography variant="body2">{(product.price * numInArray(product.id)).toFixed(2)}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {totalPrice().toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{props.paymentInfo.name}</Typography>
          <Typography gutterBottom>{joinedAddress}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={props.handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={() => props.handleNext({cart: getCountsTitle(products), address: joinedAddress, credit_card : props.paymentInfo.cardNumber})}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Submit Order
                </Button>
        </Box>
      </Grid>
    </React.Fragment>
  );
}
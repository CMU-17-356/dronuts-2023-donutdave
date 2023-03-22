import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Button } from '@mui/material';
import PaymentInfo from '../types/PaymentInfo';


type PaymentFormProps = {
  handleNext : (paymentInfo : PaymentInfo) => void;
  handleBack : () => void;
}

export default function PaymentForm(props : PaymentFormProps) {
  const [name, setName] = React.useState("")
  const [cardNumber, setCardNumber] = React.useState("")
  const [expDate, setExpDate] = React.useState("")
  const [cvv, setCvv] = React.useState("")
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            onChange={(e) => {
              setCardNumber(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            onChange={(e) => {
              setExpDate(e.target.value);
            }}
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
            variant="standard"
            onChange={(e) => {
              setCvv(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
        <Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={props.handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={() => props.handleNext({name, cardNumber, expDate, cvv})}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Next
                </Button>
        </Box>
        </Grid>

      </Grid>
    </React.Fragment>
  );
}
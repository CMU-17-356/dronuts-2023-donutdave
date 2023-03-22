import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from '../components/AddressForm';
import PaymentForm from '../components/PaymentForm';
import Review from '../components/Review';
import AddressInfo from '../types/AddressInfo';
import PaymentInfo from '../types/PaymentInfo';
import CheckoutInfo from '../types/CheckoutInfo';
import { useNavigate } from 'react-router-dom';
import useProductArray from '../components/useProductArray';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center"> 
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Donut Dave
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];

const theme = createTheme({
  palette: {
    primary: {
      main: '#EF72AC',
      contrastText: '#FBF5F3',
    },
  },
});

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [addressInfo, setAddressInfo] = React.useState({firstName : "", lastName : "", address: "", city: "",
                                                        state: "", zip : "", country: ""} as AddressInfo);
  const [paymentInfo, setPaymentInfo] = React.useState({name : "", cardNumber : "", expDate: "", cvv: ""} as PaymentInfo);
  const [orderID, setOrderID] = React.useState("")
  const handleAddress = (addressInfo : AddressInfo) => {
    if (Object.values(addressInfo).find((val) => val === "") === undefined) {
      setAddressInfo(addressInfo)
      setActiveStep(activeStep + 1);
    }
  }
  const handlePayment = (paymentInfo : PaymentInfo) => {
    if (Object.values(paymentInfo).find((val) => val === "") === undefined) {
      setPaymentInfo(paymentInfo)
      setActiveStep(activeStep + 1);
    }
  }
  const { setProducts } = useProductArray('cart')
  const handleCheckout = (checkoutInfo : CheckoutInfo) => {
    fetch('https://dronuts-backend.fly.dev/api/users/dave/checkout', {
      method: "POST",

      body: JSON.stringify(checkoutInfo),
      
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      },
    })
    .then(res => res.json())
    .then(json => {
      setOrderID(json.transaction_id)
      setActiveStep(activeStep + 1)
      setProducts([])
    })
    .catch(err => {
      console.error(err)
    });
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const navigate = useNavigate();
  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm handleNext={handleAddress} handleBack={() => navigate('/customer')}/>;
      case 1:
        return <PaymentForm handleNext={handlePayment} handleBack={handleBack}/>;
      case 2:
        return <Review addressInfo={addressInfo} paymentInfo={paymentInfo} handleNext={handleCheckout} handleBack={handleBack}/>;
      default:
        throw new Error('Unknown step');
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="primary"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Donut Dave
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }}}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                {`Your order ID is ${orderID}. We will send you an update when your order is airborne.`}
              </Typography>
              <Button
                  variant="contained"
                  onClick={() => navigate('/customer')}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Return to Menu
                </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DonutCard from '../components/DonutCard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import Cart from '../components/Cart';
import Product from '../components/Product';
import CartModal from '../components/CartModal';
import useProductArray from '../components/useProductArray';

type CustomerPageProps = {}

const theme = createTheme({
  palette: {
    primary: {
      main: '#EF72AC',
      contrastText: '#FBF5F3',
    },
  },
});

function CustomerPage (props : CustomerPageProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const initCart = new Cart([])
  const [cart, setCart] = useState(initCart);
  const addToCart = function (product : Product) {
    setCart(cart.addProduct(product))
  }
  const removeFromCart = function (product : Product) {
    setCart(cart.removeProduct(product))
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Link to="/customer"> <Button >Customer Page</Button></Link>
        <Link to="/employee"> <Button >Employee Page</Button></Link>
        <Link to="/signup"> <Button >Sign Up</Button></Link>
        <Link to="/checkout"> <Button >Checkout</Button></Link>
        <Link to="/merchant"> <Button >Merchant</Button></Link>
        <IconButton onClick={handleOpen}>
          <ShoppingCartIcon />
        </IconButton>
        <CartModal open={open} handleClose={handleClose} products={cartProducts} getTotal={totalPrice}/>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
                {props.products.map(function (product) {
                  return (
                  <DonutCard 
                    height='30%' 
                    width = '25%' 
                    padding='0px' 
                    margin='30px' 
                    product= {product}
                    addToCart= {pushProduct}
                    removeFromCart= {removeProduct}
                    numInArray={numInArray}
                    key={product.name}
                  />)
                })}
          </Grid> 
        </Container>
    </ThemeProvider>
  );
   
};

export default CustomerPage;


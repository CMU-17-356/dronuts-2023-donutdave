import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DonutCard from '../components/DonutCard';

type CustomerPageProps = {}

const theme = createTheme();

function CustomerPage (props : CustomerPageProps) {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Link to="/customer"> <Button >Customer Page</Button></Link>
        <Link to="/signup"> <Button >Sign Up</Button></Link>
        <Link to="/checkout"> <Button >Checkout</Button></Link>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {/* {nums.map((n) => ( 
              <Grid item key={n} xs={12} sm={6} md={4}> */}
                <DonutCard 
                  height='30%' 
                  width = '25%' 
                  padding='0px' 
                  margin='30px' 
                  image='/apple_krumb.jpg' 
                  name='Apple Krumb' 
                  description='Delicious. Creamy. Irresitable.'
                />
                <DonutCard 
                  height='30%' 
                  width = '25%' 
                  padding='0px' 
                  margin='30px' 
                  image='/chocolate_glaze.jpg' 
                  name='Chocolate Glaze' 
                  description='Chocolate Galore'
                />
                <DonutCard 
                  height='30%' 
                  width = '25%' 
                  padding='0px' 
                  margin='30px' 
                  image='/bavarian_kreme-1.jpg' 
                  name='Bavarian Kreme' 
                  description='Delicious. Kreamy. Irresitable.'
                />
                <DonutCard 
                  height='30%' 
                  width = '25%' 
                  padding='0px' 
                  margin='30px' 
                  image='/blueberry.jpg' 
                  name='Blueberry' 
                  description='Fresh blueberries!'
                />
                <DonutCard 
                  height='30%' 
                  width = '25%' 
                  padding='0px' 
                  margin='30px' 
                  image='/boston_kreme.jpg' 
                  name='Boston Kreme' 
                  description='Donut made in Pittsburgh not Boston.'
                />
                <DonutCard 
                  height='30%' 
                  width = '25%' 
                  padding='0px' 
                  margin='30px' 
                  image='/chocolate_frosted.jpg' 
                  name='Chocolate Frosted' 
                  description='Chocolate AND Frosted'
                />
          </Grid> 
        </Container>
    </ThemeProvider>
  );
   
};

export default CustomerPage;


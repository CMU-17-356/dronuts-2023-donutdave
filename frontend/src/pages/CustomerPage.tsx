import { Link } from 'react-router-dom';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button,  { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { purple } from '@mui/material/colors';

// import Link from '@mui/material/Link';

import { createTheme, ThemeProvider } from '@mui/material/styles';

type CustomerPageProps = {}
  
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      {/* <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '} */}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = ["./apple_krumb.jpg", "./bavarian_kreme.jpg"];
const nums = [1,2,3];


const theme = createTheme();


function CustomerPage (props : CustomerPageProps) {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

        <Link to="/employee"> <Button >Employee Page</Button></Link>
        <Link to="/customer"> <Button >Customer Page</Button></Link>
        <Link to="/signup"> <Button >Sign Up</Button></Link>

      <main>
      
        <Container sx={{ py: 8 }} maxWidth="md">
        <Typography gutterBottom variant="h5" component="h2">
                      Past Orders
          </Typography>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {nums.map((n) => ( 
              <Grid item key={n} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '0.25%',
                    }}
                    image={require("./apple_krumb.jpg")}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    Apple Krumb
                    </Typography>
                    <Typography>
                      Delicious. Creamy. Irresitable.
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <Link to="/donut"><Button size="small">Order Again</Button></Link>
                    
                  </CardActions>
                </Card>
                {/* <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '0.25%',
                    }}
                    image={require("./bavarian_kreme.jpg")}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card> */}
               </Grid>
            ))}
          </Grid> 
        </Container>
      </main>
      
    </ThemeProvider>
  );
    // return (
    //     <div >
    //         <p>This is the customer view.</p>
    //         <p>
    //             <Link to="/">Go to the Home Page!</Link>
    //         </p>
    //         <div style={{display: 'flex', justifyContent: 'center', padding: 30}}>
    //           <table>
    //             <tr>
    //               <th>Past Orders</th>
    //             </tr>
    //             <tr>
    //             </tr>
    //             <tr>
    //               <td>Order 1202</td>
    //             </tr>
    //             <tr>
    //               <td>Order 1203</td>
    //             </tr>
    //           </table>

            

    //         </div>
    //         <table>
    //             <tr>
    //               <th>Popular Donuts</th>
    //             </tr>
    //             <tr>
    //             </tr>
    //             <tr>
    //             <td><Link to="/donut">Glazed Donut</Link></td>
    //             </tr>
    //             <tr>
    //               <td>Rainbow Sprinkles</td>
    //             </tr>
    //             <tr>
    //               <td>Apple Krumb</td>
    //             </tr>
    //             <tr>
    //               <td>Bavarian Kreme</td>
    //             </tr>
    //             <tr>
    //               <td>Blueberry</td>
    //             </tr>
    //             <tr>
    //               <td>Boston Kreme</td>
    //             </tr>
    //           </table>
    //     </div>
    // );
};

export default CustomerPage;


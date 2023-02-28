import { Link } from 'react-router-dom';
import * as React from 'react';
import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


// import Link from '@mui/material/Link';

import { createTheme, ThemeProvider } from '@mui/material/styles';

type CustomerPageProps = {}
  



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
          <Grid container spacing={4}>
            {/* {nums.map((n) => ( 
              <Grid item key={n} xs={12} sm={6} md={4}> */}
                <Card
                  sx={{ height: '30%', width: '25%', display: 'inline-block', flexDirection: 'column', padding: '0px', margin: '30px' }}
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
                  <Link to="/donut"><Button size="small">Order</Button></Link>
                    
                  </CardActions>
                </Card>
                <Card
                  sx={{ height: '40%', width: '28%', display: 'inline-block', flexDirection: 'column', padding: '0px', margin: '30px'  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '0.25%',
                    }} 
                    image={require("./chocolate_glaze.jpg")}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    Chocolate Glaze
                    </Typography>
                    <Typography>
                      Chocolate Galore
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <Link to="/donut"><Button size="small">Order</Button></Link>
                    
                  </CardActions>
                </Card>

                <Card
                  sx={{ height: '30%', width: '25%', display: 'inline-block', flexDirection: 'column', padding: '0px', margin: '30px'  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '0.25%',
                    }} 
                    image={require("./bavarian_kreme-1.jpg")}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    Bavarian Kreme
                    </Typography>
                    <Typography>
                      Delicious. Kreamy. Irresitable.
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <Link to="/donut"><Button size="small">Order</Button></Link>
                    
                  </CardActions>
                </Card>
               {/* </Grid>
            ))} */}
          </Grid> 
          
        </Container>
        
        <Container sx={{ py: 8 }} maxWidth="md">
        <Typography  variant="h5" component="h2" >
                      New Donuts
          </Typography>
        
          {/* End hero unit */}

          <Grid container spacing={4}>
            {/* {nums.map((n) => ( 
              <Grid item key={n} xs={12} sm={6} md={4}> */}
                <Card
                  sx={{ height: '40%', width: '28%', display: 'inline-block', flexDirection: 'column', padding: '0px', margin: '30px' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '0.25%',
                    }} 
                    image={require("./blueberry.jpg")}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    Blueberry
                    </Typography>
                    <Typography>
                      Fresh blueberries!
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <Link to="/donut"><Button size="small">Order</Button></Link>
                    
                  </CardActions>
                </Card>
                <Card
                  sx={{ height: '30%', width: '25%', display: 'inline-block', flexDirection: 'column', padding: '0px', margin: '30px'  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '0.25%',
                    }} 
                    image={require("./boston_kreme.jpg")}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    Boston Kreme
                    </Typography>
                    <Typography>
                      Donut made in Pittsburgh not Boston.
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <Link to="/donut"><Button size="small">Order</Button></Link>
                    
                  </CardActions>
                </Card>

                <Card
                  sx={{ height: '30%', width: '25%', display: 'inline-block', flexDirection: 'column', padding: '0px', margin: '30px'  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '0.25%',
                    }} 
                    image={require("./chocolate_frosted.jpg")}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    Chocolate Frosted
                    </Typography>
                    <Typography>
                      Chocolate AND Frosted
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <Link to="/donut"><Button size="small">Order</Button></Link>
                    
                  </CardActions>
                </Card>
               {/* </Grid>
            ))} */}
          </Grid> 
        </Container>
      </main>
      
    </ThemeProvider>
  );
   
};

export default CustomerPage;


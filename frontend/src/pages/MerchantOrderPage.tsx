import { Link } from 'react-router-dom';
import React, { FC, useState } from "react";
import Button from '@mui/material/Button';
import { Avatar, Box, Card, CardContent, Container, Divider, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useOrderArray from '../components/ueOrderArray';
import getOrders from '../api/getOrders';
import getSpecificProduct from '../api/getSpecificProduct';

import { useEffect } from "react";
import axios from "axios";
import Product from '../components/Product';


type OrderPageProps = {}

interface Item {
    quantity: number;
    name: string;
}
  
interface Props {
  items: Item[];
}


const theme = createTheme({
    palette: {
      primary: {
        main: '#EF72AC',
        contrastText: '#FBF5F3',
      },
    },
  });

  
function MerchantOrderPage (props : OrderPageProps) {
    
    
const {orders, setOrders} = useOrderArray('orders', []);
const products = new Array<Product>();

    useEffect(() => {
        const fetchData = async function () {
            const fetchedOrders = await getOrders()
            setOrders(fetchedOrders)
      
        }

        fetchData()

    }, [setOrders])


  function fetchProductData (item: Product) {
      return  getSpecificProduct(item.name)
  }



    const p = JSON.stringify(orders)
    console.log(JSON.stringify(orders))
    let empObj =  JSON.parse(p);
    const cartItems = (empObj[0].items)


    for (let i = 0; i < cartItems.length; i++) {
      let l = fetchProductData(cartItems[i])
      console.log(l)
      products.push(l)
  }


    return (
        <ThemeProvider theme={theme}>
        <Box mt={2} display="flex">
            <Box flex="1">
                <Card>
                    <CardContent>
                        <Box display="flex" mb={1}>
                            <Box ml={2} flex="1">
                              
                                <Typography variant="h5">
                                    Order Status: {empObj[0].status}

                                </Typography>
                                <Typography variant="body2">
                                <ListItem  >
                            <ListItemAvatar>
                                <Avatar />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`Username: ` +  empObj[0].username}
                                secondary={empObj[0].address}
                            />
                            
                        </ListItem> 
            <Container maxWidth="md">
      <h2 style={{ textAlign: "center" }}>Invoice</h2>
      
      {cartItems.map((item:any) => (
          <ListItem key={item.title} >
             <ListItemText primary={item.title} />
          <ListItemText primary={item.quantity} />
          {/* <ListItemText primary={fetchProductData(item).} /> <- THIS IS WHERE THE PRICE OF EACH OBJECT SHOULD GO*/}
          

            {/* <Typography variant="body2">{product.price}</Typography> */}
          </ListItem>
        ))}
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            {/* <TableHead>
              <TableRow>
                <TableCell>{cartItems}</TableCell>
                <TableCell align="right">
                  {Object.keys(cartItems)}
                </TableCell>
                <TableCell align="right">
                  {Object.keys(cartItems)}
                </TableCell>
                <TableCell align="right">
                  {Object.keys(cartItems)}
                </TableCell>
              </TableRow>
            </TableHead> */}

            <TableBody>
              {cartItems
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .filter((item:any) => item.totals > 0)
                // .sort((a:any, b:any) => (a.title > b.title ? 1 : -1))
                .map((item:any) => {
                  return (
                    <TableRow key={item.title}>
                      <TableCell>{item.title}</TableCell>
                      <TableCell align="right">{item.quantity} </TableCell>
                      <TableCell align="right">
                        {" "}
                        {(item.price * 0.84).toFixed(2)}{" "}
                      </TableCell>
                      <TableCell align="right">
                        {(item.totals * 0.84).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="right">
                  <strong>Total Amount in USD</strong>
                </TableCell>
                <TableCell align="right">
                  {cartItems
                    .map((item:any) => item.totals * 0.84)
                    .reduce((acc:any, value:any) => acc + value)
                    // .toFixed(2)}
                  }
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[5, 25, 100]}
          component="div"
          count={invoiceItems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </Container>
            
                                </Typography>
                            </Box>
                        </Box>
                        <Button
            color="primary"
            variant="contained"
            size="small"
            style={{margin: '0 auto', display: "flex"}}
        >
            Send Drone
        </Button>
                    </CardContent>
                </Card>
                
            </Box>
           
        </Box>
        </ThemeProvider>
    );
};

export default MerchantOrderPage;
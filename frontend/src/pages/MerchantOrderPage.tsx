import { Link } from 'react-router-dom';
import React, { FC, useState } from "react";
import Button from '@mui/material/Button';
import { Avatar, Box, Card, CardContent, Container, Divider, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

type OrderPageProps = {}

interface Item {
    quantity: number;
    name: string;
}
  
interface Props {
  items: Item[];
}

const ItemList: FC<Props> = ({ items }) => {
  return (
    <table>
      <tr>
          <th style={{display: 'flex'}}>Donut</th>
          <th>Quantity</th>
      </tr>
      {items.map((item) => (
        <tr >
          <td>{item.name}</td>
          <td>{item.quantity}</td>
        </tr>
      ))}
    </table>
  );
};

const theme = createTheme({
    palette: {
      primary: {
        main: '#EF72AC',
        contrastText: '#FBF5F3',
      },
    },
  });

  
function MerchantOrderPage (props : OrderPageProps) {
    const invoiceItems = [
        {
          qty: 1,
          price: 84.99,
          subtotal: 84.99,
          currency: "USD",
          name: "Gaming Headset"
        },
        {
          qty: 2,
          price: 99.99,
          subtotal: 199.98,
          currency: "USD",
          name: "Gaming Controller"
        },
        {
          qty: 1,
          price: 19.99,
          subtotal: 19.99,
          currency: "USD",
          name: "USB PowerPort"
        },
        {
          qty: 5,
          price: 5.08,
          subtotal: 25.4,
          currency: "USD",
          name: "Smartphone Screen Protector"
        },
        {
          qty: 3,
          price: 17.99,
          subtotal: 53.97,
          currency: "USD",
          name: "V-Neck T-Shirt"
        },
        {
          qty: 1,
          price: 33.96,
          subtotal: 33.96,
          currency: "USD",
          name: "Night Vision Binoculars"
        },
        {
          qty: 0,
          price: 8.49,
          subtotal: 0,
          currency: "USD",
          name: "USB Car Charger"
        },
        {
          qty: 1,
          price: 79.99,
          subtotal: 79.99,
          currency: "USD",
          name: "Car Dash Cam"
        },
        { qty: 0, price: 11.44, subtotal: 0, currency: "USD", name: "Sunglasses" },
        {
          qty: 1,
          price: 21.99,
          subtotal: 21.99,
          currency: "USD",
          name: "Leather Belt"
        }
      ];
    
// const Order = fetch('https://356-credit-api.fly.dev/api/order/', {
//   method: 'GET',
// })
// .catch(err => {
//   console.error(err)
// });
// console.log(Order);

    return (
        <ThemeProvider theme={theme}>
        <Box mt={2} display="flex">
            <Box flex="1">
                <Card>
                    <CardContent>
                        <Box display="flex" mb={1}>
                            <Box ml={2} flex="1">
                              
                                <Typography variant="h5">
                                    Order Status: 

                                </Typography>
                                <Typography variant="body2">
                                <ListItem  >
                            <ListItemAvatar>
                                <Avatar />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`Username`}
                                secondary={`5000 Forbes Avenue SMC 5490 Pittsburgh, PA 15213`}
                            />
                            
                        </ListItem> 
            <Container maxWidth="md">
      <h2 style={{ textAlign: "center" }}>Invoice</h2>
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>{Object.keys(invoiceItems[0])[4]}</TableCell>
                <TableCell align="right">
                  {Object.keys(invoiceItems[0])[0]}
                </TableCell>
                <TableCell align="right">
                  {Object.keys(invoiceItems[0])[1]}
                </TableCell>
                <TableCell align="right">
                  {Object.keys(invoiceItems[0])[2]}
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {invoiceItems
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .filter((item) => item.subtotal > 0)
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((item) => {
                  return (
                    <TableRow key={item.name}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.qty} </TableCell>
                      <TableCell align="right">
                        {" "}
                        {(item.price * 0.84).toFixed(2)}{" "}
                      </TableCell>
                      <TableCell align="right">
                        {(item.subtotal * 0.84).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="right">
                  <strong>Total Amount in EUR</strong>
                </TableCell>
                <TableCell align="right">
                  {invoiceItems
                    .map((item) => item.subtotal * 0.84)
                    .reduce((acc, value) => acc + value)
                    .toFixed(2)}{" "}
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
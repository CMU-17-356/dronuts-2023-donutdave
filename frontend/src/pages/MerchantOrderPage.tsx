import { useParams } from 'react-router-dom';
import { useState } from "react";
import Button from '@mui/material/Button';
import { Avatar, Box, Card, CardContent, Container, ListItem, ListItemAvatar, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getSpecificOrders } from '../api/getOrders';

import { useEffect } from "react";
import Order from '../components/Order';


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
    
  const { id } = useParams();
// const {orders, setOrders} = useOrderArray('orders', []);

const [orders, setOrders] = useState(
  {username : "",
  items: [{
      title: "",
      quantity: 0,
  }],
  transaction_id: "",
  totals : 0,
  address : "" ,   // Delivery address
  status: "" ,     // unpaid -> paid -> sent -> delivered
  id: "string"
  } as Order
);

const [products, setProducts] = useState([['x',1.99]]);


useEffect(() => {
  if (id !== undefined) {
    console.log("use effect")
    const fetchData = async function () {
        const fetchedOrders = await getSpecificOrders(id as string)
        console.log(fetchedOrders, "juui")
        setOrders(fetchedOrders)
    }
    fetchData()
  }

}, [setOrders, id])
const p = JSON.stringify(orders)
console.log(JSON.stringify(orders))
let empObj =  JSON.parse(p);
const cartItems = (empObj.items)

    return (
      <Box>

  
        <ThemeProvider theme={theme}>
        <Box mt={2} display="flex">
            <Box flex="1">
                <Card>
                    <CardContent>
                        <Box display="flex" mb={1}>
                            <Box ml={2} flex="1">
                              
                                <Typography variant="h5" component={'span'}>
                                    Order Status: {empObj.status}

                                </Typography>
                                <Typography variant="body2">
                                <ListItem  >
                            <ListItemAvatar>
                                <Avatar />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`Username: ` +  empObj.username}
                                secondary={empObj.address}
                            />
                            
                        </ListItem> 
            <Container maxWidth="md">
      <h2 style={{ textAlign: "center" }}>Invoice</h2>
      
      {cartItems.map((item:any) => (
          <ListItem key={item.id} >
          <ListItemText id= "itemName" primary={item.title} />
          <ListItemText primary={item.quantity} />
          {/* <p>{(products[0])}</p> */}
          {/* <ListItemText id= "price" primary={"1.99"} />  */}
          

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
                        {( cartItems.length * 0.84).toFixed(2)}
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
                  {
                  empObj.totals
                    // .map((item:any) => cartItems.length * 1.99)
                    // .reduce((acc:any, value:any) => acc + value)
                    .toFixed(2)
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
        </Box>
  );
};

export default MerchantOrderPage;
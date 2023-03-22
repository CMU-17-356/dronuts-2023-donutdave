import * as React from 'react';
import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import {getOrders, getSpecificOrders} from "../api/getOrders";
import CustomerOrder from "./CustomerOrder";
import { Link } from 'react-router-dom';

interface TitleProps {
	children?: React.ReactNode;
}
  
function Title(props: TitleProps) {
return (
	<Typography component="h2" variant="h6" color="primary" gutterBottom>
	{props.children}
	</Typography>
);
}

export default function Orders() {
  const [orders, setOrders] = useState([])
  useEffect(() => {
      const fetchData = async function () {
        //@ts-ignore
          const fetchedOrders = await getOrders()
          setOrders(fetchedOrders)
          console.log(JSON.stringify(fetchedOrders))
      }
      fetchData()
  }, [setOrders])
  console.log(orders)
  return (
    <React.Fragment>
      <Title>Current Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Items</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row : CustomerOrder) => (
            <TableRow key={row.id}>
              <TableCell><Link to= {`/merchant/${row.id}`} > {row.username}</Link></TableCell>
              <TableCell>{row.items.map(item => item.title + " x" + item.quantity + ", ")}</TableCell>
              <TableCell align="right">{`$${row.totals}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
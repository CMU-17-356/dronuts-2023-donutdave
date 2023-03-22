import axios from "axios";
import Product from "../components/Order";

interface OrderResponse {
   username : String,
   items: [{
       title: String,
       quantity: Number,
   }],
   transaction_id: String
   totals : Number,
   address : String    // Delivery address
   status: String      // unpaid -> paid -> sent -> delivered
    _id: string;
  }


  function convertToOrder(json: OrderResponse): Product {
    return {
        username : json.username,
        items: json.items,
        transaction_id: json.transaction_id,
        totals : json.totals,
        address : json.address,    // Delivery address
        status: json.status,  
     
      id: json._id
    };
  }

async function getOrders() {
    // https://dronuts-backend.fly.dev/api/orders
    const orders = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders`)
    const data_array = orders.data.map(convertToOrder);
    console.log("jedwp")
    console.log(data_array)
    return data_array
}

async function getSpecificOrders(id: string) {
  // https://dronuts-backend.fly.dev/api/orders
  const orders = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders/${id}`)
  console.log("orders", orders)
  //@ts-ignore
<<<<<<< HEAD
  const data_array = convertToOrder(orders.data);
=======
  const data_array = convertToOrder(orders);
  console.log("data array", data_array)
>>>>>>> 877a32c (before pulling)
  return data_array
}

export {getOrders, getSpecificOrders}
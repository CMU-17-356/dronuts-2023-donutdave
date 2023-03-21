import axios from "axios";
import CustomerOrder from "../components/CustomerOrder";

interface OrderResponse {
    username: string,
    items: [{
      title: string;
      quantity: number;
    }],
    totals: number,
    address: string,
    transaction_id: string,
    status: string,
  }


function convertToOrder(json: OrderResponse): CustomerOrder {
    return {
      name: json.username,
      id: json.transaction_id,
      items: json.items,
      address: json.address,
      price: json.totals,
    };
  }

async function getOrders() {
    const products = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders`)
    const data_array = products.data.map(convertToOrder);
    return data_array
}

export default getOrders
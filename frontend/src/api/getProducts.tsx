import axios from "axios";
import Product from "../components/Product";

interface ProductResponse {
    image: string;
    title: string;
    display_name: string;
    price: number;
  }


function convertToProduct(json: ProductResponse): Product {
    return {
      name: json.display_name,
      image: json.image,
      price: json.price,
    };
  }

async function getProducts() {
    const products = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`)
    const data_array = products.data.map(convertToProduct);
    return data_array
}

export default getProducts
import axios from "axios";
import Product from "../components/Product";

interface ProductResponse {
    image: string;
    title: string;
    display_name: string;
    price: number;
    _id: string;
  }


<<<<<<< HEAD
  function convertToProduct(json: ProductResponse): Product {
    return {
      name: json.display_name,
      description : json.title,
=======
function convertToProduct(json: ProductResponse): Product {
    return {
      name: json.display_name,
>>>>>>> master
      image: json.image,
      price: json.price,
      id: json._id
    };
  }

async function getProducts() {
    const products = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`)
    const data_array = products.data.map(convertToProduct);
    return data_array
}

<<<<<<< HEAD

=======
>>>>>>> master
export default getProducts
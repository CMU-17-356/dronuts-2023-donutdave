import axios from "axios";
import Product from "../components/Product";

interface ProductResponse {
    image: string;
    title: string;
    display_name: string;
    price: number;
    _id: string;
  }


  function convertToProduct(json: any): Product {
    return {
      name: json.display_name,
      description : json.title,
      image: json.image,
      price: json.price,
      id: json._id
    };
  }

async function getSpecificProducts(name:string) {
    const products = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products/`+name)
    console.log(products.data)
    return products.data
    // returns {image: '', _id: '63fe706e9886852807f775c9', title: 'plain', display_name: 'Plain donut', price: 0.99}
}


export default getSpecificProducts
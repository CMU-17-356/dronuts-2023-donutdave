import { useEffect } from "react";
import getProducts from "../api/getProducts";
import useProductArray from "../components/useProductArray";
import CustomerPage from "./CustomerPage";







function CustomerPageLoader() {

    const {products, setProducts} = useProductArray('products', []);

    useEffect(() => {

        const fetchData = async function () {

            const fetchedProducts = await getProducts()

            setProducts(fetchedProducts)

            console.log(JSON.stringify(fetchedProducts))

        }

        fetchData()

    }, [setProducts])

    return (

        <CustomerPage products={products}/>

    )

}




export default CustomerPageLoader
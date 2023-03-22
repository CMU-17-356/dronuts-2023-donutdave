import useLocalStorageState, { LocalStorageState } from 'use-local-storage-state'
import Product from './Product';

const useProductArray = (key: string, initialArray? : Product[]) => {

  const [products, setProducts] = initialArray ? useLocalStorageState(key, {defaultValue: initialArray}) // eslint-disable-line react-hooks/rules-of-hooks
                                               : useLocalStorageState(key) as LocalStorageState<Product[]> // eslint-disable-line react-hooks/rules-of-hooks

  const handleAddProduct = (product : Product) => {
    setProducts(products.concat([product]))
  };

  const handleRemoveProduct = (id: string) => {
    const removedItem = products.find((product) => product.id === id);
    if (removedItem !== undefined) {
        const removeIndex = products.indexOf(removedItem)
        setProducts(products.slice(0, removeIndex).concat(products.slice(removeIndex+1)));
    }
  };

  const getTotalPrice = () => {
    const floatPrice = products.reduce((total, item) => total + item.price , 0);
    return floatPrice
  };

  const numInArray = (thisID : string) => {
    const notThisProduct = products.filter((product) => product.id === thisID)
    return notThisProduct.length
  }

  function getUniqueProducts () {
    const uniqueProducts = [];
    const map = new Map();
    for (const product of products) {
        if(!map.has(product.id)){
            map.set(product.id, true);    // set any value to Map
            uniqueProducts.push(product);
        }
    }
    return uniqueProducts
  }

  return {
    products,
    pushProduct: handleAddProduct,
    removeProduct: (id: string) => handleRemoveProduct(id),
    totalPrice: getTotalPrice,
    setProducts: setProducts,
    numInArray : numInArray,
    getUniqueProducts
  };
};
 
export default useProductArray;
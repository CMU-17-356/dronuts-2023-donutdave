import useLocalStorageState, { LocalStorageState } from 'use-local-storage-state'
import Order from './Order';

const useOrderArray = (key: string, initialArray? : Order[]) => {

  const [orders, setOrders] = initialArray ? useLocalStorageState(key, {defaultValue: initialArray}) // eslint-disable-line react-hooks/rules-of-hooks
                                               : useLocalStorageState(key) as LocalStorageState<Order[]> // eslint-disable-line react-hooks/rules-of-hooks

  const handleAddOrder= (order : Order) => {
    setOrders(orders.concat([order]))
  };

//   const handleRemoveProduct = (id: string) => {
//     const removedItem = products.find((product) => product.id === id);
//     if (removedItem !== undefined) {
//         const removeIndex = products.indexOf(removedItem)
//         setProducts(products.slice(0, removeIndex).concat(products.slice(removeIndex+1)));
//     }
//   };

//   const getTotalPrice = () => {
//     return orders.reduce((total, item) => total + item.price , 0);
//   };

  const numInArray = (thisID : string) => {
    const notThisProduct = orders.filter((order) => order.id === thisID)
    return notThisProduct.length
  }

  return {
    orders,
    pushOrder: handleAddOrder,
    // removeProduct: (id: string) => handleRemoveProduct(id),
    // totalPrice: getTotalPrice,
    setOrders: setOrders,
    numInArray : numInArray
  };
};

export default useOrderArray;
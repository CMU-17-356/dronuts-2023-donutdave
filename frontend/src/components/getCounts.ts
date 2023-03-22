import Product from "./Product";

interface IObjectKeys {
    [key: string]: number;
  }

function getCounts (products: Product[]) {
    const someObj : IObjectKeys = {}
    const counts = products.reduce(function(obj, product) {
        obj[product.name] = obj[product.name] ? ++obj[product.name] : 1;
        return obj;
    }, someObj);
    return counts
}

export default getCounts
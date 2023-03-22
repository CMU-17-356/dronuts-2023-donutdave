import Product from "./Product";

interface IObjectKeys {
    [key: string]: number;
  }

type DonutInfo = {
    title: string;
    quantity: number;
}
function getCountsTitle (products: Product[]) {
    const someObj : IObjectKeys = {}
    const counts = products.reduce(function(obj, product) {
        obj[product.title] = obj[product.title] ? ++obj[product.title] : 1;
        return obj;
    }, someObj);
    const anotherObj = [] as DonutInfo[]
    const countKeys = Object.keys(counts)
    console.log(countKeys, "countKeys")
    countKeys.forEach((title) => anotherObj.push({title: title, quantity : someObj[title]}))
    return anotherObj
}

export default getCountsTitle
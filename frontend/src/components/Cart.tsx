import Product from "./Product"

interface IObjectKeys {
    [key: string]: number;
  }


class Cart {
    private _products : Product[]

    constructor(products: Product[]) {
        this._products = products
      }

    getTotal() {
        const totalPrice = this._products.reduce((acc, product) => acc + product.price, 0)
        return totalPrice
    }
    getProducts() {
        return this._products
    }
    addProduct(product : Product) {
        this._products.push(product)
        return this
    }
    removeProduct(product : Product) {
        const index = this._products.indexOf(product)
        this._products.splice(index, 1)
        return this
    }
    getCounts() {
        const someObj : IObjectKeys = {}
        const counts = this._products.reduce(function(obj, product) {
            obj[product.name] = obj[product.name] ? ++obj[product.name] : 1;
            return obj;
        }, someObj);
        return counts
    }
}

export default Cart
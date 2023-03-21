import { Product, IProduct } from '../models/product.js'
import { Request, Response } from 'express'

class ProductsController {
  public getProducts = async (req: Request, res: Response) => {
    await Product.find({})
      .then((products: any) => {
        return res.status(200).json(products)
      })
      .catch((err: string) => {
        console.log("getProducts: " + err)
        return res.status(500).json(err)
      });
  }

  public getProductByTitle = async (req: Request, res: Response) => {
    await Product.findOne({title: req.params.title})
      .then((product: any) => {
        if (product) {
          return res.status(200).json(product)
        }
        return res.status(404).json(`Product ${req.params.title} not found`)
      })
      .catch((err: string) => {
        console.log("getProductByTitle: " + err)
        return res.status(500).json(err)
      });
  };
}

export { ProductsController }
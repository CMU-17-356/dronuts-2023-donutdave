import { Product } from '../models/product.js'
import { Request, Response } from 'express'

class ProductsController {
  public getProducts = async (req: Request, res: Response) => {
    await Product.find({})
      .then(products => {
        return res.status(200).json(products)
      })
      .catch(err => {
        console.log("getProducts: " + err)
        return res.status(500).json(err)
      });
  }

  public getProductByTitle = async (req: Request, res: Response) => {
    await Product.findOne({title: req.params.title})
      .then(product => {
        if (product) {
          return res.status(200).json(product)
        }
        return res.status(404).json(`Product ${req.params.title} not found`)
      })
      .catch(err => {
        console.log("getProductByTitle: " + err)
        return res.status(500).json(err)
      });
  };
}

export { ProductsController }
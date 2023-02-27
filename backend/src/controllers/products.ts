import { Product, IProduct } from '../models/product.js'
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

  public getProductByName = async (req: Request, res: Response) => {
    let title = req.params.title
    await Product.findOne({title: title})
      .then(product => {
        if (product) {
          return res.status(200).json(product)
        }
        return res.status(404).json(`Product ${title} not found`)
      })
      .catch(err => {
        console.log("getProductByName: " + err)
        return res.status(500).json(err)
      });
  };
}

export { ProductsController }
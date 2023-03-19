import { Order } from '../models/order.js'
import { Product } from '../models/product.js'
import { Request, Response } from 'express'

class OrdersController {
  public getOrders = async (req: Request, res: Response) => {
    await Order.find({})
      .then(orders => {
        return res.status(200).json(orders)
      })
      .catch(err => {
        console.log("getOrders: " + err)
        return res.status(500).json(err)
      });
  }

  public getOrderById = async (req: Request, res: Response) => {
    await Order.findById(req.params.id)
      .then(order => {
        if (order) {
          return res.status(200).json(order)
        }
        return res.status(404).json(`Order ${req.params.id} not found`)
      })
      .catch(err => {
        console.log("getOrderById: " + err)
        return res.status(500).json(err)
      });
  };

  public calculateTotalPrice = async (req: Request, res: Response) => {
    let isValid = true
    let totals = 0.0
    if (req.body.cart.length) {
      // @ts-ignore
      await Promise.all(req.body.cart.map(async (item) => {
        const product = await Product.findOne({title: item.title});
        if (product) {
          // @ts-ignore
          totals += product.price * item.quantity
        } else {
          isValid = false
        }
        console.log(totals);
      }));
    }

    if (!isValid) {
      return res.status(500).json(`Invalid product in cart`)
    }
    return res.status(200).json({ totals: totals })
  };
}

export { OrdersController }
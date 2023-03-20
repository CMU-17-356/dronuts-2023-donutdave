import { Merchant } from '../models/merchant.js'
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
}

export { OrdersController }
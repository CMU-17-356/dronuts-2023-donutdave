import { Order } from '../models/order.js'
import { Request, Response } from 'express'

class OrdersController {
  public getOrders = async (req: Request, res: Response) => {
    await Order.find({})
      .then((orders: any) => {
        return res.status(200).json(orders)
      })
      .catch((err: string) => {
        console.log("getOrders: " + err)
        return res.status(500).json(err)
      });
  }

  public getOrderById = async (req: Request, res: Response) => {
    await Order.findById(req.params.id)
      .then((order: any) => {
        if (order) {
          return res.status(200).json(order)
        }
        return res.status(404).json(`Order ${req.params.id} not found`)
      })
      .catch((err: string) => {
        console.log("getOrderById: " + err)
        return res.status(500).json(err)
      });
  };
}

export { OrdersController }
import { Order } from '../models/order.js'
import { Request, Response } from 'express'

class OrdersController {
  public getOrders = async (req: Request, res: Response) => {
    if (req.body.status == null) {
      await Order.find({})
        .then(orders => {
          return res.status(200).json(orders)
        })
        .catch(err => {
          console.log("getOrders: " + err)
          return res.status(500).json(err)
        });
    } else {
      const status = req.body.status
      if (status !== "paid" && status !== "sent" && status !== "delivered") {
        return res.status(404).json("Invalid order status")
      }
      await Order.find({ status: status })
        .then(orders => {
          return res.status(200).json(orders)
        })
        .catch(err => {
          console.log("getOrders: " + err)
          return res.status(500).json(err)
        });
    }
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
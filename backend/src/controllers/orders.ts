import { Order } from '../models/order.js'
import { MerchantsController } from './merchants.js'
import { Product } from '../models/product.js'
import { Request, Response } from 'express'

class OrdersController {
  public getOrders = async (req: Request, res: Response) => {
    if (req.query.status == null) {
      await Order.find({})
        .then((orders: any) => {
          return res.status(200).json(orders)
        })
        .catch((err: string) => {
          console.log("getOrders: " + err)
          return res.status(500).json(err)
        });
    } else {
      const status = req.query.status
      if (status !== "paid" && status !== "sent" && status !== "delivered") {
        return res.status(404).json("Invalid order status")
      }
      await Order.find({ status: status })
        .then((orders: any) => {
          return res.status(200).json(orders)
        })
        .catch((err: string) => {
          console.log("getOrders: " + err)
          return res.status(500).json(err)
        });
    }
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
      }));
    }

    if (!isValid) {
      return res.status(500).json(`Invalid product in cart`)
    }
    return res.status(200).json({ totals: totals })
  };

  public assignDroneToOrder = async (req: Request, res: Response) => {
    await Order.findById(req.params.id)
      .then(async (order: any) => {
        if (order) {
          const drone_id = await MerchantsController.getFirstAvailableDrone()
          if (drone_id) {
            return res.status(200).json({ id: drone_id })
          }
          return res.status(403).json("No available drone")
        }
        return res.status(404).json(`Order ${req.params.id} not found`)
      })
      .catch((err: string) => {
        console.log("assignDroneToOrder: " + err)
        return res.status(500).json(err)
      });
  };
}

export { OrdersController }
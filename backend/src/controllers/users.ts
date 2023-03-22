import { User } from '../models/user.js'
import { Order } from '../models/order.js'
import { Product } from '../models/product.js'
import { Metric } from '../models/metrics.js'
import { Request, Response } from 'express'
import { companyID, creditAPI } from '../index.js'
import got from 'got'

class UsersController {
  public getUsers = async (req: Request, res: Response) => {
    User.find({})
      .then(users => {
        return res.status(200).json(users)
      })
      .catch(err => {
        console.log("getUsers: " + err)
        return res.status(500).json(err)
      });
  }
  
  public createUser = async (req: Request, res: Response) => {
    const body = req.body
    
    // validate username uniqueness
    const u = await User.findOne({username: body.username})
    if (u) return res.status(400).json(`Username ${body.username} already existed`)
      
    const user = new User(body)
    user.save()
      .then(() => {
        // update metrics
        if (process.env.NODE_ENV !== "test" && process.env.NODE_ENV !== "deploy_test" && process.env.NODE_ENV !== "development") {
          Metric.findOne({title: "mvp"})
            .then(async (metric) => {
              if (metric) {
                metric.num_accounts += 1
                await metric.save();
              }
            })
        }
        res.status(201).json(`User ${body.username} created successfully`);
      })
      .catch(err => {
        if (err.name === "ValidationError") {
          const errors: {[key: string]: string} = {}
          Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message
          });
        
          return res.status(400).json(errors)
        }
        console.log("createUser: " + err)
        return res.status(500).json("Other errors")
      });
  };
  
  public getUserByUsername = async (req: Request, res: Response) => {
    const name = req.params.username
    User.findOne({username: name})
      .then(user => {
        if (user) {
          return res.status(200).json(user)
        }
        return res.status(404).json(`User ${name} not found`)
      })
      .catch(err => {
        console.log("getUser: " + err)
        return res.status(500).json(err)
      });
  };
  
  public updateUserByUsername = async (req: Request, res: Response) => {
    if (req.body.username) {
      // validate username uniqueness
      const u = await User.findOne({username: req.body.username})
      if (u) return res.status(400).json(`Username ${req.body.username} already existed`)
    }
  
    const name = req.params.username
    const result = await User.findOneAndUpdate({username: req.params.username}, req.body)
      .catch(err => {
        console.log("updateUser: " + err)
        return res.status(500).json(err)
      });
      
      if (result) {
        return res.status(201).json(`User ${name} updated successfully`);
      } else {
        return res.status(404).json(`User ${name} not found`)
      }
  };
  
  public deleteUserByUsername = async (req: Request, res: Response) => {
    const name = req.params.username
    User.deleteOne({username: req.params.username})
      .then((result) => {
        if (result.deletedCount > 0) {
          return res.status(200).json(`User ${name} deleted`)
        } else {
          return res.status(404).json("User not found")
        }
      })
      .catch(err => {
        console.log("deleteUser: " + err)
        return res.status(500).json(err)
      });
  };

  public checkoutUserCart = async (req: Request, res: Response) => {
    const cart = req.body.cart
    const address = req.body.address
    const credit_card = req.body.credit_card
    if (!cart) {
      return res.status(404).json("Cannot checkout empty cart")
    }
    if (!address) {
      return res.status(404).json("Cannot checkout without address")
    }
    if (!credit_card) {
      return res.status(404).json("Cannot checkout without credit card")
    }

    const name = req.params.username
    User.findOne({username: name})
      .then(async (user) => {
        if (user) {
          // fill in order details
          const order = new Order({ username: name })
          let totals = 0.0
          // @ts-ignore
          cart.forEach((item) => {
            order.addItemToOrder(item.title, item.quantity)
          });
          order.address = address

          // calculate order totals
          let isValid = true
          await Promise.all(order.items.map(async (item) => {
            const product = await Product.findOne({title: item.title});
            if (product) {
              // @ts-ignore
              totals += product.price * item.quantity
            } else {
              isValid = false
            }
          }));

          if (!isValid) {
            return res.status(500).json(`Invalid product in cart`)
          }
          order.totals = totals

          // redirect to payment API and save transaction ID
          const response = await got.post(creditAPI, {
            json: {
              companyId: companyID,
              amount: order.totals,
            }
          }).json()
          // @ts-ignore
          order.transaction_id = response.id

          // process transaction
          await got.post(creditAPI + "/" + order.transaction_id + "/process", {
            json: {
              customer_details: address,
              credit_card: credit_card,
            }
          }).json() // TODO: right now it returns status=pending
          order.status = "paid"
   
          // add to order database and user's order history
          user.history.push(order)
          await order.save()
          await user.save()

          // update metrics
          if (process.env.NODE_ENV !== "test" && process.env.NODE_ENV !== "deploy_test" && process.env.NODE_ENV !== "development") {
            Metric.findOne({title: "mvp"})
              .then(async (metric) => {
                if (metric) {
                  metric.num_orders += 1
                  metric.gross_revenue += order.totals
                  await metric.save();
                }
              })
          }

          return res.status(200).json(order)
        }
        return res.status(404).json(`User ${name} not found`)
      })
      .catch(err => {
        console.log("checkoutUserCart: " + err)
        return res.status(500).json(err)
      });
  };

  public getUserOrderHistory = async (req: Request, res: Response) => {
    const name = req.params.username
    User.findOne({username: name})
      .then(user => {
        if (user) {
          return res.status(200).json(user.history)
        }
        return res.status(404).json(`User ${name} not found`)
      })
      .catch(err => {
        console.log("getUserOrderHistory: " + err)
        return res.status(500).json(err)
      });
  };
  
}

export { UsersController }
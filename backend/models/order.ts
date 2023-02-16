import mongoose from 'mongoose'
import { Product, IProduct } from './product'

interface IOrder {
  username: String;
  items: [{
    product: IProduct;
    quantity: Number;
  }];
  totals: Number;
  address: String;
}

const orderSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  items: {
    type: [{
      product: {
        type: Product.schema,
        required: true
      },
      quantity: {
        type: Number,
        default: 1,
        validate: {
          validator: Number.isInteger,
          message: '{VALUE} is not an integer value'
        }
      },
    }],
    default: []
  },
  totals: {
    type: Number,
    default: 0.0, // TODO: add a function to auto calculate cart totals
  },
  address: {
    type: String,
    default: ""
  }
})
const Order = mongoose.model('Order', orderSchema)

export { Order }
export type { IOrder }
import { Schema, model } from 'mongoose'
import { Order, IOrder } from './order'
import { Product, IProduct } from './product'

interface IUser {
  username: String;
  password: String;
  full_name: String;
  history: [IOrder];
  cart: [{
    product: IProduct;
    quantity: Number;
  }];
}

const userSchema: Schema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    // TODO: unique validator, sanitize input
  },
  password: {
    type: String,
    required: true
  },
  full_name: {
    type: String,
    required: true
  },
  history: {
    type: [Order.schema],
    default: []
  },
  cart: {
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
  }
})
const User = model<IUser>('User', userSchema)

export { User }
export type { IUser }
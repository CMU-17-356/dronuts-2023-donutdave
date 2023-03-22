import { Model, Schema, model } from 'mongoose'

interface IOrder {
  username: string;
  items: [{
    title: string;
    quantity: number;
  }];
  totals: number;
  address: string;
  transaction_id: string;
  status: string; // unpaid -> paid -> sent -> delivered
}

interface IOrderMethods {
  // if item with the same product name already exists in order, throw an error
  // else, add the item to order with the specified quantity (default to 1)
  addItemToOrder(title: string, quantity: number): void;
}

type OrderModel = Model<IOrder, {}, IOrderMethods>

const orderSchema = new Schema<IOrder, OrderModel, IOrderMethods>({
  username: {
    type: String,
    required: true,
  },
  items: {
    type: [{
      title: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        validate: {
          validator: Number.isInteger,
          message: '{VALUE} is not an integer value',
        },
      },
    }],
    default: [],
  },
  totals: {
    type: Number,
    default: 0.0, // TODO: add a function to auto calculate cart totals
  },
  address: {
    type: String,
    default: "",
  },
  transaction_id: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "unpaid",
  },
});

orderSchema.method('addItemToOrder', function addItemToOrder(title, q=1) {
  for (let i = 0; i < this.items.length; i++) {
    if (this.items[i].title === title) {
      throw new Error('addItemToOrder: item already exists in order')
    }
  }
  this.items.push({title: title, quantity: q});
});

const Order = model('Order', orderSchema)

export { Order }
export type { IOrder }
import { Model, Schema, model } from 'mongoose'

// const sanitizerPlugin = require('mongoose-sanitizer-plugin');

interface IOrder {
  username: String;
  items: [{
    title: String;
    quantity: Number;
  }];
  totals: Number;
  address: String;
  transaction_id: String;
};

interface IOrderMethods {
  // if item with the same product name already exists in order, throw an error
  // else, add the item to order with the specified quantity (default to 1)
  addItemToOrder(title: String, quantity: Number): void;
};

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
  }
});

orderSchema.method('addItemToOrder', function addItemToOrder(title, q=1) {
  for (let i = 0; i < this.items.length; i++) {
    if (this.items[i].title === title) {
      throw new Error('addItemToOrder: item already exists in order')
    };
  };
  this.items.push({title: title, quantity: q});
});

// orderSchema.plugin(sanitizerPlugin);
const Order = model('Order', orderSchema)

export { Order }
export type { IOrder }
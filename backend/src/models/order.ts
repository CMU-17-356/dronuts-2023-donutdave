import { Model, Schema, model } from 'mongoose'

// const sanitizerPlugin = require('mongoose-sanitizer-plugin');

interface IOrder {
  username: String;
  items: [{
    product_name: String;
    quantity: Number;
  }];
  totals: Number;
  address: String;
};

interface IOrderMethods {
  // if item with the same product name already exists in order, throw an error
  // else, add the item to order with the specified quantity (default to 1)
  addItemToOrder(product_name: String, quantity: Number): void;

  // TODO: recalculate the current totals and return it
  updateAndGetTotals(): Number;
};

type OrderModel = Model<IOrder, {}, IOrderMethods>

const orderSchema = new Schema<IOrder, OrderModel, IOrderMethods>({
  username: {
    type: String,
    required: true,
  },
  items: {
    type: [{
      product_name: {
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
});

orderSchema.method('addItemToOrder', function addItemToOrder(pname, q=1) {
  for (let i = 0; i < this.items.length; i++) {
    if (this.items[i].product_name === pname) {
      throw new Error('addItemToOrder: item already exists in order')
    };
  };
  this.items.push({product_name: pname, quantity: q});
  this.save(); // TODO: this is causing tests to hang after completion
});

// orderSchema.plugin(sanitizerPlugin);
const Order = model('Order', orderSchema)

export { Order }
export type { IOrder }
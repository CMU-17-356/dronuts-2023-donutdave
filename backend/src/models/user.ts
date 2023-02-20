import { Model, Schema, model } from 'mongoose'
import { Order, IOrder } from './order.js'

// const sanitizerPlugin = require('mongoose-sanitizer-plugin');

interface IUser {
  username: String; // allowed characters: letters, numbers, and _
  password: String;
  full_name: String;
  history: [IOrder];
  cart: [{
    product_name: String;
    quantity: Number;
  }];
};

// https://mongoosejs.com/docs/typescript/statics-and-methods.html
interface IUserMethods {
  // if item with the same product name already exists in cart, increase its quantity by the specified amount
  // else, add the item to cart with the specified quantity (default to 1)
  addItemToCart(product_name: String, quantity: Number): void;

  // if item with the same product name already exists in cart, increase its quantity by 1
  // else, throw an error
  incrementItemQuantity(product_name: String): void;
  // if item with the same product name already exists in cart, decrease its quantity by 1,
  // and remove it from cart if quantity is zero
  // else, throw an error
  decrementItemQuantity(product_name: String): void;

  // TODO: Add an order to the user's history
  addOrderToHistory(order: IOrder): void;
}

type UserModel = Model<IUser, {}, IUserMethods>

const userSchema: Schema = new Schema<IUser, UserModel, IUserMethods>({
  username: {
    type: String,
    required: true,
    match: /^[a-z0-9_]+$/,
  },
  password: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  history: {
    type: [Order.schema],
    default: [],
  },
  cart: {
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
});

userSchema.method('addItemToCart', function addItemToCart(pname, q=1) {
  var hasFound = false
  for (let i = 0; i < this.cart.length; i++) {
    if (this.cart[i].product_name === pname) {
      this.cart[i].quantity += q
      this.save()
      hasFound = true
    };
  };
  if (!hasFound) {
    this.cart.push({product_name: pname, quantity: q})
    this.save() // TODO: this is causing tests to hang after completion
  }
});

userSchema.method('incrementItemQuantity', function incrementItemQuantity(pname) {
  var hasFound = false
  for (let i = 0; i < this.cart.length; i++) {
    if (this.cart[i].product_name === pname) {
      this.cart[i].quantity += 1
      this.save()
      hasFound = true
    };
  };
  if (!hasFound) {
    throw new Error('incrementItemQuantity: item not found in cart')
  };
});

userSchema.method('decrementItemQuantity', function decrementItemQuantity(pname) {
  var hasFound = false
  for (let i = 0; i < this.cart.length; i++) {
    if (this.cart[i].product_name === pname) {
      this.cart[i].quantity -= 1
      if (this.cart[i].quantity == 0) {
        this.cart.splice(i, 1)
      };
      this.save()
      hasFound = true
    };
  };
  if (!hasFound) {
    throw new Error('decrementItemQuantity: item not found in cart')
  };
});

// userSchema.plugin(sanitizerPlugin);
const User = model<IUser>('User', userSchema)

export { User }
export type { IUser }
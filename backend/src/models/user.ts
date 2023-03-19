import { Model, Schema, model } from 'mongoose'
import { Order, IOrder } from './order.js'

// const sanitizerPlugin = require('mongoose-sanitizer-plugin');

interface IUser {
  username: String; // allowed characters: letters, numbers, and _
  password: String;
  full_name: String;
  history: [IOrder];
};

// https://mongoosejs.com/docs/typescript/statics-and-methods.html
interface IUserMethods {
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
});

const User = model<IUser>('User', userSchema)

export { User }
export type { IUser }
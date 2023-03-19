import { Model, Schema, model } from 'mongoose'
import { Order, IOrder } from './order.js'

// const sanitizerPlugin = require('mongoose-sanitizer-plugin');

interface IUser {
  username: string; // allowed characters: letters, numbers, and _
  password: string;
  full_name: string;
  history: [IOrder];
}

type UserModel = Model<IUser, {}, {}>

const userSchema: Schema = new Schema<IUser, UserModel, {}>({
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
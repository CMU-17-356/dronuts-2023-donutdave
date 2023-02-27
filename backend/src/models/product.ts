import { Schema, model } from 'mongoose'

// const sanitizerPlugin = require('mongoose-sanitizer-plugin');

interface IProduct {
  title: String;
  price: Number;
  image: String;
};

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: "" // TODO: or some other default image path
  },
});

// productSchema.plugin(sanitizerPlugin);
const Product = model('Product', productSchema)

export { Product }
export type { IProduct }
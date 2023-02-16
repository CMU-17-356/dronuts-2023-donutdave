import mongoose from 'mongoose'

const sanitizerPlugin = require('mongoose-sanitizer-plugin');

interface IProduct {
  title: String;
  price: Number;
  image: String;
}

const productSchema = new mongoose.Schema({
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
  }
})

productSchema.plugin(sanitizerPlugin);
const Product = mongoose.model('Product', productSchema)

export { Product }
export type { IProduct }
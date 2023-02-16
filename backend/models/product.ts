import mongoose from 'mongoose'

interface IProduct {
  title: String;
  price: Number;
  image: String;
}

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    // TODO: unique validator, sanitize input
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
const Product = mongoose.model('Product', productSchema)

export { Product }
export type { IProduct }
import { Schema, model } from 'mongoose'

interface IProduct {
  title: string;
  display_name: string;
  price: number;
  image: string;
}

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    match: /^[a-z0-9_]+$/,
  },
  display_name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: function(p: number) { return p > 0 },
      message: '{VALUE} is not an integer value',
    },
  },
  image: {
    type: String,
    default: ""
  }
});

const Product = model('Product', productSchema)

export { Product }
export type { IProduct }
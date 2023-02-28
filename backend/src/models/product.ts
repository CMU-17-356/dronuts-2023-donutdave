import { Schema, model } from 'mongoose'

// const sanitizerPlugin = require('mongoose-sanitizer-plugin');

interface IProduct {
  title: String;
  display_name: String;
  price: Number;
  image: String;
};

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
      validator: function(p: Number) { return p > 0 },
      message: '{VALUE} is not an integer value',
    },
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
import mongoose from 'mongoose'
import { Product, IProduct } from './product'
import { defaultMerchant } from '../defaults';

const sanitizerPlugin = require('mongoose-sanitizer-plugin');

interface IMerchant {
  name: String;
  location: String;
  menu: [{
    product: IProduct;
    inventory: Number;
  }];
}

const merchantSchema = new mongoose.Schema({
  name: {
    type: String,
    default: defaultMerchant,
    // TODO: unique validator
  },
  location: {
    type: String,
    default: "Lawrenceville",
  },
  menu: {
    type: [Product.schema],
    default: [],
  }
})

merchantSchema.plugin(sanitizerPlugin);
const Merchant = mongoose.model('Merchant', merchantSchema)

export { Merchant }
export type { IMerchant }
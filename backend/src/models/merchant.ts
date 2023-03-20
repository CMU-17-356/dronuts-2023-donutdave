import { Schema, model } from 'mongoose'
import { Product, IProduct } from './product.js'

const defaultMerchant = "Lawrenceville Donut Store"

interface IMerchant {
  name: string;
  location: string;
  menu: [{
    product: IProduct;
    inventory: number;
  }];
}

const merchantSchema = new Schema({
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
  },
});

const Merchant = model('Merchant', merchantSchema)

export { Merchant, defaultMerchant }
export type { IMerchant }
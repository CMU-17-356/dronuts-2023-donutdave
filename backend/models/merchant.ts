import mongoose from 'mongoose'
import { Drone, IDrone } from './drone'

const sanitizerPlugin = require('mongoose-sanitizer-plugin');

interface IMerchant {
  name: String;
  location: String;
  drones: [IDrone];
  image: String;
}

const merchantSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Lawrenceville Donut Store"
    // TODO: unique validator, sanitize input
  },
  location: {
    type: String,
    default: "Lawrenceville",
  },
  drones: {
    type: [Drone.schema],
    default: [],
  },
  image: {
    type: String,
    default: "" // TODO: or some other default image path
  }
})

merchantSchema.plugin(sanitizerPlugin);
const Merchant = mongoose.model('Merchant', merchantSchema)

export { Merchant }
export type { IMerchant }
import mongoose from 'mongoose'

const sanitizerPlugin = require('mongoose-sanitizer-plugin');

interface IDrone {
  id: String;
  deployed: Boolean;
  target_location: String;
  image: String;
}

const droneSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  deployed: {
    type: Boolean,
    default: false,
  },
  target_location: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "" // TODO: or some other default image path
  }
})

droneSchema.plugin(sanitizerPlugin);
const Drone = mongoose.model('Drone', droneSchema)

export { Drone }
export type { IDrone }
import mongoose from 'mongoose'

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
    // TODO: unique validator, sanitize input
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
const Drone = mongoose.model('Drone', droneSchema)

export { Drone }
export type { IDrone }
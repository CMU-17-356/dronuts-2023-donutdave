import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /.+@.+..+/,
    unique: true
  },
  addresses: [
    {
      first_name: String,
      last_name: String,
      address: String,
      state: String,
      zipcode: String
    }
  ]
})
const Customer = mongoose.model('Customer', customerSchema)

export default Customer
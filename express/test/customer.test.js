const Customer = require('../models/customer').Customer
const expect = require('chai').expect

describe('Testing making new customer', function () {
  it('1. Invalid if username empty', function (done) {
    const c = new Customer({ email: "abc@gmail.com" })
    c.validate(function (err) {
      expect(err.errors.username).to.exist
      done()
    })
  })

  it('2. Invalid if email empty', function (done) {
    const c = new Customer({ username: "admin" })
    c.validate(function (err) {
      expect(err.errors.email).to.exist
      done()
    })
  })

  it('3. Creating new customer', function (done) {
    const c = new Customer({ username: "admin", email: "abc@gmail.com" })
    c.validate(function () {
      expect(c.username).to.exist
      expect(c.email).to.exist
      done()
    })
  })
})

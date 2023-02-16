// @ts-nocheck
import { Order } from '../../models/order'
import { Product } from '../../models/product'
import { expect } from 'chai';

describe('Testing making new order', function () {
  it('1. Invalid if no username', function (done) {
    var o = new Order({})
    o.validate(function(err) {
      if (err) {
        expect(err.errors.username).to.exist; 
        done();
      }
    });
  })

  it('2. Invalid if non-integer quantity in any item', function (done) {
    var p = new Product({ title: "Plain donut", price: "0.99", image: "donut.png" })
    var o = new Order({ username: "admin", items: [{product: p, quantity: 0.5}] })
    o.validate(function(err) {
      if (err) {
        // @ts-ignore 
        expect(err.message).to.equal('Order validation failed: items.0.quantity: 0.5 is not an integer value');
        done();
      }
    });
  })

  it('3. Creating new order', function (done) {
    var o = new Order({ username: "admin" })
    o.validate(function () {
      expect(o.username).to.exist
      expect(o.items).to.exist
      expect(o.items).to.have.length(0)
      expect(o.totals).to.exist
      expect(o.totals).to.equal(0.0)
      expect(o.address).to.exist
      expect(o.address).to.equal("")
      done()
    })
  })
})
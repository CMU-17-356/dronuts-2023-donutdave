// @ts-nocheck
import { Order } from '../../src/models/order'
import { expect } from 'chai';

describe('Testing making new order', function () {
  it('1. Invalid if no username', function (done) {
    const o = new Order({})
    o.validate(function(err) {
      if (err) {
        expect(err.errors.username).to.exist; 
        done();
      }
    });
  })

  it('2. Invalid if non-integer quantity in any item', function (done) {
    const o = new Order({ username: "admin", items: [{title: "Plain donut", quantity: 0.5}] })
    o.validate(function(err) {
      if (err) {
        // @ts-ignore 
        expect(err.message).to.equal('Order validation failed: items.0.quantity: 0.5 is not an integer value');
        done();
      }
    });
  })

  it('3. Creating new order', function (done) {
    const o = new Order({ username: "admin" })
    o.validate(function () {
      expect(o.username).to.exist;
      expect(o.items).to.have.length(0);
      expect(o.totals).to.equal(0.0);
      expect(o.address).to.equal("");
      done();
    })
  })

  it('4. Add item to order', function (done) {
    const o = new Order({ username: "admin" })
    o.validate(function () {
      expect(o.items).to.have.length(0);
      
      o.addItemToOrder("Plain donut", 2);
      expect(o.items).to.have.length(1);
      expect(o.items[0].title).to.equal("Plain donut");
      expect(o.items[0].quantity).to.equal(2);

      o.addItemToOrder("Chocolate donut");
      expect(o.items).to.have.length(2);
      expect(o.items[1].title).to.equal("Chocolate donut");
      expect(o.items[1].quantity).to.equal(1);

      expect(function() { o.addItemToOrder("Plain donut"); }).to.throw(Error);
      done();
    })
  })
})
// @ts-nocheck
import { User } from '../../models/user'
import { expect } from 'chai';

describe('Testing making new user', function () {
  it('1. Invalid if no username', function (done) {
    var u = new User({ password: "bruh", full_name: "Thanos" })
    u.validate(function(err: Error) {
      if (err) {
        expect(err.errors.username).to.exist; 
        done();
      }
    });
  })

  it('2. Invalid if no password', function (done) {
    var u = new User({ username: "admin", full_name: "Thanos" })
    u.validate(function(err: Error) {
      if (err) {
        expect(err.errors.password).to.exist;
        done();
      }
    });
  })

  it('3. Invalid if no full name', function (done) {
    var u = new User({ username: "admin", password: "bruh" })
    u.validate(function(err: Error) {
      if (err) {
        expect(err.errors.full_name).to.exist;
        done();
      }
    });
  })

  it('4. Creating new user', function (done) {
    var u = new User({ username: "admin", password: "bruh", full_name: "Thanos" })
    u.validate(function () {
      expect(u.username).to.exist;
      expect(u.password).to.exist;
      expect(u.full_name).to.exist;
      expect(u.history).to.have.length(0);
      expect(u.cart).to.have.length(0);
      done();
    })
  })

  it('5. Add item to cart', function (done) {
    var u = new User({ username: "admin", password: "bruh", full_name: "Thanos" })
    u.validate(function () {
      expect(u.cart).to.have.length(0);
      
      u.addItemToCart("Plain donut");
      expect(u.cart).to.have.length(1);
      expect(u.cart[0].product_name).to.equal("Plain donut");
      expect(u.cart[0].quantity).to.equal(1);

      u.addItemToCart("Chocolate donut", 10);
      expect(u.cart).to.have.length(2);
      expect(u.cart[1].product_name).to.equal("Chocolate donut");
      expect(u.cart[1].quantity).to.equal(10);
      
      done();
    })
  })

  it('6. Update item quantity if already exist in cart', function (done) {
    var u = new User({ username: "admin", password: "bruh", full_name: "Thanos" })
    u.validate(function () {
      u.addItemToCart("Plain donut", 5);
      expect(u.cart).to.have.length(1);
      expect(u.cart[0].product_name).to.equal("Plain donut");
      expect(u.cart[0].quantity).to.equal(5);

      u.addItemToCart("Plain donut");
      expect(u.cart).to.have.length(1);
      expect(u.cart[0].quantity).to.equal(6);
      done();
    })
  })

  it('7. Increment or decrement item in cart', function (done) {
    var u = new User({ username: "admin", password: "bruh", full_name: "Thanos" })
    u.validate(function () {
      u.addItemToCart("Plain donut", 1);
      expect(u.cart).to.have.length(1);
      expect(u.cart[0].product_name).to.equal("Plain donut");
      expect(u.cart[0].quantity).to.equal(1);

      u.incrementItemQuantity("Plain donut");
      expect(u.cart).to.have.length(1);
      expect(u.cart[0].quantity).to.equal(2);

      u.decrementItemQuantity("Plain donut");
      expect(u.cart).to.have.length(1);
      expect(u.cart[0].quantity).to.equal(1);

      u.decrementItemQuantity("Plain donut");
      expect(u.cart).to.have.length(0);

      expect(function() { u.decrementItemQuantity("Plain donut"); }).to.throw(Error);
      expect(function() { u.incrementItemQuantity("Chocolate donut"); }).to.throw(Error)
      done();
    })
  })
})
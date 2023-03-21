// @ts-nocheck
import { Product } from '../../src/models/product'
import { expect } from 'chai';

describe('Testing making new product', function () {
  it('1. Invalid if no title', function (done) {
    const p = new Product({ price: "0.99", display_name: "Plain donut" })
    p.validate(function(err) {
      if (err) {
        expect(err.errors.title).to.exist; 
        done();
      }
    });
  })

  it('2. Invalid if no price', function (done) {
    const p = new Product({ title: "plain", display_name: "Plain donut" })
    p.validate(function(err) {
      if (err) {
        expect(err.errors.price).to.exist;
        done();
      }
    });
  })

  it('3. Invalid if no display name', function (done) {
    const p = new Product({ title: "plain", price: "0.99" })
    p.validate(function(err) {
      if (err) {
        expect(err.errors.display_name).to.exist;
        done();
      }
    });
  })

  it('4. Invalid if price is not positive', function (done) {
    const p = new Product({ title: "plain", display_name: "Plain donut", price: "-0.01" })
    p.validate(function(err) {
      if (err) {
        expect(err.errors.price).to.exist;
        done();
      }
    });
  })

  it('4. Creating new product', function (done) {
    const p = new Product({ title: "plain", display_name: "Plain donut", price: "0.99" })
    p.validate(function () {
      expect(p.title).to.exist;
      expect(p.display_name).to.exist;
      expect(p.price).to.exist;
      expect(p.image).to.exist;
      done();
    })
  })
})
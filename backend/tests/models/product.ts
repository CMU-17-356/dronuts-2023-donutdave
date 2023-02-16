// @ts-nocheck
import { Product } from '../../models/product'
import { expect } from 'chai';

describe('Testing making new product', function () {
  it('1. Invalid if no title', function (done) {
    var p = new Product({ price: "0.99" })
    p.validate(function(err) {
      if (err) {
        expect(err.errors.title).to.exist; 
        done();
      }
    });
  })

  it('2. Invalid if no price', function (done) {
    var p = new Product({ title: "Plain donut" })
    p.validate(function(err) {
      if (err) {
        expect(err.errors.price).to.exist;
        done();
      }
    });
  })

  it('3. Creating new product', function (done) {
    var p = new Product({ title: "Plain donut", price: "0.99" })
    p.validate(function () {
      expect(p.title).to.exist;
      expect(p.price).to.exist;
      expect(p.image).to.exist;
      done();
    })
  })
})
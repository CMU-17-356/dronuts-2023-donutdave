// @ts-nocheck
import { Merchant } from '../../models/merchant'
import { expect } from 'chai';

describe('Testing making new drone', function () {
  it('1. Creating default merchant', function (done) {
    var m = new Merchant({})
    m.validate(function () {
      expect(m.name).to.equal("Lawrenceville Donut Store")
      expect(m.location).to.equal("Lawrenceville")
      expect(m.drones).to.have.length(0)
      expect(m.image).to.exist
      done()
    })
  })
})
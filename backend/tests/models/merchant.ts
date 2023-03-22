// @ts-nocheck
import { Merchant, defaultMerchant } from '../../src/models/merchant'
import { expect } from 'chai';

describe('Testing making new merchant', function () {
  it('1. Creating default merchant', function (done) {
    const m = new Merchant({})
    m.validate(function () {
      expect(m.name).to.equal(defaultMerchant)
      expect(m.location).to.equal("Lawrenceville")
      expect(m.menu).to.have.length(0)
      done()
    })
  })
})
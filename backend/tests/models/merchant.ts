// @ts-nocheck
import { Merchant } from '../../models/merchant'
import { expect } from 'chai';
import { defaultMerchant } from '../../defaults';

describe('Testing making new merchant', function () {
  it('1. Creating default merchant', function (done) {
    var m = new Merchant({})
    m.validate(function () {
      expect(m.name).to.equal(defaultMerchant)
      expect(m.location).to.equal("Lawrenceville")
      expect(m.menu).to.have.length(0)
      done()
    })
  })
})
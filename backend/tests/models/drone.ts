// @ts-nocheck
import { Drone } from '../../models/drone'
import { expect } from 'chai';

describe('Testing making new drone', function () {
  it('1. Invalid if no id', function (done) {
    var d = new Drone({})
    d.validate(function(err) {
      if (err) {
        expect(err.errors.id).to.exist; 
        done();
      }
    });
  })

  it('2. Creating new drone', function (done) {
    var d = new Drone({ id: "test" })
    d.validate(function () {
      expect(d.id).to.exist
      expect(d.deployed).to.be.false
      expect(d.target_location).to.exist
      expect(d.image).to.exist
      done()
    })
  })
})
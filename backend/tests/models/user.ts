// @ts-nocheck
import { User } from '../../src/models/user'
import { expect } from 'chai';

describe('Testing User model', function () {
  it('1. Invalid if no username', function (done) {
    var u = new User({ password: "bruh", full_name: "Thanos" })
    u.validate(function(err: Error) {
      if (err) {
        expect(err.errors.username).to.exist; 
        done();
      }
    });
  })

  it('2. Invalid if username contains forbidden characters', function (done) {
    var u = new User({ username: "$admin", password: "bruh", full_name: "Thanos" })
    u.validate(function(err: Error) {
      if (err) {
        expect(err.errors.username).to.exist;
        done();
      }
    });
  })

  it('3. Invalid if no password', function (done) {
    var u = new User({ username: "admin", full_name: "Thanos" })
    u.validate(function(err: Error) {
      if (err) {
        expect(err.errors.password).to.exist;
        done();
      }
    });
  })

  it('4. Invalid if no full name', function (done) {
    var u = new User({ username: "admin", password: "bruh" })
    u.validate(function(err: Error) {
      if (err) {
        expect(err.errors.full_name).to.exist;
        done();
      }
    });
  })

  it('5. Creating new user', function (done) {
    var u = new User({ username: "admin", password: "bruh", full_name: "Thanos" })
    u.validate(function () {
      expect(u.username).to.exist;
      expect(u.password).to.exist;
      expect(u.full_name).to.exist;
      expect(u.history).to.have.length(0);
      done();
    })
  })
})
// @ts-nocheck
import { MerchantsController } from '../../src/controllers/merchants';
import { Product } from '../../src/models/product';
import { Order } from '../../src/models/order';
import { expect } from 'chai';
import { app, server } from '../../src/index.js';
import request from 'supertest';

describe('Merchants', () => {
  beforeEach((done) => { // empty the database
    Product.deleteMany({}, () => {
      Order.deleteMany({}, () => {
        done()
      })
    });             
  });

  describe('View drones', () => {
    it('1. View all drones', (done) => {
      request(app)
        .get(`/api/merchants/drones`)
        .then((res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.length).to.equal(4);
          done();
        })
        .catch((err) => done(err))
    });

    it('2. Invalid status', (done) => {
      request(app)
        .get(`/api/merchants/drones?status=free`)
        .then((res) => {
          expect(res.statusCode).to.equal(404);
          done();
        })
        .catch((err) => done(err))
    });
  });

  after((done) => {
    server.close();
    done();
  })

});
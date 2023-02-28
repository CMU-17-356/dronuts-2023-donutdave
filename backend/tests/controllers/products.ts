// @ts-nocheck
import { Product } from '../../src/models/product';
import { expect } from 'chai';
import { app, server } from '../../src/index.js';
import request from 'supertest';

describe('Products', () => {
  beforeEach((done) => { // empty the database
    Product.deleteMany({}, () => { 
      done() 
    });        
  });

  describe('View product', () => {
    it('1. View existing product', (done) => {
      var p = new Product({ title: "Plain donut", price: "0.99" })
      p.save().then(() => {
        request(app)
          .get('/api/products/plain_donut')
          .then((res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.title).to.equal("Plain donut");
            done();
          })
          .catch((err) => done(err))
      })
    });

    it('2. View non-existing product', (done) => {
      request(app)
        .get('/api/products/nonexisting')
        .then((res) => {
          expect(res.statusCode).to.equal(404);
          done();
        })
        .catch((err) => done(err))
    });

    it('3. View all products', (done) => {
      var p1 = new Product({ title: "Plain donut", price: "0.99" })
      var p2 = new Product({ title: "Chocolate donut", price: "1.99" })
      p1.save().then(() => {
        p2.save().then(() => {
          request(app).get('/api/products')
            .then((res)=>{
              expect(res.statusCode).to.equal(200);
              expect(res.body).to.have.length(2);
              expect(res.body[0].title).to.equal("Plain donut");
              expect(res.body[1].title).to.equal("Chocolate donut");
              done();
            })
            .catch((err) => done(err))
        }).catch((err) => done(err))
      }).catch((err) => done(err))
    });
  });

  after((done) => {
    server.close();
    done();
  })

});
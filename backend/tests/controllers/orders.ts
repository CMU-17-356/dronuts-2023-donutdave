// @ts-nocheck
import { Order } from '../../src/models/order';
import { Product } from '../../src/models/product';
import { expect } from 'chai';
import { app, server } from '../../src/index.js';
import request from 'supertest';

describe('Orders', () => {
  beforeEach((done) => { // empty the database
    Product.deleteMany({}, () => {
      Order.deleteMany({}, () => {
        done()
      })
    });             
  });

  describe('View order', () => {
    it('1. View existing order', (done) => {
      const o = new Order({ username: "existing", totals: 10.28 })
      o.save().then(() => {
        request(app)
          .get(`/api/orders/${o._id}`)
          .then((res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.totals).to.equal(10.28);
            done();
          })
          .catch((err) => done(err))
      })
    });

    it('2. View non-existing order', (done) => {
      const o = new Order({ username: "existing", totals: 10.28 }) // not saved
      request(app)
        .get(`/api/orders/${o._id}`)
        .then((res) => {
          expect(res.statusCode).to.equal(404);
          done();
        })
        .catch((err) => done(err))
    });

    it('3. View all orders', (done) => {
      const o1 = new Order({ username: "admin1", totals: 10.28, status: "paid" })
      const o2 = new Order({ username: "admin2", totals: 12.23, status: "delivered" })
      o1.save().then(() => {
        o2.save().then(() => {
          request(app).get('/api/orders')
            .then((res)=>{
              expect(res.statusCode).to.equal(200);
              expect(res.body).to.have.length(2);
              expect(res.body[0]._id.toString()).to.equal(o1._id.toString());
              expect(res.body[1]._id.toString()).to.equal(o2._id.toString());
              done();
            })
            .catch((err) => done(err))
        }).catch((err) => done(err))
      }).catch((err) => done(err))
    });

    it('4. View orders by status', (done) => {
      const o1 = new Order({ username: "admin1", totals: 10.28, status: "paid" })
      const o2 = new Order({ username: "admin2", totals: 12.23, status: "delivered" })
      o1.save().then(() => {
        o2.save().then(() => {
          request(app).get('/api/orders?status=paid')
            .then((res)=>{
              expect(res.statusCode).to.equal(200);
              expect(res.body).to.have.length(1);
              expect(res.body[0]._id.toString()).to.equal(o1._id.toString());
              done();
            })
            .catch((err) => done(err))
        }).catch((err) => done(err))
      }).catch((err) => done(err))
    });

    it('5. Invalid status', (done) => {
      const o1 = new Order({ username: "admin1", totals: 10.28, status: "paid" })
      const o2 = new Order({ username: "admin2", totals: 12.23, status: "delivered" })
      o1.save().then(() => {
        o2.save().then(() => {
          request(app).get('/api/orders?status=unpaid')
            .then((res)=>{
              expect(res.statusCode).to.equal(404);
              done();
            })
            .catch((err) => done(err))
        }).catch((err) => done(err))
      }).catch((err) => done(err))
    });
  });

  describe('Calculate total price', () => {
    it('1. Valid items', (done) => {
      const p1 = new Product({ title: "plain", display_name: "Plain donut", price: "0.99" })
      const p2 = new Product({ title: "chocolate", display_name: "Chocolate donut", price: "1.99" })
      p1.save().then(() => {
        p2.save().then(() => {
          request(app)
            .post('/api/orders/totals')
            .send({ cart: [{title: "plain", quantity: 5}, {title: "chocolate", quantity: 3}] })
            .then((res) => {
              expect(res.statusCode).to.equal(200);
              expect(res.body.totals).to.equal(10.92);
              done();
              }).catch((err) => done(err))
        }).catch((err) => done(err));
      }).catch((err) => done(err));
    });

    it('2. Empty list', (done) => {
      request(app)
        .post('/api/orders/totals')
        .send({ cart: [] })
        .then((res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.totals).to.equal(0);
          done();
          }).catch((err) => done(err))
    });
  
    it('3. Invalid item', (done) => {
      const p1 = new Product({ title: "chocolate", display_name: "Chocolate donut", price: "1.99" })
      p1.save().then(() => {
        request(app)
          .post('/api/orders/totals')
          .send({ cart: [{title: "plain", quantity: 5}] })
          .then((res) => {
            expect(res.statusCode).to.equal(500);
            done();
          })
          .catch((err) => done(err))
      }).catch((err) => done(err));
    });
  });

  after((done) => {
    server.close();
    done();
  })

});
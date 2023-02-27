// @ts-nocheck
import { Order } from '../../src/models/order';
import { expect } from 'chai';
import { app, server } from '../../src/index.js';
import request from 'supertest';

describe('Products', () => {
  beforeEach((done) => { // empty the database
    Order.deleteMany({}, () => { 
      done() 
    });        
  });

  describe('View order', () => {
    it('1. View existing order', (done) => {
      var o = new Order({ username: "existing", totals: 10.28 })
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
      var o = new Order({ username: "existing", totals: 10.28 }) // not saved
      request(app)
        .get(`/api/orders/${o._id}`)
        .then((res) => {
          expect(res.statusCode).to.equal(404);
          done();
        })
        .catch((err) => done(err))
    });

    it('3. View all orders', (done) => {
      var o1 = new Order({ username: "admin1", totals: 10.28 })
      var o2 = new Order({ username: "admin2", totals: 12.23 })
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
  });

  after((done) => {
    server.close();
    done();
  })

});
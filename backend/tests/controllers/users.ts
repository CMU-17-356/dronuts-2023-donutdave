// @ts-nocheck
import { User } from '../../src/models/user';
import { Product } from '../../src/models/product';
import { Order } from '../../src/models/order';
import { expect } from 'chai';
import { app, creditAPI, server } from '../../src/index.js';
import request from 'supertest';
import got from 'got';

describe('Users', () => {
  beforeEach((done) => { // empty the database
    User.deleteMany({}, () => { 
      Product.deleteMany({}, () => {
        Order.deleteMany({}, () => {
          done()
        })
      })      
    });        
  });

  describe('Create user', () => {
    it('1. Valid new user', (done) => {
      request(app)
        .post('/api/users')
        .send({ username: "admin", password: "bruh", full_name: "Thanos" })
        .then((res) => {
            expect(res.statusCode).to.equal(201);
            done();
        })
        .catch((err) => done(err))
    });

    it('2. Invalid new user', (done) => {
      request(app)
        .post('/api/users')
        .send({ password: "bruh", full_name: "Thanos" })
        .then((res) => {
            expect(res.statusCode).to.equal(400);
            done();
        })
        .catch((err) => done(err))
    });

    it('3. Invalid for duplicated username', (done) => {
      var u1 = new User({ username: "dupname", password: "bruh", full_name: "Thanos" })
      u1.save().then(() => {
        request(app)
          .post('/api/users')
          .send({ username: "dupname", password: "okay", full_name: "Ironman" })
          .then((res) => {
              expect(res.statusCode).to.equal(400);
              done();
          })
          .catch((err) => done(err))
      }).catch((err) => done(err))
    });
  });

  describe('View user', () => {
    it('1. View existing user', (done) => {
      var u1 = new User({ username: "existing", password: "bruh", full_name: "Thanos" })
      u1.save().then(() => {
        request(app)
          .get('/api/users/existing')
          .then((res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.username).to.equal("existing");
            done();
          })
          .catch((err) => done(err))
      })
    });

    it('2. View non-existing user', (done) => {
      request(app)
        .get('/api/users/nonexisting')
        .then((res) => {
          expect(res.statusCode).to.equal(404);
          done();
        })
        .catch((err) => done(err))
    });

    it('3. View all users', (done) => {
      var u1 = new User({ username: "new1", password: "bruh", full_name: "Thanos" })
      var u2 = new User({ username: "new2", password: "okay", full_name: "Ironman" })
      u1.save().then(() => {
        u2.save().then(() => {
          request(app).get('/api/users')
            .then((res)=>{
              expect(res.statusCode).to.equal(200);
              expect(res.body).to.have.length(2);
              expect(res.body[0].username).to.equal("new1");
              expect(res.body[1].username).to.equal("new2");
              done();
            })
            .catch((err) => done(err))
        }).catch((err) => done(err))
      }).catch((err) => done(err))
    });
  });

  describe('Update user', () => {
    it('1. Update existing user', (done) => {
      var u1 = new User({ username: "updating", password: "bruh", full_name: "Thanos" })
      u1.save().then(() => {
        request(app)
          .patch('/api/users/updating')
          .send( { password: "okay" } )
          .then((res) => {
            expect(res.statusCode).to.equal(201);
            User.findById(u1._id)
              .then(rec => {
                expect(rec.password).to.equal("okay");
                expect(rec.full_name).to.equal("Thanos");
                done();
              })
              .catch((err) => done(err))
          })
          .catch((err) => done(err))
      }).catch((err) => done(err))
    });

    it('2. Update non-existing user', (done) => {
      request(app)
        .patch('/api/users/nonexisting')
        .send( { password: "okay" } )
        .then((res) => {
          expect(res.statusCode).to.equal(404);
          done();
        })
        .catch((err) => done(err))
    });

    it('3. Cannot update username to an existing username', (done) => {
      var u1 = new User({ username: "new1", password: "bruh", full_name: "Thanos" })
      var u2 = new User({ username: "new2", password: "okay", full_name: "Ironman" })
      u1.save().then(() => {
        u2.save().then(() => {
          request(app)
            .patch('/api/users/new2')
            .send( { username: "new1" } )
            .then((res) => {
              expect(res.statusCode).to.equal(400);
              done();
            })
            .catch((err) => done(err))
        });
      }).catch((err) => done(err))
    });
  });

  // describe('Checkout user cart', () => {
  //   it('1. Checkout valid cart', (done) => {
  //     var u = new User({ username: "admin", password: "bruh", full_name: "Thanos", cart: [{title: "plain", quantity: 5}, {title: "chocolate", quantity: 3}]})
  //     var p1 = new Product({ title: "plain", display_name: "Plain donut", price: "0.99" })
  //     var p2 = new Product({ title: "chocolate", display_name: "Chocolate donut", price: "1.99" })
  //     u.save().then(() => {
  //       p1.save().then(() => {
  //         p2.save().then(() => {
  //           request(app)
  //             .post('/api/users/admin/checkout')
  //             .then((res) => {
  //               expect(res.statusCode).to.equal(200);
  //               expect(res.body.username).to.equal("admin");
  //               expect(res.body.totals).to.equal(10.92);
  //               expect(res.body.items).to.have.length(2);
  //               expect(res.body.items[0].title).to.equal("plain");
  //               expect(res.body.items[0].quantity).to.equal(5);
  //               expect(res.body.items[1].title).to.equal("chocolate");
  //               expect(res.body.items[1].quantity).to.equal(3);

  //               // make sure order has a valid transaction ID
  //               let tid = res.body.transaction_id
  //               got.get(`${creditAPI}/${tid}`).json().then((response) => {
  //                 expect(response.amount).to.equal(10.92);

  //                 // make sure order has been saved
  //                 Order.findById(res.body._id).then((order) => {
  //                   expect(order.username).to.equal("admin");
  //                   expect(order._id.toString()).to.equal(res.body._id);
  //                   expect(order.transaction_id).to.equal(response.id);
                    
  //                   User.findById(u._id).then((user) => {
  //                     expect(user.history).to.have.length(1);
  //                     expect(user.history[0]._id.toString()).to.equal(res.body._id);
  //                     expect(user.history[0].transaction_id).to.equal(response.id);
  //                     done();
  //                   }).catch((err) => done(err))
  //                 }).catch((err) => done(err))
  //               }).catch((err) => done(err))
  //             })
  //             .catch((err) => done(err))
  //         }).catch((err) => done(err))
  //       }).catch((err) => done(err))
  //     }).catch((err) => done(err))
  //   });

  //   it('3. Checkout cart with invalid items', (done) => {
  //     var u = new User({ username: "admin", password: "bruh", full_name: "Thanos", cart: [{title: "plain", quantity: 5}] })
  //     var p1 = new Product({ title: "chocolate", display_name: "Chocolate donut", price: "1.99" })
  //     u.save().then(() => {
  //       p1.save().then(() => {
  //         request(app)
  //           .post('/api/users/admin/checkout')
  //           .then((res) => {
  //             expect(res.statusCode).to.equal(500);
  //             done()
  //           })
  //           .catch((err) => done(err))
  //       }).catch((err) => done(err))
  //     }).catch((err) => done(err))
  //   });
  // });

  describe('View user order history', () => {
    it('1. View existing user history', (done) => {
      var o1 = new Order({ username: "existing", totals: 10.28 })
      var o2 = new Order({ username: "existing", totals: 12.23 })
      var u = new User({ username: "existing", password: "bruh", full_name: "Thanos", history: [o1, o2]})
      u.save().then(() => {
        request(app)
          .get('/api/users/existing/history')
          .then((res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.have.length(2);
            expect(res.body[0].totals).to.equal(10.28);
            expect(res.body[1].totals).to.equal(12.23);
            done();
          })
          .catch((err) => done(err))
      }).catch((err) => done(err))
    });

    it('2. View non-existing user history', (done) => {
      request(app)
        .get('/api/users/nonexisting/cart')
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
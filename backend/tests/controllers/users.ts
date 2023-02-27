// @ts-nocheck
import { User } from '../../src/models/user'
import { expect } from 'chai';
import { app, server } from '../../src/index.js';
import request from 'supertest';

//Our parent block
describe('Users', () => {
  beforeEach((done) => { //empty the database
      User.deleteMany({}, (err) => { 
          done();           
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
      u1.save().then((u1) => {
        request(app)
          .post('/api/users')
          .send({ username: "dupname", password: "okay", full_name: "Ironman" })
          .then((res) => {
              expect(res.statusCode).to.equal(400);
              done();
          })
          .catch((err) => done(err))
      })
    });
  });

  describe('View user', () => {
    it('1. View existing user', (done) => {
      var u1 = new User({ username: "existing", password: "bruh", full_name: "Thanos" })
      u1.save().then((u1) => {
        request(app)
          .get('/api/users/existing')
          .then((res2) => {
            expect(res2.statusCode).to.equal(200);
            expect(res2.body.username).to.equal("existing");
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
      u1.save().then((u1) => {
        var u2 = new User({ username: "new2", password: "okay", full_name: "Ironman" })
        u2.save().then((u2) => {
          request(app).get('/api/users')
            .then((res)=>{
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.have.length(2);
                expect(res.body[0].username).to.equal("new1");
                expect(res.body[1].username).to.equal("new2");
                done();
            })
            .catch((err) => done(err))
        })
      })
    });
  });

  describe('Update user', () => {
    it('1. Update existing user', (done) => {
      var u1 = new User({ username: "updating", password: "bruh", full_name: "Thanos" })
      u1.save().then((u1) => {
        request(app)
          .patch('/api/users/updating')
          .send( { password: "okay" } )
          .then((res) => {
            expect(res.statusCode).to.equal(201);
            User.findOne({username: "updating"})
              .then(rec => {
                expect(rec.password).to.equal("okay");
                expect(rec.full_name).to.equal("Thanos");
                done();
              })
              .catch((err) => done(err))
          })
          .catch((err) => done(err))
      })
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
      u1.save().then((u1) => {
        var u2 = new User({ username: "new2", password: "okay", full_name: "Ironman" })
        u2.save().then((u2) => {
          request(app)
            .patch('/api/users/new2')
            .send( { username: "new1" } )
            .then((res) => {
              expect(res.statusCode).to.equal(400);
              done();
            })
            .catch((err) => done(err))
        });
      })
    });
  });

  describe('View user cart', () => {
    it('1. View existing user cart', (done) => {
      var u1 = new User({ username: "existing", password: "bruh", full_name: "Thanos", cart: [{product_name: "Plain donut", quantity: 5}]})
      u1.save().then((u1) => {
        request(app)
          .get('/api/users/existing/cart')
          .then((res2) => {
            expect(res2.statusCode).to.equal(200);
            expect(res2.body[0].product_name).to.equal("Plain donut");
            expect(res2.body[0].quantity).to.equal(5);
            done();
          })
          .catch((err) => done(err))
      })
    });

    it('2. View non-existing user cart', (done) => {
      request(app)
        .get('/api/users/nonexisting/cart')
        .then((res) => {
          expect(res.statusCode).to.equal(404);
          done();
        })
        .catch((err) => done(err))
    });
  });

  describe('Modify user cart', () => {
    it('1. Add new items', (done) => {
      var u1 = new User({ username: "existing", password: "bruh", full_name: "Thanos", cart: [{product_name: "Plain donut", quantity: 5}]})
      u1.save().then((u1) => {
        request(app)
          .patch('/api/users/existing/cart')
          .send( {items: [{ name: "Chocolate donut" }, { name: "Strawberry donut", quantity: 3}]} )
          .then((res) => {
            expect(res.statusCode).to.equal(201);
            User.findOne({username: "existing"})
              .then(user => {
                expect(user.cart).to.have.length(3)
                expect(user.cart[1].product_name).to.equal("Chocolate donut");
                expect(user.cart[1].quantity).to.equal(1);
                expect(user.cart[2].product_name).to.equal("Strawberry donut");
                expect(user.cart[2].quantity).to.equal(3);
                done();
              })
              .catch((err) => done(err))
          })
          .catch((err) => done(err))
      })
    });

    it('2. Remove existing items', (done) => {
      var u1 = new User({ username: "existing", password: "bruh", full_name: "Thanos", cart: [{product_name: "Plain donut", quantity: 5}, {product_name: "Chocolate donut", quantity: 10}, {product_name: "Strawberry donut", quantity: 1}]})
      u1.save().then((u1) => {
        request(app)
          .patch('/api/users/existing/cart')
          .send( {items: [{ name: "Plain donut" }, { name: "Strawberry donut"}], isAdd: false} )
          .then((res) => {
            expect(res.statusCode).to.equal(201);
            User.findOne({username: "existing"})
              .then(user => {
                expect(user.cart).to.have.length(1)
                expect(user.cart[0].product_name).to.equal("Chocolate donut");
                expect(user.cart[0].quantity).to.equal(10);
                done();
              })
              .catch((err) => done(err))
          })
          .catch((err) => done(err))
      })
    });

    it('3. Remove non-existing item', (done) => {
      var u1 = new User({ username: "existing", password: "bruh", full_name: "Thanos", cart: [{product_name: "Plain donut", quantity: 5}, {product_name: "Chocolate donut", quantity: 10}]})
      u1.save().then((u1) => {
        request(app)
          .patch('/api/users/existing/cart')
          .send( {items: [{ name: "Plain donut" }, { name: "Strawberry donut"}], isAdd: false} )
          .then((res) => {
            expect(res.statusCode).to.equal(500);
            done();
          })
          .catch((err) => done(err))
      })
    });
  });

  after((done) => {
    server.close();
    done();
  })

});
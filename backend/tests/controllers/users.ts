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
        .post('/api/v1/users')
        .send({ username: "admin", password: "bruh", full_name: "Thanos" })
        .then((res) => {
            expect(res.statusCode).to.equal(201);
            done();
        })
        .catch((err) => done(err))
    });

    it('2. Invalid new user', (done) => {
      request(app)
        .post('/api/v1/users')
        .send({ password: "bruh", full_name: "Thanos" })
        .then((res) => {
            expect(res.statusCode).to.equal(400);
            done();
        })
        .catch((err) => done(err))
    });

    it('3. Invalid for duplicated username', (done) => {
      var u1 = new User({ username: "dupname", password: "bruh", full_name: "Thanos" })
      u1.save();
      request(app)
        .post('/api/v1/users')
        .send({ username: "dupname", password: "okay", full_name: "Ironman" })
        .then((res) => {
            expect(res.statusCode).to.equal(400);
            done();
        })
        .catch((err) => done(err))
    });
  });

  describe('View user', () => {
    it('1. View existing user', (done) => {
      var u1 = new User({ username: "existing", password: "bruh", full_name: "Thanos" })
      u1.save();
      request(app)
        .get('/api/v1/users/existing')
        .then((res2) => {
          expect(res2.statusCode).to.equal(200);
          expect(res2.body.username = "existing");
          done();
        })
        .catch((err) => done(err))
    });

    it('2. View non-existing user', (done) => {
      request(app)
        .get('/api/v1/users/nonexisting')
        .then((res) => {
          expect(res.statusCode).to.equal(404);
          done();
        })
        .catch((err) => done(err))
    });

    it('3. View all users', (done) => {
      var u1 = new User({ username: "new1", password: "bruh", full_name: "Thanos" })
      u1.save();
      var u2 = new User({ username: "new2", password: "okay", full_name: "Ironman" })
      u2.save();
      request(app).get('/api/v1/users')
        .then((res)=>{
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.have.length(2);
            expect(res.body[0].username).to.be.oneOf(["new1", "new2"]);
            expect(res.body[1].username).to.be.oneOf(["new1", "new2"]);
            done();
        })
        .catch((err) => done(err))
    });
  });

  describe('Update user', () => {
    it('1. Update existing user', (done) => {
      var u1 = new User({ username: "updating", password: "bruh", full_name: "Thanos" })
      u1.save();
      request(app)
        .patch('/api/v1/users/updating')
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
    });

    it('2. Update non-existing user', (done) => {
      request(app)
        .patch('/api/v1/users/nonexisting')
        .send( { password: "okay" } )
        .then((res) => {
          expect(res.statusCode).to.equal(404);
          done();
        })
        .catch((err) => done(err))
    });

    it('3. Cannot update username to an existing username', (done) => {
      var u1 = new User({ username: "new1", password: "bruh", full_name: "Thanos" })
      u1.save();
      var u2 = new User({ username: "new2", password: "okay", full_name: "Ironman" })
      u2.save();
      request(app)
        .patch('/api/v1/users/new2')
        .send( { username: "new1" } )
        .then((res) => {
          expect(res.statusCode).to.equal(400);
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
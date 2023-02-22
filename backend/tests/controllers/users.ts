// @ts-nocheck
import { User } from '../../src/models/user'
import { getUsers, createUser, getUserByUsername, deleteUserByUsername } from '../../src/controllers/users.js'
import { expect } from 'chai';
import { app, server } from '../../src/index.js';
import mongoose from 'mongoose';
import request from 'supertest';
import { should } from 'chai';
import { Server } from 'http';

//Our parent block
describe('Books', () => {
  beforeEach((done) => { //empty the database
      User.deleteMany({}, (err) => { 
          done();           
      });        
  });

  describe('Create new user', () => {
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

  // TODO: I do NOT know why this doesn't work
  // describe('Get all users', () => {
  //   var u1 = new User({ username: "admin1", password: "bruh", full_name: "Thanos" })
  //   u1.save(console.log("bruh"));
  //   var u2 = new User({ username: "admin2", password: "okay", full_name: "Ironman" })
  //   u2.save().then(console.log("okay"));

  //   it('it should GET all the books', (done) => {
  //     request(app).get('/api/v1/users')
  //       .then((res)=>{
  //           expect(res.statusCode).to.equal(200);
  //           console.log(res.body);
  //           expect(res.body).to.have.length(2);
  //           done();
  //       })
  //       .catch((err) => done(err))
  //   });
  //   User.find().then((res) => {
  //     console.log(res)
  //     done()
  //   })
  // });

  after((done) => {
    server.close();
    done();
  })

});
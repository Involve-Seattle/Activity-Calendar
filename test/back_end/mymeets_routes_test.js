// 'use strict';

// var chai = require('chai');
// var chaihttp = require('chai-http');
// var MyMeet = require('../../models/mymeets');
// chai.use(chaihttp);

// require('../../server');

// var expect = chai.expect;
// var email = new Buffer('testMeets@example.com', 'ascii').toString('base64');
// var password = new Buffer('testtest', 'ascii').toString('base64');
// var token;

// before(function(done) {
//   MyMeet.remove({}, function(err) {
//     if (err) return console.log(err + ' dusting');
//     console.log('db cleared');
//   });

//   chai.request('http://localhost:3000')
//   .post('/api/newUser')
//   .send({
//     email: email,
//     password: password,
//     passwordConfirmation: password,
//     locations: [{
//       cityName: 'testCity'
//     }]
//   })
//   .end(function(err, res) {
//     token = res.body.jwt;
//     done();
//   });
// });

// after(function(done) {
//   MyMeet.remove({}, function(err) {
//     if (err) return console.log(err + ' dusting');
//     console.log('db cleared');
//     done();
//   });
// });

// describe('mymeets crud', function() {

//   it('should create a mymeet', function(done) {
//     chai.request('http://localhost:3000')
//     .post('/api/mymeet')
//     // .set({jwt:token})
//     .send({
//       userName: 'testtest',
//       myMeetTitle: 'Test Title',
//       myMeetAddress: 'test 123 teststate, ts 12345',
//       myMeetTime: 'Date',
//       invitees: [
//         {
//           name: 'testName',
//           email: 'test@example.com'
//       }]
//     })
//     .end(function(err, res) {
//       expect(err).to.eql(null);
//       MyMeet.findOne({userName:'testtest'}, function(err, data) {
//         expect(data.myMeetTitle).to.eql('Test Title');
//       });
//       done();
//     });
//   });

// });

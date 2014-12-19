'use strict';

module.exports = function(userInfo) {
  if (userInfo.password !== '' && userInfo.email !== '') {
    var passwordConfirmation = 'none given';
    var email = new Buffer(userInfo.email, 'base64').toString('ascii');
    var password = new Buffer(userInfo.password, 'base64').toString('ascii');
    if (userInfo.passwordConfirmation) {
      passwordConfirmation = new Buffer(userInfo.passwordConfirmation, 'base64').toString('ascii');
    }
  };
  return {email:email, password:password, passwordConfirmation: passwordConfirmation};
};

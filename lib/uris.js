'use strict';

var api = exports.api = 'api.github.com';

var credentials = exports.credentials = function (uname, pwd) {
  return [uname, pwd].map(encodeURIComponent).join(':');
};

exports.create = function (uname, pwd) {
  return 'https://' + credentials(uname, pwd) + '@' + api + '/user/repos';
};

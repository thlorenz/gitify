'use strict';

var request = require('request')
  , uris = require('./uris');

var create = module.exports = function (user, password, repo, repodesc, cb) {
  var body = {
      name          :  repo 
    , description   :  repodesc 
    , homepage      :  'https://github.com'
    , private       :  false
    , has_issues    :  true
    , has_wiki      :  false
    , has_downloads :  true
  };

  var opts = {
      uri     :  uris.create(user, password)
    , json    :  true
    , body    :  body
    , headers :  { 'user-agent': 'gitify' }
  };

  request.post(opts, function (err, res, body) {
    if (err) return cb(err);
    if (!/^2\d\d$/.test(res.statusCode)) return cb({ err: body, statusCode: res.statusCode });
    
    cb(null, { message: repo + ' for user ' + user + ' successfully created' });
  });
};

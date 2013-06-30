'use strict';

var createRepo  =  require('./lib/create-repo')
  , initRepo    =  require('./lib/init-repo')
  , credentials =  require('./lib/credentials')
  , reponame    =  require('./lib/reponame');


var gitify = module.exports = function (opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  credentials(opts, function (err, creds) {
    if (err) return cb(err);
    createRepo(
        creds.uname
      , creds.pwd
      , opts.name        || reponame()
      , opts.description || ''
      , oncreated
    );
  });

  function oncreated (err) {
    if (err) return cb(err);
    initRepo(cb);
  }
};

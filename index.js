'use strict';

var createRepo  =  require('./lib/create-repo')
  , initRepo    =  require('./lib/init-repo')
  , credentials =  require('./lib/credentials')
  , getRepo     =  require('./lib/repo');


var go = module.exports = function (opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }
  var repo = opts.repo || getRepo();

  credentials(opts, function (err, creds) {
    if (err) return cb(err);
    
    createRepo(
        creds.user
      , creds.password
      , repo
      , opts.description || ''
      , oncreated
    );

    function oncreated (err) {
      if (err) return cb(err);
      initRepo(creds.user, repo, cb);
    }
  });
};

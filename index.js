'use strict';

var createRepo  =  require('./lib/create-repo')
  , initRepo    =  require('./lib/init-repo')
  , credentials =  require('./lib/credentials')
  , getRepo     =  require('./lib/repo')
  , hubCreate   =  require('./lib/hub-create');

var go = module.exports = function (opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }
  opts.repo = opts.repo || getRepo();
  opts.description = opts.description || ''

  if (opts.noCreate) {
    return oncreated()
  } else if (opts.alwaysHub) {
    return hubCreate(opts, function (err, msg) {
      if (err) {
        return cb(err);
      }

      console.log(msg);
      oncreated();
    })
  } else {
    return getNodeCreds(opts, oncreated)
  } 

  function oncreated (err) {
    if (err) return cb(err);
    initRepo(opts.user, opts.repo, {
      message: opts.message,
      gitRemote: opts.gitRemote,
      cwd: opts.directory
    }, cb);
  }
};

function getNodeCreds(opts, cb) {
  credentials(opts, function (err, creds) {
    if (err) return cb(err);
    
    opts.user = opts.user || creds.user

    createRepo(
        creds.user
      , creds.password
      , opts.repo
      , opts.description
      , cb
    );
  });
}

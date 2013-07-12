'use strict';

var promfig     =  require('promfig');
var configurate =  require('configurate');

var properties = { 
    user      :  'Please enter your github username :  '
  , password  :  'Please enter your github password :  '
  , '@secret' :  'password'
};

var config = {
    configDir  :  '.config'
  , configFile :  'gitify.js'
  , edit       :  promfig.bind(null, properties)
};

var go = module.exports = function (opts, cb) {
  // nothing to do in case all credentials were supplied, i.e. via the commandline
  // Note: only supplying either one will ignore it and still use configurator
  if (opts.user && opts.password) 
    return setImmediate(cb.bind(null, null, { user: opts.user, password: opts.password }));

  configurate(config, cb)
    .on('loaded-config', function (path) {
      console.error('loaded config from: ', path);
    });
};

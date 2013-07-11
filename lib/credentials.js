'use strict';

var promfig     =  require('promfig');
var configurate =  require('configurate');

var properties = { 
    user      :  'Please enter your github username :  '
  , password  :  'Please enter your github password :  '
  , '@secret' :  'password'
};

var opts = {
    configDir  :  '.config'
  , configFile :  'gittify.js'
  , edit       :  promfig.bind(null, properties)
};

module.exports = configurate.bind(null, opts);

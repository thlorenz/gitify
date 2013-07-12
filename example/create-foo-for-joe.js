'use strict';

var gitify = require('..');

// change user and password to match your github account to see it in action
gitify(
  { user     :  'joe'
  , password :  'secret'
  , repo     :  'foo'   // if no repo is given, the current folder name is used
  }
  , function (err) {
    if (err) return console.error('err: ', err);
    
    console.log('Success');
  }
);

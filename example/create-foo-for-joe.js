'use strict';

var gitify = require('..');

// change username and password to match your github account to see it in action
gitify(
  { username: 'joe'
  , password: 'secret'
  , reponame: 'foo'   // if no reponame is given, the current folder name is used
  }
  , function (err) {
    if (err) return console.error('err: ', err);
    
    console.log('Success');
  }
);

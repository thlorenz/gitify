'use strict';

var path = require('path');

var gitify = require('..');

// change user and password to match your github account to see it in action
gitify({ 
  user: 'Raynos',
  repo: 'bar',
  message: 'initial commit',
  description: 'a bar repo',
  alwaysHub: true,
  directory: path.join(process.cwd(), 'bar')
}, function (err) {
    if (err) return console.error('err: ', err);
    
    console.log('Success');
  }
);

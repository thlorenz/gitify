#!/usr/bin/env node

var gitify = require('..')
  , argv = process.argv;

var repo     =  argv[2]
  , password =  argv[3]
  , user     =  argv[4];
  
gitify(
    { user     :  user
    , password :  password
    , repo     :  repo 
    }
  , function (err) {
      if (err) { 
        console.error(err);
        if (err.err && err.err.errors) console.error(err.err.errors);
        return;
      }
      console.log('The current directory was successfully gitified.');
    }
);

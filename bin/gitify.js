#!/usr/bin/env node

var gitify = require('..')
  , argv = process.argv;

var repo        =  argv[2]
  , description =  argv[3]
  , user        =  argv[4]
  , password    =  argv[5];
  
gitify(
    { user        :  user
    , password    :  password
    , repo        :  repo
    , description :  description
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

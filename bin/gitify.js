#! /usr/bin/env node

var gitify = require('..')
  , argv = process.argv;

var reponame = argv[2]
  , password = argv[3]
  , username = argv[4];
  
gitify({ 
    username: username
  , password: password
  , reponame: reponame }
  , function (err) {
  if (err) return console.error(err);
  console.log('The current directory was successfully gitified.');
});

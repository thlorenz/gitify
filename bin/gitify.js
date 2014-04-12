#!/usr/bin/env node

var parseArgs = require('minimist')

var printHelp = require('./help.js')
var gitify = require('..')

var opts = parseArgs(process.argv);

if (opts.h || opts.help || opts._[0] === 'help') {
  return printHelp(opts)
}

opts.repo        = opts.repo        || opts._[0]
opts.description = opts.description || opts._[1]
opts.gitRemote   = opts.gitRemote   || opts['git-remote']
opts.noCreate    = opts.noCreate    || opts['no-create']
opts.alwaysHub   = opts.alwaysHub   || opts['always-hub']

gitify(opts, function (err) {
  if (err) { 
    console.error(err);
    if (err.err && err.err.errors) console.error(err.err.errors);
    return;
  }

  var directory = opts.directory || process.cwd()

  console.log('The directory %s was successfully gitified.', directory);
})

'use strict';

var spawn = require('child_process').spawn
  , runnel = require('runnel');

function gitrun (cmds, cwd, cb) {
  var git = spawn('git', cmds, {
    cwd: cwd
  })

  git.stdout.on('data', function (d) { 
    console.log(d.toString()); 
  });

  git.stderr.on('data', function (d) { 
    // The following logs on stderr which is not indicating an error, so just log it
    // To git@github.com:thlorenz/test-gitify.git
    //     d9ad070..4f8ebfd  master -> master
    console.error(d.toString()); 
  });

  git.on('close', function (code) {
    if (code !== 0) cb(new Error('git ' + cmds.join(' ') + ' returned with code ' + code));
    cb();
  });
}

var initRepo = module.exports = function (user, repo, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }

  var message = opts.message || 'initial repository'
  var gitRemote = opts.gitRemote || 'git@github.com'
  var cwd = opts.cwd || process.cwd()

  runnel(
      gitrun.bind(0, ['init'], cwd)
    , gitrun.bind(0, ['add', '.'], cwd)
    , gitrun.bind(0, [ 'commit' , '--message', message ], cwd)
    , gitrun.bind(0, [ 'remote' , 'add' , 'origin' , gitRemote + ':' + user + '/' + repo + '.git' ], cwd)
    , gitrun.bind(0, [ 'push' , '--set-upstream' , 'origin' , 'master' ], cwd)
    , cb
  );
};

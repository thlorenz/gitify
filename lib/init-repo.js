'use strict';

var spawn = require('child_process').spawn
  , runnel = require('runnel');

function gitrun (cmds, cb) {
  var git = spawn('git', cmds)
  var errMsg = '';

  git.stdout.on('data', function (d) { 
    console.log(d.toString()); 
  });

  git.stderr.on('data', function (d) { errMsg += d; })

  git.on('close', function (code) {
    if (errMsg) return cb(new Error(errMsg));
    if (code !== 0) cb(new Error('git ' + cmds.join(' ') + ' returned with code ' + code));
    cb();
  });
}

var initRepo = module.exports = function (uname, reponame, cb) {
  runnel(
      gitrun.bind(0, ['init'])
    , gitrun.bind(0, ['add', '.'])
    , gitrun.bind(0, ['commit','-m', '"initial repository"' ])
    , gitrun.bind(0, ['remote', 'add', 'origin', 'git@github.com:' + uname + '/' + reponame + '.git' ])
    , gitrun.bind(0, ['push', 'origin', 'master' ])
    , cb
  );
};

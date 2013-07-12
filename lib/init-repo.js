'use strict';

var spawn = require('child_process').spawn
  , runnel = require('runnel');

function gitrun (cmds, cb) {
  var git = spawn('git', cmds)

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

var initRepo = module.exports = function (user, repo, cb) {
  runnel(
      gitrun.bind(0, ['init'])
    , gitrun.bind(0, ['add', '.'])
    , gitrun.bind(0, ['commit','-m', '"initial repository"' ])
    , gitrun.bind(0, ['remote', 'add', 'origin', 'git@github.com:' + user + '/' + repo + '.git' ])
    , gitrun.bind(0, ['push', 'origin', 'master' ])
    , cb
  );
};

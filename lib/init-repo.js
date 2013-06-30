'use strict';

var spawn = require('child_process').spawn
  , runnel = require('runnel');

function gitrun (cmds, cb) {
  var gitinit = spawn('git', cmds)
  var errMsg = '';

  gitinit.stdout.on('data', function (d) { 
    console.log(d.toString()); 
  });

  gitinit.stderr.on('data', function (d) { errMsg += d; })

  gitinit.on('close', function (code) {
    if (errMsg) return cb(new Error(errMsg));
    if (code !== 0) cb(new Error('git ' + cmds.join(' ') + ' returned with code ' + code));
    cb();
  });
}

var initRepo = module.exports = function (cb) {
  runnel(
      gitrun.bind(0, ['init'])
    , gitrun.bind(0, ['add', '.'])
    , gitrun.bind(0, ['commit','-m', '"initial package"' ])
    , gitrun.bind(0, ['push', 'origin', 'master' ])
    , cb
  );
};

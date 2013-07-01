'use strict';
/*jshint asi: true */

var test = require('tape')
  , rmrf = require('rimraf')
  , spawn = require('child_process').spawn
  , path = require('path')
  , initRepo = require('../lib/init-repo')

function hackFunctionBind () {
  // HACK: cannot push to remote during tests, so we'll have to hack Function.bind a bit 
  var function_bind = Function.prototype.bind;
  Function.prototype.bind = function (this_, arg) {
    if (arg && arg[0] === 'push' && arg[1] === 'origin') 
      return function (cb) { setTimeout(cb, 5) }

    return function_bind.apply(this, arguments);
  }
}


function gitcmd (cmds, cb) {
  var cmd = spawn('git', cmds)
  var msg = '';

  cmd.stdout.on('data', function (d) { 
    msg += d
  });

  cmd.stderr.on('data', console.error)
  cmd.on('close', function (code) {
    cb(msg);
  });
}

test('\ninit repo create repository, adds all files, adds remote and commits', function (t) {

  var repodir = path.join(__dirname, 'fixtures', 'init-repo')

  rmrf(path.join(repodir, '.git'), function (err) {
    if (err) return t.fail(err)

    var cwd = process.cwd()
    process.chdir(repodir)

    hackFunctionBind()

    initRepo('joe', 'joerepo', function (err) {
      gitcmd([ 'log', '--oneline' ], function (res) {
        var msg = res.split(' ').splice(1).join(' ')
        t.equal('"initial repository"\n', msg, 'includes first commit')

        gitcmd([ 'remote', '-v' ], function (res) {
          t.deepEqual(
              res.split('\n')
            , [ 'origin	git@github.com:joe/joerepo.git (fetch)'
              , 'origin	git@github.com:joe/joerepo.git (push)'
              , ''
              ]
            , 'adds origin remotes'
          )
          rmrf(path.join(repodir, '.git'), function () {
            process.chdir(cwd)
            t.end()
          })
        })
      })
    })
  })
})

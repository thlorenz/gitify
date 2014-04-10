var exec = require('child_process').exec

module.exports = hubCreate

function hubCreate(opts, cb) {
  var name = opts.user + '/' + opts.repo
  var cmd = 'hub create ' + name + ' -d \'' + opts.description + '\''

  exec(cmd, function (err, stdout, stderr) {
    if (err) {
      return cb(err)
    }

    if (stderr) {
      return cb(new Error(stderr))
    }

    cb(null, stdout)
  })
}

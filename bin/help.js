var msee = require('msee')
var fs = require('fs')
var path = require('path')
var template = require('string-template')

function printHelp(opts) {
  opts = opts || {}

  var loc = path.join(__dirname, 'usage.md')
  var content = fs.readFileSync(loc, 'utf8')

  content = template(content, {
    cmd: opts.cmd || 'gitify',
    options: opts.helpOptions || ''
  })

  return console.log(msee.parse(content, {
    paragraphStart: '\n'
  }))
}

module.exports = printHelp

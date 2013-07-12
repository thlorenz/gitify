'use strict';

var path = require('path');
module.exports = function () {
  return path.basename(process.cwd());
};

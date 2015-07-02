/* jshint node: true */
var fs = require('fs');

module.exports = {
  normalizeEntityName: function() {},
  afterInstall: function() {
    var path = this.project.root + '/app/webfont-svg';
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  }
};

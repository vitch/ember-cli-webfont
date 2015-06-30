/* jshint node: true */
/* global require, module */

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

/*
  This Brocfile specifes the options for the dummy test app of this
  addon, located in `/tests/dummy`

  This Brocfile does *not* influence how the addon or the app using it
  behave. You most likely want to be modifying `./index.js` or app's Brocfile
*/

var app = new EmberAddon({
  webfont: {
    path: 'tests/dummy/app/webfont/svg/',
    options: {
      dest: 'dummy/public/webfonts/',
      fontName: 'ember-cli-webfont'
    }
  }
});

module.exports = app.toTree();

/* jshint node: true */
'use strict';

var merge = require('merge');
var webfont = require('broccoli-webfont');

module.exports = {
  name: 'ember-cli-webfont',

  options: function() {
    var webfontOptions = this.app.options.webfont || {};
    return merge(true, {}, {
      files: ['**/*.svg'],
      dest: 'webfonts/',
      cssDest: 'webfont.scss',
      fontName: 'iconfont',
      cssFontsPath: 'webfonts/',
      cssTemplate: webfont.templates.scss,
      templateOptions: {
        classPrefix: 'iconfont-',
        baseclass: 'iconfont'
      }
    }, webfontOptions.options || {});
  },

  treeForPublic: function() {
    var path = this.app.options.webfont.path || 'app/webfont/svg';
    var options = this.options();
    var fontTree = webfont(path, options);
    return fontTree;
  }
};

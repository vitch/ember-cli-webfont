/* jshint node: true */
'use strict';

var Funnel = require('broccoli-funnel');
var glob = require('glob');
var merge = require('merge');
var webfont = require('broccoli-webfont');

module.exports = {
  name: 'ember-cli-webfont',

  options: function() {
    var webfontOptions = this.app.options.webfont || {};
    return merge(true, {}, {
      files: ['**/*.svg'],
      dest: 'assets/webfonts/',
      fontName: 'iconfont',
      cssFontsPath: 'webfonts/',
      cssTemplate: webfont.templates.css,
      templateOptions: {
        classPrefix: 'iconfont-',
        baseClass: 'iconfont'
      }
    }, webfontOptions.options || {});
  },

  // Seems a bit expensive but can't figure out how to do this the "broccoli way"
  // So that we can guard the various calls below to not fail when directory is
  // missing or empty
  hasSvgs: function() {
    var path = this.webfontPath();
    return this.options().files.some(function(pattern) {
      return glob.sync(pattern, { cwd: path }).length > 0;
    });
  },

  webfontPath: function() {
    var path = 'app/webfont/svg';
    if (this.app.options.webfont && this.app.options.webfont.path) {
      path = this.app.options.webfont.path;
    }
    return path;
  },

  treeForStyles: function() {
    if (this.hasSvgs()) {
      var path = this.webfontPath();
      var options = merge(true, {
          css: true,
          cssDest: 'temp/ember-cli-webfont.css'
        }, this.options());
      var cssTree = webfont(path, options);
      cssTree = new Funnel(cssTree, {
        include: [new RegExp(/\.css$/)]
      });
      return cssTree;
    }
  },

  treeForPublic: function() {
    var path = this.webfontPath();
    var options = merge(true, { css:false }, this.options());
    var fontTree = webfont(path, options);
    return fontTree;
  },

  included: function(app) {
    this._super.included(app);
    if (this.hasSvgs()) {
      app.import('temp/ember-cli-webfont.css');
    }
  }
};

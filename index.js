/* jshint node: true */
'use strict';

var Funnel = require('broccoli-funnel');
var merge = require('merge');
var mergeTrees  = require('broccoli-merge-trees');
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

  webfontPath: function() {
    var path = 'app/webfont-svg';
    if (this.app.options.webfont && this.app.options.webfont.path) {
      path = this.app.options.webfont.path;
    }
    return path;
  },

  treeForStyles: function() {
    var path = this.webfontPath();
    var options = merge(true, {
        css: true,
        cssDest: 'temp/ember-cli-webfont.css'
      }, this.options());
    var cssTree = webfont(path, options);

    cssTree = new Funnel(cssTree, {
      include: [new RegExp(/\.css$/)]
    });

    // Nasty way to deal with an error when there is no SVG files in the specified path
    // We merge with an empty CSS file so there isn't an error when we `app.import`
    // But I can't find a path which doesn't change dependent on whether you are developing
    // the addon or your app.
    var watchDir = 'vendor/';
    if (!this.isDevelopingAddon()) {
      watchDir = 'node_modules/ember-cli-webfont/' + watchDir;
    }
    return mergeTrees([watchDir, cssTree], { overwrite: true });
  },

  treeForPublic: function() {
    var path = this.webfontPath();
    var options = merge(true, { css:false }, this.options());
    var fontTree = webfont(path, options);
    return fontTree;
  },

  included: function(app) {
    this._super.included(app);
    app.import('temp/ember-cli-webfont.css');
  }
};

'use strict';

var Funnel = require('broccoli-funnel');
var merge = require('merge');
var MergeTrees = require('broccoli-merge-trees');
var Webfont = require('./utils/webfont');

module.exports = {
  name: 'ember-cli-webfont',

  options: function() {
    var webfontOptions = this.app.options.webfont || {};
    return merge(true, {}, {
      files: ['**/*.svg'],
      dest: 'assets/webfonts/',
      fontName: 'iconfont',
      cssFontsUrl: 'webfonts/',
      cssTemplate: Webfont.templates.css,
      templateOptions: {
        classPrefix: 'iconfont-',
        baseSelector: 'iconfont'
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
    const path = new Funnel(this.webfontPath(), { include: this.options().files });
    var options = merge(true, {
        css: true,
        cssDest: 'temp/ember-cli-webfont.css'
      }, this.options());
    const webfont = new Webfont([path], options);
    const cssTree = new Funnel(webfont, {
      include: [new RegExp(/\.css$/)]
    });

    // Nasty way to deal with an error when there is no SVG files in the specified path
    // We merge with an empty CSS file so there isn't an error when we `app.import`
    // But I can't find a path which doesn't change dependent on whether you are developing
    // the addon or your app.
    var dummyWatchDir = 'vendor/';
    if (!this.isDevelopingAddon()) {
      dummyWatchDir = 'node_modules/ember-cli-webfont/' + dummyWatchDir;
    }
    return new MergeTrees([dummyWatchDir, cssTree], { overwrite: true });
  },

  treeForPublic: function() {
    const path = new Funnel(this.webfontPath(), { include: this.options().files });
    const options = merge(true, { css: false }, this.options());
    const webfont = new Webfont([path], options);

    return webfont;
  },

  included: function(app) {
    this._super.included(app);

    this.app = app;

    app.import('temp/ember-cli-webfont.css');
  }
};

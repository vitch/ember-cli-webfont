/* jshint node: true */
'use strict';

var Funnel = require('broccoli-funnel');
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
        baseclass: 'iconfont'
      }
    }, webfontOptions.options || {});
  },

  treeForStyles: function() {
    var path = this.app.options.webfont.path || 'app/webfont/svg';
    var options = merge(true, {
        css:true,
        cssDest: 'temp/ember-cli-webfont.css'
      }, this.options());
    var cssTree = webfont(path, options);
    cssTree = new Funnel(cssTree, {
      include: [new RegExp(/\.css$/)]
    });

    return cssTree;
  },

  treeForPublic: function() {
    var path = this.app.options.webfont.path || 'app/webfont/svg';
    var options = merge(true, { css:false }, this.options());
    var fontTree = webfont(path, options);
    return fontTree;
  },

  included: function(app) {
    this._super.included(app);
    app.import('temp/ember-cli-webfont.css');
  }
};

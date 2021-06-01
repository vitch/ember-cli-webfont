'use strict';

const Plugin = require('broccoli-caching-writer')
const webfontsGenerator = require('@vusion/webfonts-generator');
const path = require('path');
const dirmatch = require('dirmatch');
const _ = require('underscore');

Webfont.prototype = Object.create(Plugin.prototype);
Webfont.prototype.constructor = Webfont;
function Webfont(inputNodes, options) {
  options = options || {};
  Plugin.call(this, inputNodes, {
    annotation: options.annotation
  });
  this.options = options;
}

Webfont.prototype.build = function() {
  const inputPath = this.inputPaths[0];

  const files = dirmatch(inputPath, this.options.files);
  const absFiles = _.map(files, function(file) {
    return path.join(inputPath, file);
  })

  const webfontsOptions = _.extend({}, this.options);
  webfontsOptions.files = absFiles;

  _.each(['dest', 'cssDest', 'htmlDest'], function(option) {
    let value = this.options[option];
    if (value !== undefined) webfontsOptions[option] = path.join(this.outputPath, value);
  }, this)

  return new Promise(function(resolve, reject) {
    webfontsGenerator(webfontsOptions, function(error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

Webfont.templates = webfontsGenerator.templates;

module.exports = Webfont;

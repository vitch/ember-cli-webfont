# Ember-cli-webfont

This addon wraps [broccoli-webfont](https://github.com/sunflowerdeath/broccoli-webfont) to allow you to easily generate webfonts as part of your ember build process.

## Usage

By default the addon expects to find your SVG files in `app/webfont/svg` and will generate `app/styles/webfont.scss` which you can include in your `app.scss`. Icons will be named based on the filenames of the loaded SVG files.

## Configuration

You can configure the behaviour of the addon by passing a hash of options when initialising your ember app. The names of parameters and default options are shown below:

```js
var app = new EmberApp({
  webfont: {
    path: 'app/webfont/svg/',
    options: {
      files: ['**/*.svg'],
      dest: 'public/webfonts/',
      cssDest: 'app/styles/webfont.scss',
      fontName: 'iconfont',
      cssFontsPath: 'webfonts/',
      cssTemplate: webfont.templates.scss,
      templateOptions: {
        classPrefix: 'iconfont-',
        baseclass: 'iconfont'
      }
    }
  }
});
```

Documentation on these options can be found on the [broccoli-webfont](https://github.com/sunflowerdeath/broccoli-webfont) and [webfonts-generator](https://github.com/sunflowerdeath/webfonts-generator#list-of-options) repositories.

# Developing addon

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

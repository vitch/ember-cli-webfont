# ember-cli-webfont

This addon wraps [webfonts-generator](https://github.com/sunflowerdeath/webfonts-generator) to allow you to easily generate webfonts as part of your ember build process.

## Installation

```js
ember install ember-cli-webfont
```

## Usage

By default the addon expects to find your SVG files in `app/webfont-svg` and will add CSS classes to your generated CSS.

To use the icons you just need to give an element these classes e.g.

```html
<span class="iconfont iconfont-ember"></span>
```

Will display the SVG from `app/webfont-svg/ember.svg` (with the default values for `path`, `classPrefix` and `baseSelector` - see below).

## Configuration

You can configure the behaviour of the addon by passing a hash of options when initialising your ember app. The names of parameters and default options are shown below:

```js
var app = new EmberApp({
  webfont: {
    path: 'app/webfont-svg/',
    options: {
      files: ['**/*.svg'],
      dest: 'assets/webfonts/',
      fontName: 'iconfont',
      cssDest: 'temp/ember-cli-webfont.css',
      cssFontsUrl: 'webfonts/',
      cssTemplate: webfont.templates.css,
      templateOptions: {
        classPrefix: 'iconfont-',
        baseSelector: '.iconfont'
      }
    }
  }
});
```

Documentation on these options can be found on the [webfonts-generator](https://github.com/sunflowerdeath/webfonts-generator#list-of-options) repository.

Additionally the `cssDest` option can go through some extra processing.
If left out, the default value is `temp/ember-cli-webfont.css` and the resulting file will be imported into `vendor.css` automatically.
Otherwise it has to be imported manually. The latter is useful when using `Sass`, `LESS`, or other CSS preprocessors.

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

# omeka-image-display

A simple plugin for [Omeka](https://omeka.org/) that adds improved
image display layouts to exhibits.

## Features

The plugin adds an overlay to images that allows zooming by scrolling
and panning by dragging accross the screen. This is useful for large
images, since with omeka's defaults these are only show as an inline
image.

Configuration allows

* Enabling the plugin on item pages
* Setting the zoom speed
* Setting the maximum zoom level
* Setting the minimum zoom level

The first feature is useful if the view is only required on exhibit
pages, since the exhibit support is done through individual
layouts. This can improve page loading times on image pages.

The zoom speed is a factor by which each scroll tick zooms the
image. If the default feels odd, you can modify this value to your
liking.

The zoom levels restrict the zoom depths. This is useful, since
accidental scrolling or just user error may result in strange zooms -
this way, we restrict the user to reasonable levels.

Some projects may require larger zooms, some might not need as much or
only want a larger image display - for such projects these settings
exist.

They can also help with performance issues, since zooming in can
affect system performance.


## Compilation

To compile the project, [Stylus](http://stylus-lang.com/) and
[Google closure](https://developers.google.com/closure/compiler/) are
required, with executables named `stylus` and `closure` in the PATH
respectively (the google closure compiler can be wrapped inside a bash
script that executes the jar and passes all arguments).

Ensure you either clone the project using `git clone --recursive` or
run `git submodule init && git submodule update` after cloning.

Then, simply execute `make` in the root directory of the project.

## Installation

Compilation will create a directory named "ImageDisplay" - the
plugin. Ensure the correct permissions are set, usually:

```bash
find ImageDisplay -type f -exec chmod 644 {} +
find ImageDisplay -type d -exec chmod 755 {} +
```

and move this directory to the omeka plugins directory.

After the plugin is installed, ensure that the fullsize image
derivative size is large enough. The setting can be found in the
"Settings" menu of the "Appearances" page.

At least 1000000 pixels is recommended.

## Documentation

Documentation is available through https://uomresearchit.github.io/omeka-image-display/

To compile the documentation, [JSDoc](http://usejsdoc.org/) and [phpDocumentor](https://www.phpdoc.org/) are required. Simply run `make documentation` in the root. This will create a "documentation" directory.

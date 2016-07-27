# omeka-image-display

A simple plugin for [Omeka](https://omeka.org/) that adds improved
image display layouts to exhibits.

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

To compile the documentation, [JSDoc](http://usejsdoc.org/) is required. Simply run make documentation in the root. This will create a "documentation" directory, containing js_doc for the javascript documentation.

src_files = ImageDisplayPlugin.php plugin.ini

lib_files =  ImageDisplayLayoutHelper.class.php
lib_dir = libraries

# The directories and files for individual layouts
layout_names = image-display-gallery image-display-file
layout_files = form.php layout.css layout.php
layout_dirs = $(addprefix views/shared/exhibit_layouts/, $(layout_names))

javascript_files = viewer.js
javascript_dir = views/shared/javascripts

css_files = image-viewer.css
css_dir = views/shared/css

image_files = ajax-loader.gif
image_dir = views/shared/images

public_view_files = image-display-show.php
public_view_dir = views/public/common

additional_files = views/admin/config.php

ImageDisplay: css javascript
	# Create and copy the directory of each layout
	for layout in $(layout_dirs); do \
		mkdir -p "$@/$$layout"; \
		for file in $(layout_files); do \
			cp "src/$$layout/$$file" "$@/$$layout/$$file"; \
		done; \
	done

	for file in $(additional_files); do \
		mkdir -p "$@/`dirname $$file`"; \
		cp "src/$$file" "$@/`dirname $$file`"; \
	done

	mkdir -p $@/$(public_view_dir)
	mkdir -p $@/$(javascript_dir)
	mkdir -p $@/$(lib_dir)
	mkdir -p $@/$(image_dir)
	mkdir -p $@/$(css_dir)

	cp $(addprefix src/$(public_view_dir)/,$(public_view_files)) $@/$(public_view_dir)
	cp $(addprefix src/$(javascript_dir)/,$(javascript_files)) $@/$(javascript_dir)
	cp $(addprefix src/$(image_dir)/,$(image_files)) $@/$(image_dir)
	cp $(addprefix src/$(lib_dir)/,$(lib_files)) $@/$(lib_dir)
	cp $(addprefix src/$(css_dir)/,$(css_files)) $@/$(css_dir)
	cp $(addprefix src/,$(src_files)) $@

	cp src/$(javascript_dir)/object-fit-images/dist/ofi.browser.js $@/$(javascript_dir)

.PHONY: css javascript clean documentation

css:
	# Compile the CSS of each layout
	for layout in $(layout_dirs); do \
		$(MAKE) -C src/"$$layout"; \
	done
	# Compile the generic CSS
	$(MAKE) -C src/$(css_dir)

javascript:
	$(MAKE) -C src/$(javascript_dir)

clean:
	-rm -r ImageDisplay
	-rm -r documentation
	# Run the clean target of each layout
	for layout in $(layout_dirs); do \
		$(MAKE) -C src/"$$layout" clean; \
	done
	$(MAKE) -C src/$(javascript_dir) clean

documentation: js_doc php_doc

js_doc:
	$(MAKE) -C src/$(javascript_dir) documentation
	mkdir -p documentation
	cp -r src/$(javascript_dir)/out documentation/js_doc

php_doc:
	mkdir -p documentation
	phpdoc -d src -t documentation/php_doc

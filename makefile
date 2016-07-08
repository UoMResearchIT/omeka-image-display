src_files = ImageDisplayPlugin.php plugin.ini

layout_lib_files =  ImageDisplayLayoutHelper.class.php
layout_lib_dir = views/shared/exhibit_layouts

gallery_layout_files = form.php layout.css layout.php
gallery_layout_dir = views/shared/exhibit_layouts/image-display-gallery

javascript_files = viewer.js
javascript_dir = views/shared/javascripts

image_files = ajax-loader.gif
image_dir = views/shared/images


ImageDisplay: css javascript
	mkdir -p $@/$(gallery_layout_dir)
	mkdir -p $@/$(javascript_dir)
	mkdir -p $@/$(layout_lib_dir)
	mkdir -p $@/$(image_dir)

	cp $(addprefix src/,$(src_files)) $@
	cp $(addprefix src/$(gallery_layout_dir)/,$(gallery_layout_files)) $@/$(gallery_layout_dir)
	cp $(addprefix src/$(javascript_dir)/,$(javascript_files)) $@/$(javascript_dir)
	cp $(addprefix src/$(layout_lib_dir)/,$(layout_lib_files)) $@/$(layout_lib_dir)
	cp $(addprefix src/$(image_dir)/,$(image_files)) $@/$(image_dir)


.PHONY: css javascript clean

css:
	$(MAKE) -C src/$(gallery_layout_dir)

javascript:
	$(MAKE) -C src/$(javascript_dir)

clean:
	-rm -r ImageDisplay
	$(MAKE) -C src/$(gallery_layout_dir) clean
	$(MAKE) -C src/$(javascript_dir) clean

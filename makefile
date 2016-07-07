src_files = ImageDisplayPlugin.php plugin.ini

layout_files = form.php ImageDisplayLayoutHelper.class.php layout.php layout.css
layout_dir = views/shared/exhibit_layouts/image-display

javascript_files = viewer.js
javascript_dir = views/shared/javascripts


ImageDisplay: css javascript
	mkdir -p $@/$(layout_dir)
	mkdir -p $@/$(javascript_dir)

	cp $(addprefix src/,$(src_files)) $@
	cp $(addprefix src/$(layout_dir)/,$(layout_files)) $@/$(layout_dir)
	cp $(addprefix src/$(javascript_dir)/,$(javascript_files)) $@/$(javascript_dir)


.PHONY: css javascript clean

css:
	$(MAKE) -C src/views/shared/exhibit_layouts/image-display/

javascript:
	$(MAKE) -C src/views/shared/javascripts/

clean:
	-rm -r ImageDisplay
	$(MAKE) -C src/$(layout_dir) clean
	$(MAKE) -C src/$(javascript_dir) clean

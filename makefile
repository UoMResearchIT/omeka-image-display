all: css javascript

.PHONY: css javascript

css:
	$(MAKE) -C views/shared/exhibit_layouts/image-display/

javascript:
	$(MAKE) -C views/shared/javascripts/

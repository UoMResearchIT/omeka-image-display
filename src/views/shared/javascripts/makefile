files = ImageDisplay.js Image.js Viewer.js main.js

viewer.js: $(files)
	closure --js $^ --js_output_file $@

documentation: $(files)
	jsdoc $^


.PHONY: clean

clean:
	-rm viewer.js

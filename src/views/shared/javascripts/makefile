files = ImageDisplay.js Image.js Viewer.js main.js

viewer.js: $(files)
	closure --js $^ --js_output_file $@

documentation: $(files)
	jsdoc -R ../../../../README.md $^


.PHONY: clean

clean:
	-rm viewer.js
	-rm -r out

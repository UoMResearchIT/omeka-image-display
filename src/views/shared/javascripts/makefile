files = ImageDisplay.js Image.js Viewer.js Controllable.js main.js\
        1579671/rAF.js

viewer.js: $(files)
	closure --js $^ --js_output_file $@

documentation: $(files)
	jsdoc -R ../../../../README.md $^


.PHONY: clean

clean:
	-rm viewer.js
	-rm -r out

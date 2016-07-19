/**
 * @file
 * Definition of the Viewer class that handles the image viewer
 * itself.
 *
 * @author Tristan Daniel Maat <tm@tlater.net>
 */

/**
 * Manages the image viewer interface.
 * @class
 */
ImageDisplay.Viewer = function ()
{
    /**
     * Image objects that correspond to the images displayed on
     * the page as well as in the viewer.
     * @private
     *
     * @member {ImageDisplay.Image[]} images
     */
    var images = [];

    /**
     * The index of the image currently displayed by the viewer. Set
     * to null if no images are being displayed.
     * @private
     *
     * @member {?number} currentImage
     */
    var currentImage = null;

    /**
     * The image display div. Set after init is called.
     * @private
     *
     * @member {?HTMLElement[]} div
     */
    var divs = null;

    /**
     * The keyboard controls function.
     * @function
     * @private
     *
     * @param {Object} event - The key event as fired by an eventListener.
     * @param {number} index -
     * The index of the image-display DOM element that fired the event.
     */
    function keyboardControls (event, index)
    {
        var code = event.keyCode || event.which;

        switch (code) {
        case 27:
            this.hide(index);
            break;

        default:
        }
    }

    /**
     * Return the corresponding viewer image and its metadata.
     * @private
     *
     * @param {number} i -
     * The index of the galleryImage in the combined className arrays
     * of the classes "layout-image-display-gallery-gallery-image" and
     * "layout-image-display-file".
     *
     * @return {Object} -
     * An object with the information encoded as .viewerImage and .metadata.
     */
    function findViewerImage (i)
    {
        var viewerImage =
            document.getElementsByClassName("layout-image-display-image")[i];
        var metadata =
            document.querySelectorAll(".image-display-container " +
                                      ".image-metadata")[i];

        return {
            "viewerImage": viewerImage,
            "metadata": metadata
        };
    }

    /**
     * Initialize the images array.
     * @function
     * @private
     */
    function initializeImages ()
    {
        var imageQuery = ".layout-image-display-container-image, " +
            ".item-file.image-jpeg .download-file";
        var containerImages = document.querySelectorAll(imageQuery);

        // Fill the images array. For each gallery image
        [].forEach.call(containerImages, function (containerImage, i) {
            // find the corresponding viewer image.
            var image = findViewerImage(i);

            // Create an Image object for the two, add it to the
            // images array, and finally initialize the object.
            images.push(new ImageDisplay.Image(containerImage,
                                               image.viewerImage,
                                               image.metadata));
            images[i].init();
        }.bind(this));
    }

    /**
     * Initialize the object. Calls the init function of
     * ImageDisplay.Image.
     * @function
     */
    this.init = function ()
    {
        // Find and set the image display div.
        divs = document.getElementsByClassName("image-display");

        // Add keyboard listeners.
        [].forEach.call(divs, function (div, i) {
            div.addEventListener("keydown", function (e) {
                keyboardControls.bind(this)(e, i);
            }.bind(this));
        }.bind(this));

        // Make the close buttons functional.
        var buttons =
            document.getElementsByClassName("image-display-close-button");
        [].forEach.call(buttons, function (button, i) {
            button.addEventListener("click", function () {

                console.log(i);

                this.hide(i);
            }.bind(this));
        }.bind(this));

        initializeImages();
    };

    /**
     * Show the image viewer.
     * @function
     *
     * @param {number} index - The index of the image-display to show.
     */
    this.show = function (index)
    {
        $(divs[index]).removeClass("hidden");
        divs[index].focus();
    };

    /**
     * Hide the image viewer.
     * @function
     *
     * @param {number} index - The index of the image-display to hide.
     */
    this.hide = function (index)
    {
        $(divs[index]).addClass("hidden");

        if (currentImage !== null)
            images[currentImage].hide();
        currentImage = null;
    };

    /**
     * Show the image with the given index as the current image.
     * @function
     *
     * @param {number} index -
     * The index of the image to be displayed to the user.
     */
    this.showImage = function (index)
    {
        if (index >= images.length) {
            console.error("The image with index " + index + " does not exist.");
            return;
        }

        if (currentImage !== null)
            images[currentImage].hide();
        images[index].show();

        currentImage = index;
    };
};

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
     * @member {?HTMLElement} div
     */
    var div = null;

    /**
     * The keyboard controls function.
     * @function
     * @private
     *
     * @param {Object} event - The key event as fired by an eventListener.
     */
    function keyboardControls (event)
    {
        var code = event.keyCode || event.which;

        switch (code) {
        case 27:
            this.hide();
            break;

        default:
        }
    }

    /**
     * Initialize the images array.
     * @function
     * @private
     */
    function initializeImages ()
    {
        // Fill the images array. For each gallery image
        [].forEach.call(
            document.getElementsByClassName("layout-image-display-gallery-image"),
            function (galleryImage, i) {
                // find the corresponding viewer image.
                var viewerImage = document.
                    getElementsByClassName("layout-image-display-image")[i];
                var metadata =
                    document.getElementsByClassName("element-set")[i];

                // Create an Image object for the two, add it to the
                // images array, and finally initialize the object.
                images.push(new ImageDisplay.Image(galleryImage,
                                                   viewerImage,
                                                   metadata));
                images[i].init();
            }.bind(this)
        );
    }

    /**
     * Initialize the object. Calls the init function of
     * ImageDisplay.Image.
     * @function
     */
    this.init = function ()
    {
        // Find and set the image display div.
        div = document.getElementById("image-display");

        // Add keyboard listeners.
        div.addEventListener("keydown", keyboardControls.bind(this));

        // Make the close button functional.
        var button = document.getElementById("image-display-close-button");
        button.addEventListener("click", this.hide.bind(this));

        initializeImages();
    };

    /**
     * Show the image viewer.
     * @function
     */
    this.show = function ()
    {
        $(div).removeClass("hidden");
        div.focus();
    };

    /**
     * Hide the image viewer.
     * @function
     */
    this.hide = function ()
    {
        $(div).addClass("hidden");

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

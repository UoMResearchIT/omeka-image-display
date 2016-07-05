/**
 * @file viewer.js
 * A script to add image navigation to omeka exhibits.
 *
 * @author Tristan Daniel Maat <tm@tlater.net>
 */

// Set jquery variable. Evil variable name, I know, but this should
// not affect anything, it's usually done by the library anyway.
$ = jQuery;                            // eslint-disable-line no-native-reassign

if (typeof ImageDisplay === "undefined")
    /**
     * @namespace
     */
    var ImageDisplay = {};

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
            console.log("Keypress received: " + code);
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

        // Add keyboard listeners
        div.addEventListener("keydown", keyboardControls.bind(this));

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

/**
 * An image to be displayed by the image viewer interface.
 * @class
 *
 * @param {HTMLElement} galleryImage -
 * The image displayed on the page that should display the
 * viewerImage when clicked.
 *
 * @param {HTMLElement} viewerImage -
 * The image to be displayed inside the viewer.
 */
ImageDisplay.Image = function (galleryImage, viewerImage, metadata)
{
    /**
     * The image in the layout's gallery.
     * @private
     *
     * @member {HTMLElement} galleryImage
     * @memberOf ImageDisplay.Image
     */

    /**
     * The image in the viewer.
     * @private
     *
     * @member {HTMLElement} viewerImage
     * @memberOf ImageDisplay.Image
     */

    /**
     * The metadata of the image that is to be displayed in the
     * viewer.
     * @private
     *
     * @member {HTMLElement} metadata
     * @memberOf ImageDisplay.Image
     */

    /**
     * Initialize the object. Adds a click event listener to the
     * galleryImage.
     * @function
     */
    this.init = function ()
    {
        // Find the index among the image's siblings
        var cur = galleryImage;
        var index = -1;
        while ((cur = cur.previousSibling) != null)
            index++;

        // Make the galleryImage open the viewer when clicked.
        galleryImage.addEventListener("click", function () {
            ImageDisplay.viewer.show();
            ImageDisplay.viewer.showImage(index);
        }, false);

        // Start loading the deferred viewer image. Once it is
        // finished, mark this image as loaded.
        var download = $("<img style=\"display:none\" />");
        download.load(function () {
            console.log("Download finished");
            $(viewerImage).attr("src", $(this).attr("src"));
        });
        download.attr("src", $(viewerImage).attr("data-src"));
        console.log(download);
    };

    /**
     * Show the viewerImage.
     * @function
     */
    this.show = function ()
    {
        $(viewerImage).addClass("current");
        $(metadata).addClass("current");
    };

    /**
     * Hide the viewerImage.
     * @function
     */
    this.hide = function ()
    {
        $(viewerImage).removeClass("current");
        $(metadata).removeClass("current");
    };
};

$(document).ready(function () {
    ImageDisplay.viewer = new ImageDisplay.Viewer;
    ImageDisplay.viewer.init();
});

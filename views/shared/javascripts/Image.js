/**
 * @file
 * Definition of the Image class which handles the individual images
 * and their descriptions.
 *
 * @author Tristan Daniel Maat <tm@tlater.net>
 */

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
     * The current zoomlevel of the viewer image.
     * @private
     */
    var zoomLevel = 1;

    /**
     * Find the index among the image's siblings.
     * @private
     */
    function getIndex ()
    {
        var cur = galleryImage;
        var index = -1;
        while ((cur = cur.previousSibling) != null)
            index++;

        return index;
    }

    /**
     * When the DOM is first created, the image will have a temporary
     * loading image set as its source. Download the actual image, and
     * replace the original DOM element.
     * @private
     */
    function loadImage ()
    {
        var download = $("<img style=\"display:none\" />");

        download.load(function () {
            $(viewerImage).attr("src", $(this).attr("src"));
        });

        download.attr("src", $(viewerImage).attr("data-src"));
    }

    /**
     * Zoom the viewer image.
     * @private
     *
     * @param {Object} event -
     * The mousewheel event as fired by an eventListener.
     */
    function zoom (event)
    {
        // event.deltaY is inverted.
        zoomLevel -= event.deltaY / 100;

        if (zoomLevel < 0.1)
            zoomLevel = 0.1;

        if (zoomLevel > 6)
            zoomLevel = 6;

        $(viewerImage).css("transform", "scale(" + zoomLevel + ")");
    }

    /**
     * Initialize the object. Adds a click event listener to the
     * galleryImage.
     * @function
     */
    this.init = function ()
    {
        var index = getIndex();

        // Make the galleryImage open the viewer when clicked.
        galleryImage.addEventListener("click", function () {
            ImageDisplay.openViewer(index);
        }, false);

        // Add the zoom listener to the image's container.
        viewerImage.parentElement.addEventListener("mousewheel",
                                                   zoom.bind(this));

        // Load the (deffered) image.
        loadImage();
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

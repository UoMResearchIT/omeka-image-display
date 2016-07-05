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
     * Whether the image is currently panning.
     * @private
     */
    var panning = false;

    /**
     * The current location-defining variables of
     * the viewer image.
     * @private
     */
    var location = {
        "x": 0,
        "y": 0,
        "mouseX": 0,
        "mouseY": 0
    };

    /**
     * Create the transformation string for the current pan/zoom
     * combination.
     * @private
     *
     * @return {string} -
     * The string that performs the css transformation as requested by
     * the user.
     */
    function getTransformation ()
    {
        return "scale(" + zoomLevel + ")" +
            "translate(" +
            location.x + "px," +
            location.y + "px)";
    }

    /**
     * Find the index among the image's siblings.
     * @private
     *
     * @return {number} - The image index.
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
        zoomLevel -= event.deltaY * ImageDisplay.Image.ZOOM_SPEED / 100;

        if (zoomLevel < ImageDisplay.Image.ZOOM_MIN)
            zoomLevel = ImageDisplay.Image.ZOOM_MIN;

        if (zoomLevel > ImageDisplay.Image.ZOOM_MAX)
            zoomLevel = ImageDisplay.Image.ZOOM_MAX;

        $(viewerImage).css("transform", getTransformation());
    }

    /**
     * Pan the viewer image
     * @private
     *
     * @param {Object} event -
     * The mousedown event as fired by an eventListener.
     */
    function pan (event)
    {
        if (panning) {
            location.x -= location.mouseX - event.clientX;
            location.y -= location.mouseY - event.clientY;

            location.mouseX = event.clientX;
            location.mouseY = event.clientY;

            $(viewerImage).css("transform", getTransformation());
        }
    }

    /**
     * Initialize the zoom feature with the given element as the
     * main event listener - the DOM element wich will register
     * all mouse movements.
     * @private
     *
     * @param {HTMLElement} element -
     * The element to add the event listeners to.
     */
    function initZoom (element)
    {
        element.addEventListener("mousewheel",
                                 zoom.bind(this),
                                 true);
    }

    /**
     * Initialize the pan feature with the given element as the
     * main event listener - the DOM element wich will register
     * all mouse movements.
     * @private
     *
     * @param {HTMLElement} element -
     * The element to add the event listeners to.
     */
    function initPan (element)
    {
        $(element).on("selectstart", false);
        $(viewerImage).on("dragstart", false);

        element.addEventListener("mousemove",
                                 pan.bind(this),
                                 true);

        element.addEventListener("mousedown",
                                 function (e) {
                                     panning = true;
                                     location.mouseX = e.clientX;
                                     location.mouseY = e.clientY;
                                 },
                                 true);

        element.addEventListener("mouseup",
                                 function () {
                                     panning = false;
                                 },
                                 true);
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

        // Initialize the zoom event listeners on the image's
        // container.
        initZoom(viewerImage.parentElement);

        // Initialize the pan event listeners on the image's
        // container.
        initPan(viewerImage.parentElement);

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

/**
 * The speed with which scrolling zooms the image.
 */
ImageDisplay.Image.ZOOM_SPEED = 1;

/**
 * The minimum zoom level.
 */
ImageDisplay.Image.ZOOM_MIN = 0.1;

/**
 * The maximum zoom level.
 */
ImageDisplay.Image.ZOOM_MAX = 6;

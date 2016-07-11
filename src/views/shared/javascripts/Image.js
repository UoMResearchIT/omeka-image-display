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
     * @return {Object} -
     * The object that performs the css transformation as requested by
     * the user when passed to $.css.
     */
    function getTransformation ()
    {
        var transformation = "scale(" + zoomLevel + ")" +
            "translate(" +
            location.x + "px," +
            location.y + "px)";

        return {
            "-webkit-transform": transformation,
            "-moz-transform": transformation,
            "-ms-transform": transformation,
            "-o-transform": transformation,
            "transform": transformation
        };
    }

    /**
     * Find the index among the images on the page.
     * @private
     *
     * @return {number} - The image index.
     */
    function getIndex ()
    {
        var images =
            document.getElementsByClassName("layout-image-display-image");

        return [].indexOf.call(images, viewerImage);
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
        // If the default event is too imprecise, try other events, if
        // available. Otherwise disable zoom.
        if (event.deltaMode === 1 ||
            event.deltaMode === 2)
            return true;

        // Calculate the movement speed (different between firefox and
        // others).
        var movement = event.deltaX;
        if (!event.deltaX)
            movement = event.wheelDelta / 120 || -event.detail;

        // Calculate the new zoom level and cap it to the set
        // constants.
        zoomLevel -= movement / 100 * ImageDisplay.Image.ZOOM_SPEED;
        if (zoomLevel < ImageDisplay.Image.ZOOM_MIN)
            zoomLevel = ImageDisplay.Image.ZOOM_MIN;

        if (zoomLevel > ImageDisplay.Image.ZOOM_MAX)
            zoomLevel = ImageDisplay.Image.ZOOM_MAX;

        // Apply the transformation
        $(viewerImage).css(getTransformation());

        // Inhibit other events
        if (event.preventDefault)
            event.preventDefault();
        return false;
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

            $(viewerImage).css(getTransformation());
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
        element.addEventListener("wheel",
                                 zoom.bind(this),
                                 false);

        // Old event
        element.addEventListener("mousewheel",
                                 zoom.bind(this),
                                 false);

        // Firefox-specific old event.
        element.addEventListener("DOMMouseScroll",
                                 zoom.bind(this),
                                 false);
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
                                 false);

        element.addEventListener("mousedown",
                                 function (e) {
                                     panning = true;
                                     location.mouseX = e.clientX;
                                     location.mouseY = e.clientY;

                                     if (event.preventDefault)
                                         event.preventDefault();
                                     return false;
                                 },
                                 false);

        element.addEventListener("mouseup",
                                 function () {
                                     panning = false;

                                     if (event.preventDefault)
                                         event.preventDefault();
                                     return false;
                                 },
                                 false);
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
            // First we need to find the index of the display we want
            // to show.
            var divs = document.getElementsByClassName("image-display");
            var display = viewerImage.parentElement.parentElement.parentElement;

            var divIndex = [].indexOf.call(divs, display);

            ImageDisplay.openViewer(divIndex, index);
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
        this.reset();

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

    /**
     * Reset the viewerImage's pan and zoom.
     * @function
     */
    this.reset = function ()
    {
        zoomLevel = 1;

        location.x = 0;
        location.y = 0;
        location.mouseX = 0;
        location.mouseY = 0;

        $(viewerImage).css(getTransformation());
    };
};

/**
 * The speed with which scrolling zooms the image.
 */
ImageDisplay.Image.ZOOM_SPEED = 10;

/**
 * The minimum zoom level.
 */
ImageDisplay.Image.ZOOM_MIN = 0.1;

/**
 * The maximum zoom level.
 */
ImageDisplay.Image.ZOOM_MAX = 6;

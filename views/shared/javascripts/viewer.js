/**
 * @file viewer.js
 * A script to add image navigation to omeka exhibits.
 *
 * @author Tristan Daniel Maat <tm@tlater.net>
 */

if (typeof ImageDisplay === "undefined")
    /**
     * @namespace
     */
    var ImageDisplay = {
        /**
         * Helper function to test whether a DOM element has a class.
         * Thanks to stackoverflow: http://stackoverflow.com/a/6160317
         *
         * @param {HTMLElement} e - The element to test.
         * @param {string} cls - The class to test for.
         */
        hasClass: function (e, cls)
        {
            return new RegExp('(\\s|^)' + cls + '(\\s|$)').test(e.className);
        },

        /**
         * Helper function to add a class to a DOM element.
         * Thanks to stackoverflow: http://stackoverflow.com/a/6160317
         *
         * @param {HTMLElement} e - The element to add the class to.
         * @param {string} cls - The class to add to the element.
         */
        addClass: function (e, cls)
        {
            if (!ImageDisplay.hasClass(e, cls))
                e.className += " " + cls;
        },

        /**
         * Helper function to remove a class from a DOM element.
         *
         * @param {HTMLElement} e - The element to remove the class from.
         * @param {string} cls - The class to remove from the element.
         */
        removeClass: function (e, cls)
        {
            if (ImageDisplay.hasClass(e, cls))
                e.className = e.className.split(cls).join('');
        }
    };

/**
 * Manages the image viewer interface.
 * @class
 */
ImageDisplay.Viewer = function ()
{
    /**
     * Image objects that correspond to the images displayed on
     * the page as well as in the viewer.
     *
     * @member {ImageDisplay.Image[]}
     */
    var images = [];

    /**
     * The index of the image currently displayed by the viewer. Set
     * to null if no images are being displayed.
     *
     * @member {?number}
     */
    var currentImage = null;

    /**
     * The image display div. Set after init is called.
     *
     * @member {?HTMLElement}
     */
    var div = null;

    /**
     * The keyboard controls function.
     * @function
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

                // Create an Image object for the two, add it to the
                // images array, and finally initialize the object.
                images.push(new ImageDisplay.Image(galleryImage, viewerImage));
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
    }

    /**
     * Show the image viewer.
     * @function
     */
    this.show = function ()
    {
        ImageDisplay.removeClass(div, "hidden");
        div.focus();
    }

    /**
     * Hide the image viewer.
     * @function
     */
    this.hide = function ()
    {
        ImageDisplay.addClass(div, "hidden");
    }

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
    }
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
ImageDisplay.Image = function (galleryImage, viewerImage)
{
    /**
     * The image in the layout's gallery.
     *
     * @member {HTMLElement}
     */
    var galleryImage = galleryImage;

    /**
     * The image in the viewer
     *
     * @member {HTMLElement}
     */
    var viewerImage = viewerImage;

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
        galleryImage.addEventListener("click", function (e) {
            ImageDisplay.viewer.showImage(index);
            ImageDisplay.viewer.show();

            console.log(e.target);
            console.log(index);
        }, false);
    }

    /**
     * Show the viewerImage.
     * @function
     */
    this.show = function ()
    {
        ImageDisplay.addClass(viewerImage, "current");
    }

    /**
     * Hide the viewerImage.
     * @function
     */
    this.hide = function ()
    {
        ImageDisplay.removeClass(viewerImage, "current");
    }
}

window.onload = function () {
    ImageDisplay.viewer = new ImageDisplay.Viewer;
    ImageDisplay.viewer.init();
}

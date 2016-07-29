/**
 * @file
 * Definition of the Image class which handles the individual images
 * and their descriptions.
 *
 * @author Tristan Daniel Maat <tm@tlater.net>
 *
 * @license
 * Copyright (C) 2016  Tristan Daniel Maat
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * An image to be displayed by the image viewer interface.
 * @class
 * @constructor
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
     * The controllable viewerImage.
     * @private
     */
    var controllableImage =
        new ImageDisplay.Controllable(
            viewerImage,
            ImageDisplay.Image.ZOOM_SPEED,
            ImageDisplay.Image.ZOOM_MAX,
            ImageDisplay.Image.ZOOM_MIN
        );

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

        // Make the loading image small
        $(viewerImage).addClass("loading");

        download.load(function () {
            $(viewerImage).removeClass("loading");
            $(viewerImage).attr("src", $(this).attr("src"));

            controllableImage.init();
        });

        download.attr("src", $(viewerImage).attr("data-src"));
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


            if (event.preventDefault)
                event.preventDefault();
            return false;
        }, false);

        loadImage();
    };

    /**
     * Show the viewerImage.
     * @function
     */
    this.show = function ()
    {
        controllableImage.reset();

        $(viewerImage).addClass("current");
        $(metadata).addClass("current");

        controllableImage.startAnimation();
    };

    /**
     * Hide the viewerImage.
     * @function
     */
    this.hide = function ()
    {
        $(viewerImage).removeClass("current");
        $(metadata).removeClass("current");

        controllableImage.stopAnimation();
    };
};

// These are only default values; Actual settings should be modified
// using the plugin settings page.

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
ImageDisplay.Image.ZOOM_MAX = 15;

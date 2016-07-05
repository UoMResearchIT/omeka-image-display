/**
 * @file ImageDisplay.js
 * Namespace and global functions for the ImageDisplay package.
 *
 * @author Tristan Daniel Maat <tm@tlater.net>
 */

if (typeof ImageDisplay === "undefined")
    /**
     * @namespace
     */
    var ImageDisplay = {
        /**
         * Initialize the image display.
         * @function
         */
        init: function ()
        {
            if (!this.viewer) {
                this.viewer = new ImageDisplay.Viewer;
                this.viewer.init();
            }
        },

        /**
         * Open the image viewer with the image with index index.
         * @function
         *
         * @param {number} index - The index of the image to display.
         */
        openViewer: function (index)
        {
            this.viewer.show();
            this.viewer.showImage(index);
        }
    };

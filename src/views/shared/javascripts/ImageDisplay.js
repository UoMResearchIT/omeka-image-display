/**
 * @file
 * Namespace and global functions for the ImageDisplay package.
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

                var e = document.createEvent("CustomEvent");
                e.initCustomEvent("viewerFinished", true, true, {});
                document.dispatchEvent(e);
            }
        },

        /**
         * Open the image viewer with the image with index index.
         * @function
         *
         * @param {number} divIndex - The index of the image-viewer to display.
         * @param {number} index - The index of the image to display.
         */
        openViewer: function (divIndex, index)
        {
            this.viewer.show(divIndex);
            this.viewer.showImage(index);
        }
    };

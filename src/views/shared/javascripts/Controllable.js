/**
 * @file
 * Definition of the Controllable class which adds mouse controllable
 * zooming and panning to DOM elements.
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
 * A controllable DOM element.
 * @class
 * @constructor
 *
 * @param {HTMLElement} object - The DOM element to be made controllable.
 * @param {Number} zoomSpeed - The speed with which the image should zoom.
 * @param {Number} zoomMax - The maximum zoom level.
 * @param {Number} zoomMin - The minimum zoom level.
 */
ImageDisplay.Controllable = function (object, zoomSpeed, zoomMax, zoomMin)
{
    /**
     * Holds animationframes for later cancelling.
     * @private
     *
     * @member {Object} this.animationFrame
     * @memberOf ImageDisplay.Controllable
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
     * Calculate the new zoom level.
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
        var movement = event.deltaY;
        if (!event.deltaY)
            movement = event.wheelDelta / 120 || -event.detail;

        // Calculate the new zoom level and cap it to the set
        // constants.
        zoomLevel -= movement / 100 * zoomSpeed;
        if (zoomLevel < zoomMin)
            zoomLevel = zoomMin;

        if (zoomLevel > zoomMax)
            zoomLevel = zoomMax;

        // Inhibit other events
        if (event.preventDefault)
            event.preventDefault();
        return false;
    }

    /**
     * Calculate the object location.
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
        }

        applyTransformation();
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
        $(object).on("dragstart", false);

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
     * Apply the calculated transformation
     * @private
     */
    function applyTransformation () {
        $(object).css(getTransformation());
    }

    /**
     * Reset the pan and zoom.
     */
    this.reset = function ()
    {
        zoomLevel = 1;

        location.x = 0;
        location.y = 0;
        location.mouseX = 0;
        location.mouseY = 0;

        applyTransformation();
    };

    /**
     * Initialize the object as a controllable.
     * @function
     */
    this.init = function ()
    {
        initPan(object);
        initZoom(object);
    };

    /**
     * Apply the transformation and request a new frame.
     * @private
     */
    function animate () {
        applyTransformation();
        this.animationFrame = requestAnimationFrame(animate);
    }

    /**
     * Start the controllable animations.
     */
    this.startAnimation = function ()
    {
        animate();
    };

    /**
     * Stop the controllabel animations.
     */
    this.stopAnimation = function ()
    {
        cancelAnimationFrame(this.animationFrame);
    };
};

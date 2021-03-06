<?php
/**
 * The configuration page.
 *
 * PHP version 5
 *
 * @package Omeka\Plugins\ImageDisplayPlugin
 * @author  Tristan Daniel Maat <tm@tlater.net>
 * @license GPL version 3
 */
?>

<div class="field">
    <div class="two columns alpha">
        <?php
        echo get_view()->formLabel(
            "image_display_public_append_to_items_show",
            __("Append to Public Items")
        );
        ?>
    </div>
    <div class="inputs five columns omega">
        <p class="explanation">
            <?php
            echo __("Whether the image display should be enabled for public item pages.");
            ?>
        </p>
        <?php
        echo get_view()->formCheckbox(
            "image_display_public_append_to_items_show",
            null,
            array("checked" => $publicAppendToItemsShow)
        );
        ?>
    </div>

    <div class="two columns alpha">
        <?php
        echo get_view()->formLabel(
            "image_display_zoom_speed",
            __("Zoom speed")
        );
        ?>
    </div>
    <div class="inputs five columns omega">
        <p class="explanation">
            <?php
            echo __("The speed with which the image size changes.");
            ?>
        </p>
        <?php
        echo get_view()->formInput(
            "image_display_zoom_speed",
            get_option("image_display_zoom_speed"),
            array("type" => "number",
                  "min" => 0,
                  "step" => "any"
            )
        );
        ?>
    </div>

    <div class="two columns alpha">
        <?php
        echo get_view()->formLabel(
            "image_display_zoom_max",
            __("Maximum zoom level")
        );
        ?>
    </div>
    <div class="inputs five columns omega">
        <p class="explanation">
            <?php
            echo __("The maximum zoom level.");
            ?>
        </p>
        <?php
        echo get_view()->formInput(
            "image_display_zoom_max",
            get_option("image_display_zoom_max"),
            array("type" => "number",
                  "min" => 0,
                  "step" => "any"
            )
        );
        ?>
    </div>

    <div class="two columns alpha">
        <?php
        echo get_view()->formLabel(
            "image_display_zoom_min",
            __("Minimum zoom level")
        );
        ?>
    </div>

    <div class="inputs five columns omega">
        <p class="explanation">
            <?php
            echo __("The minimum zoom level.");
            ?>
        </p>
        <?php
        echo get_view()->formInput(
            "image_display_zoom_min",
            get_option("image_display_zoom_min"),
            array("type" => "number",
                  "min" => 0,
                  "step" => "any"
            )
        );
        ?>
    </div>
</div>

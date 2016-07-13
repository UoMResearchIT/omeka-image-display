<?php
$VIEWS_DIR = dirname(dirname(dirname(__DIR__)));
require_once($VIEWS_DIR . "/ImageDisplayLayoutHelper.class.php");

/**
 * layout.php
 *
 * An exhibit layout that displays images with navigation controls.
 *
 * @author Tristan Daniel Maat <tm@tlater.net>
 * @package Omeka\Plugins\ImageDisplayPlugin
 */

$layoutHelper = new ImageDisplayLayoutHelper($this, $attachments);
?>

<div class="container">
    <?php
    echo $layoutHelper->getImages($attachments,
                                  array("class" => "layout-image-display-container-image"),
                                  "square_thumbnail");
    ?>
</div>

<div class="image-display image-display-js hidden" tabindex="0">
    <div id="display-left" class="image-display-body">
        <div id="image-container" class="image-display-container">
            <?php
            $images = $layoutHelper->getImages($attachments,
                                               array("class" => "layout-image-display-image"),
                                               "fullsize");
            echo $layoutHelper->makeImagesDeferred($images);
            ?>
        </div>
    </div>
    <div id="display-right" class="image-display-body">
        <button class="image-display-close-button" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <div id="description-container" class="image-display-container">
            <?php
            $items = array_map(function($attachment) {
                return $attachment->getItem();
            }, $attachments);

            echo $layoutHelper->getImageMetadata($items, $text);
            ?>
        </div>
    </div>
</div>

<noscript>
    <style>.image-display-js { display: none; }</style>
    <?php
    /* echo $layoutHelper->getNoscript($attachments,
     *                                 array("class" => "layout-image-display-nojs-image"));*/
    ?>
</noscript>

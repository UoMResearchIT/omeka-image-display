<?php
/**
 * An exhibit layout that displays images with navigation controls.
 *
 * PHP version 5
 *
 * @package Omeka\Plugins\ImageDisplayPlugin
 * @author  Tristan Daniel Maat <tm@tlater.net>
 * @license GPL version 3
 */

require_once "ImageDisplayLayoutHelper.class.php";
$layoutHelper = new ImageDisplayLayoutHelper($this, $attachments);
?>

<div class="container">
    <?php
    echo $layoutHelper->getImages(
        array(array_shift($attachments)),
        array("class" => "layout-image-display-container-image"),
        "thumbnail",
        false,
        true
    );
    ?>
</div>

<div class="image-display image-display-js hidden" tabindex="0">
    <div id="display-left" class="image-display-body">
        <div id="image-container" class="image-display-container">
            <?php
            $images = $layoutHelper->getImages(
                array(array_shift($attachments)),
                array("class" => "layout-image-display-image"),
                "fullsize"
            );
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
            $item = array_shift($attachments)->getItem();
            $caption = array_shift($attachments)->caption;

            echo $layoutHelper->getImageMetadata(
                array($item),
                array($caption)
            );
            ?>
        </div>
    </div>
</div>

<noscript>
    <style>.image-display-js { display: none; }</style>
    <?php
    /* echo $layoutHelper->getNoscript(
       $attachments,
       array("class" => "layout-image-display-nojs-image"),
       "thumbnail");
     */
    ?>
</noscript>

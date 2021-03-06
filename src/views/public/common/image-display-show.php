<?php
/**
 * An exhibit layout that displays images with navigation controls.
 *
 * @author  Tristan Daniel Maat <tm@tlater.net>
 * @package Omeka\Plugins\ImageDisplayPlugin
 * @license GPL version 3
 */

require_once "ImageDisplayLayoutHelper.class.php";
$layoutHelper = new ImageDisplayLayoutHelper;
?>

<div class="layout-image-display-item">
    <div class="image-display image-display-js hidden" tabindex="0">
        <div id="display-left" class="image-display-body">
            <div id="image-container" class="image-display-container">
                <?php
                $images = "";
                for ($i = 0; $i < $item->fileCount(); $i++) {
                    $images .= item_image(
                        "fullsize",
                        array("class" => "layout-image-display-image"),
                        $i,
                        $item
                    );
                }

                echo $layoutHelper->makeImagesDeferred($images);
                ?>
            </div>
        </div>

        <div id="display-right" class="image-display-body">
            <button class="image-display-close-button" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <div id="description-container" class="image-display-container">
                <?php echo $layoutHelper->getImageMetadata(
                    array($item),
                    "",
                    false
                ); ?>
            </div>
        </div>
    </div>
</div>

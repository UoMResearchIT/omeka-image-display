<?php
/**
 * ImageDisplayLayoutHelpers.php
 *
 * Helper functions to create an image display.
 *
 * @author Tristan Daniel Maat <tm@tlater.net>
 * @package Omeka\Plugins\ImageDisplayPlugin
 */
class ImageDisplayLayoutHelper {
    public function getNoscript ($attachments)
    {
        foreach ($attachments as $attachment) {
            $file = $attachment->getFile();

            echo '<div class="image-display-image">';
            echo '<img src="' . $file->getWebPath() . '">';
            echo '</div>';
        }
    }
}
?>
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
    /**
     * Returns a string that contains HTML markup for all files in the
     * attachments variable. The exact tags can be changed through the
     * provided parameters.
     *
     * @param \ExhibitBlockAttachment[] $attachments
     *        The exhibit "attachments" selected by the user to
     *        generate the images from.
     *
     * @param string[] $properties Any additional properties to add to
     *                             the img tag.
     *
     * @param string $imageType The type of the images. Can be either
     *                          fullsize, thumbnail or square_thumbnail.
     *
     * @param boolean $link Whether the image should link to its
     *                      corresponding item page.
     *
     * @return string An HTML string as described.
     */
    public function getImages ($attachments, $properties=array(),
                               $imageType="fullsize", $link=false)
    {
        $string = "";

        foreach ($attachments as $attachment) {
            $item = $attachment->getItem();

            // Generate the requested HTML tag for the image.
            $image_tag = item_image($imageType, $properties, 0, $item);

            // If we should link, add a link.
            if ($link)
                $string .= link_to_item($image_tag, array(), "show", $item);
            else
                $string .= $image_tag;
        }

        return $string;
    }
}
?>

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

    /**
     * Turn the given string of image markup into an equivalent string
     * of markup, but with the src transformed into a generic loading
     * image and a data-src tag that can be used to defer image load.
     *
     * @param string $markup The string to transform.
     */
    public function makeImagesDeferred ($markup)
    {
        $images = new DOMDocument;
        $images->loadHTML($markup);

        foreach ($images->getElementsByTagName("img") as $image) {
            $image->setAttribute("data-src", $image->getAttribute("src"));
            $image->setAttribute("src", "http://tristan.mnemosyne.manchester.ac.uk/files/square_thumbnails/8877ce83bf01667e398bf3f991b7524a.jpg");
        }

        return $images->saveHTML();
    }

    /**
     * Return a string that contains markup to describe an image's
     * metadata. The layout is a container as follows:
     * <div>
     * <div class="metadata-title">Title</div>
     * <div class="metadata-exhibit-description">Text</div>
     * <div class="metadata-prop-title">Creator</div>
     * <div class="metadata-prop-content">-Creator's name-</div>
     * ...
     * </div>
     *
     * @param \ExhibitBlockAttachment[] $attachments
     *        The exhibit "attachments" selected by the user to
     *        generate the images from.
     *
     * @param string $text
     *        The description of the exhibit block as entered by the
     *        user and passed to layout.php.
     */
    public function getImageMetadata ($attachments, $text)
    {
        $text . "</br>";

        foreach ($attachments as $attachment)
            $text .= all_element_texts($attachment->getItem());

        return $text;
    }
}
?>

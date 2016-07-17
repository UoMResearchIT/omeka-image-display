<?php
/**
 * Helper functions to create an image display.
 *
 * PHP version 5
 *
 * @package Omeka\Plugins\ImageDisplayPlugin
 * @author  Tristan Daniel Maat <tm@tlater.net>
 */

/**
 * The helper function container class.
 *
 * @package Omeka\Plugins\ImageDisplayPlugin
 * @author  Tristan Daniel Maat <tm@tlater.net>
 */
class ImageDisplayLayoutHelper
{
    /**
     * Returns a string that contains HTML markup for all files in the
     * attachments variable. The exact tags can be changed through the
     * provided parameters.
     *
     * @param \ExhibitBlockAttachment[] $attachments The exhibit "attachments"
     *                                               selected by the user to
     *                                               generate the images from.
     * @param string[]                  $properties  Any additional properties
     *                                               to add to the img tag.
     * @param string                    $imageType   The type of the images.
     *                                               Can be either fullsize,
     *                                               thumbnail or
     *                                               square_thumbnail.
     * @param boolean                   $link        Whether the image should
     *                                               link to its corresponding
     *                                               item page. corresponding
     *                                               item page.
     *
     * @return string An HTML string as described.
     */
    public function getImages($attachments, $properties=array(),
                              $imageType="fullsize", $link=false, $alt=false
    ) {
        $string = "";

        foreach ($attachments as $attachment) {
            $item = $attachment->getItem();
            $file = $attachment->getFile();

            // Add the item title as an alt text if required.
            if ($alt) {
                $properties[] = metadata($item, array("Dublin Core", "Title"));
            }

            // Generate the requested HTML tag for the image.
            $props = array(
                "imageSize" => $imageType,
                "imgAttributes" => $properties,
                "linkToFile" => false
            );
            $image_tag = file_markup($file, $props, null);

            // If we should link, add a link.
            if ($link) {
                $string .= link_to_item($image_tag, array(), "show", $item);
            } else {
                $string .= $image_tag;
            }
        }

        return $string;
    }

    /**
     * Turn the given string of image markup into an equivalent string
     * of markup, but with the src transformed into a generic loading
     * image and a data-src tag that can be used to defer image load.
     *
     * @param string $markup The string to transform.
     *
     * @return string An HTML string as described.
     */
    public function makeImagesDeferred($markup)
    {
        $images = new DOMDocument;
        $images->loadHTML($markup);

        foreach ($images->getElementsByTagName("img") as $image) {
            $image->setAttribute("data-src", $image->getAttribute("src"));
            $image->setAttribute("src", img("ajax-loader.gif"));
        }

        return $images->saveHTML();
    }

    /**
     * Append the given string of HTML markup to an HTML document node.
     *
     * @param DOMNode $parent The DOMNode to append the element to.
     * @param string  $markup The HTML markup that should be appended
     *                        to the parent.
     *
     * @return null
     */
    private function _appendNode(DOMNode $parent, $markup)
    {
        $temp_dom = new DOMDocument;

        $temp_dom->loadHTML($markup);

        $nodes = $temp_dom->getElementsByTagName("body")->item(0)->childNodes;

        foreach ($nodes as $node) {
            $node = $parent->ownerDocument->importNode($node, true);
            $parent->appendChild($node);
        }
    }

    /**
     * Return a string that contains markup to describe an image's
     * metadata.
     *
     * @param \Item[] $items    The exhibit items selected by the
     *                          user to generate the images from.
     * @param string  $captions The captions of the images in the same
     *                          order.
     * @param boolean $itemLink Whether a link to the item page
     *                          should be shown.
     *
     * @return string An HTML string as described.
     */
    public function getImageMetadata($items, $captions, $itemLink=true)
    {
        $markup = new DOMDocument;
        $temp_dom = new DOMDocument;

        $text = "";

        foreach ($items as $i => $item) {
            // Generate the metadata markup.
            $metadata = '<div class="image-metadata">' .
                      all_element_texts($item) .
                      '</div>';

            $markup->loadHTML($metadata);

            $root = $markup->getElementsByTagName("body")->item(0)
                  ->childNodes->item(0);

            $this->_appendNode(
                $root, '<div class="image-caption">' .
                $captions[$i] .
                "</div>"
            );

            if ($itemLink) {
                $link_markup = link_to_item(
                    "Go to item page",
                    array("class" => "item-link"),
                    "show",
                    $item
                );

                $this->_appendNode($root, $link_markup);
            }

            $text .= $markup->saveHTML();
        }

        return $text;
    }
}
?>

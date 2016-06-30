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
     * attachments variable that can be displayed in a javascriptless
     * environment.
     *
     * @param \ExhibitBlockAttachment[] $attachments
     *        The exhibit "attachments" selected by the user to
     *        generate the images from.
     *
     * @return string An HTML string as described.
     */
    public function getNoscriptImages ($attachments)
    {
        $string = '';

        foreach ($attachments as $attachment) {
            $item = $attachment->getItem();

            $string .= link_to_item(
                item_image('fullsize',
                           array('class' => 'image-display-nojs-image'),
                           0,
                           $item),
                array(),
                'show',
                $item);
        }

        return $string;
    }

    /**
     * Returns a string that contains HTML markup for a gallery of
     * thumbnails of each file in the attachments variable, each
     * containing an onClick event which will call <insert function
     * here>.
     *
     * @param \ExhibitBlockAttachment[] $attachments
     *        The exhibit "attachments" selected by the user
     *        to generate the gallery from.
     *
     * @return string An HTML string as described.
     */
    public function getGallery ($attachments)
    {
        $string = '';

        foreach ($attachments as $attachment) {
            $item = $attachment->getItem();

            $string .=
                    item_image('square_thumbnail',
                               array('class' => 'image-display-gallery-image'),
                               0,
                               $item);
        }

        return $string;
    }
}
?>

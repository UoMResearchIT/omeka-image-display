<?php
/**
 * ImageDisplay
 *
 */

/**
 * The ImageDisplay plugin.
 *
 * @package Omeka/Plugins/ImageDisplay
 */
class ImageDisplayPlugin extends Omeka_Plugin_AbstractPlugin
{
    protected $_hooks = array(
        'initialize'
    );

    protected $_filters = array(
        'exhibit_layouts'
    );

    /**
     * Register the exhibition layout.
     */
    public function filterExhibitLayouts ($layouts)
    {
        $layouts['image-display'] = array(
            'name' => __('Image Display'),
            'description' => __('A layout with better image navigation')
        );

        return $layouts;
    }

    /**
     * Add the translation directory
     */
    public function hookInitialize ()
    {
        add_translation_source(dirname(__FILE__) . '/languages');
    }
}

?>

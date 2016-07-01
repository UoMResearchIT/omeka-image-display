<?php
/**
 * ImageDisplayPlugin.php
 *
 * An Omeka plugin to improve the standard exhibit image display.
 *
 * @author Tristan Daniel Maat <tm@tlater.net>
 * @package Omeka\Plugins\ImageDisplayPlugin
 */
class ImageDisplayPlugin extends Omeka_Plugin_AbstractPlugin
{
    protected $_hooks = array(
        'initialize',
        'exhibit_builder_page_head'
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
     * Add the viewer script.
     */
    public function hookExhibitBuilderPageHead($args)
    {
        if (array_key_exists('image-display', $args['layouts']))
            queue_js_file('viewer');
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

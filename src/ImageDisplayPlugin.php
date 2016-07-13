<?php
/**
 * An Omeka plugin to improve the standard exhibit image display.
 *
 * PHP version 5
 *
 * @package Omeka\Plugins\ImageDisplayPlugin
 * @author  Tristan Daniel Maat <tm@tlater.net>
 * @see     ImageDisplayPlugin
 */

/**
 * The main plugin class
 *
 * @package Omeka\Plugins\ImageDisplayPlugin
 * @author  Tristan Daniel Maat <tm@tlater.net>
 * @see     ImageDisplayPlugin
 */
class ImageDisplayPlugin extends Omeka_Plugin_AbstractPlugin
{
    protected $_hooks = array(
        "config",
        "config_form",
        "initialize",
        "exhibit_builder_page_head"
    );

    protected $_filters = array(
        "exhibit_layouts"
    );

    protected $options = array(
        "image_display_public_append_to_items_show" => true
    );

    /**
     * Register the exhibition layout.
     *
     * @param mixed $layouts The layouts as defined by omeka.
     *
     * @return null
     */
    public function filterExhibitLayouts($layouts)
    {
        $layouts["image-display-gallery"] = array(
            "name" => __("Image Display Gallery"),
            "description" => __("A gallery layout with better image navigation.")
        );

        $layouts["image-display-file"] = array(
            "name" => __("Image Display File"),
            "description" => __("A single-file layout with better image navigation.")
        );

        return $layouts;
    }

    /**
     * Add the viewer script.
     *
     * @param mixed $args The args as defined by omeka.
     *
     * @return null
     */
    public function hookExhibitBuilderPageHead($args)
    {
        if (array_key_exists("image-display-gallery", $args["layouts"])
            || array_key_exists("image-display-file", $args["layouts"])
        ) {
            queue_js_file("viewer");
            queue_js_file("ofi.browser");
            queue_css_file("image-viewer");
        }
    }

    /**
     * Display the viewer on public item pages.
     *
     * @return null
     */
    public function hookPublicItemsShow()
    {
        if (get_option("image_display_public_append_to_items_show")) {
            $item = get_current_record("item");
        }
    }

    /**
     * Respond to the configuration form.
     *
     * @param mixed $settings The settings as set by the configuration form.
     *
     * @return null
     */
    public function hookConfig($settings)
    {
        set_option(
            "image_display_public_append_to_items_show",
            (boolean) $settings["post"]["image_display_public_append_to_items_show"]
        );
    }

    /**
     * Display the config form.
     *
     * @return null
     */
    public function hookConfigForm()
    {
        $publicAppendToItemsShow = get_option("image_display_public_append_to_items_show");

        require_once __DIR__ . "/views/admin/config.php";
    }

    /**
     * Add the translation directory
     *
     * @return null
     */
    public function hookInitialize()
    {
        add_translation_source(dirname(__FILE__) . "/languages");
    }
}
?>

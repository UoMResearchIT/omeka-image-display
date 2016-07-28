<?php
/**
 * An Omeka plugin to improve the standard exhibit image display.
 *
 * PHP version 5
 *
 * @package Omeka\Plugins\ImageDisplayPlugin
 * @author  Tristan Daniel Maat <tm@tlater.net>
 * @see     ImageDisplayPlugin
 * @license GPL version 3
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
    /**
     * The hooks used by this plugin.
     *
     * @var string[]
     */
    protected $_hooks = array(
        "config",
        "config_form",
        "initialize",
        "public_head",
        "public_items_show",
        "exhibit_builder_page_head"
    );

    /**
     * The filters applied by this plugin.
     *
     * @var string[]
     */
    protected $_filters = array(
        "exhibit_layouts"
    );

    /**
     * The options provided by this plugin.
     *
     * @var string[]
     */
    protected $options = array(
        "image_display_public_append_to_items_show" => true,
        "image_display_zoom_speed" => 1,
        "image_display_zoom_max" => 6,
        "image_display_zoom_min" => 0.1
    );

    /**
     * Register the exhibition layout.
     *
     * @param mixed[] $layouts The layouts as defined by omeka.
     *
     * @return mixed[] The layouts including our own deinitions.
     */
    public function filterExhibitLayouts($layouts)
    {
        $layouts["image-display-gallery"] = array(
            "name" => __("Image Display Gallery"),
            "description" => __("A gallery layout with better image navigation.")
        );

        $layouts["image-display-file"] = array(
            "name" => __("Image Display File"),
            "description" => __("A single-file layout with better image navigation. (Note: The form does support multiple items, but the plugin may behave unexpectedly when adding multiple files this way).")
        );

        return $layouts;
    }

    /**
     * Add the viewer script to exhibit pages.
     *
     * @param mixed[] $args - The args as defined by omeka.
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
     * Add the viewer script to item pages.
     *
     * @param mixed[] $args - The args as defined by omeka.
     *
     * @return null
     */
    public function hookPublicHead($args)
    {
        if (get_option("image_display_public_append_to_items_show")) {
            queue_js_file("viewer");
            queue_js_file("ofi.browser");
            queue_js_string(
                '
                document.addEventListener("viewerFinished", function () {
                    ImageDisplay.Image.ZOOM_SPEED = ' .
                                        get_option("image_display_zoom_speed") .
                ';   ImageDisplay.Image.ZOOM_MAX = ' .
                                        get_option("image_display_zoom_max") .
                ';   ImageDisplay.Image.ZOOM_MIN = ' .
                                        get_option("image_display_zoom_min") .
                ';});
                '
            );
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
            echo common("image-display-show", array("item" => $item));
        }
    }

    /**
     * Respond to the configuration form.
     *
     * @param mixed[] $settings The settings as set by the configuration form.
     *
     * @return null
     */
    public function hookConfig($settings)
    {
        set_option(
            "image_display_public_append_to_items_show",
            (boolean) $settings["post"]["image_display_public_append_to_items_show"]
        );

        set_option(
            "image_display_zoom_speed",
            (float) $settings["post"]["image_display_zoom_speed"]
        );

        set_option(
            "image_display_zoom_max",
            (float) $settings["post"]["image_display_zoom_max"]
        );

        set_option(
            "image_display_zoom_min",
            (float) $settings["post"]["image_display_zoom_min"]
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

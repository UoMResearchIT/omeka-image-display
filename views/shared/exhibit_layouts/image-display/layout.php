<?php
require_once(dirname(__FILE__) . '/ImageDisplayLayoutHelper.class.php');

/**
 * layout.php
 *
 * An exhibit layout that displays images with navigation controls.
 *
 * @author Tristan Daniel Maat <tm@tlater.net>
 * @package Omeka\Plugins\ImageDisplayPlugin
 */

$layoutHelper = new ImageDisplayLayoutHelper;
?>

<div id="image-display" class="image-display-js hidden">
    <?php $layoutHelper->getNoscript($attachments) ?>
</div>

<noscript>
    <style>.image-display-js { display: none; }</style>
    <?php $layoutHelper->getNoscript($attachments) ?>
</noscript>

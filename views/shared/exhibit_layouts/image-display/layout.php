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

$layoutHelper = new ImageDisplayLayoutHelper($this, $attachments);
?>
<div class="image-display-gallery">
    <?php echo $layoutHelper->getGallery($attachments) ?>
</div>

<div id="image-display" class="image-display-js hidden">
    <?php echo $layoutHelper->getGallery($attachments) ?>
</div>

<noscript>
    <style>.image-display-js { display: none; }</style>
    <?php echo $layoutHelper->getNoscript($attachments) ?>
</noscript>

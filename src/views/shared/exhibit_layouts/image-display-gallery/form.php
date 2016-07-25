<?php
/**
 * An exhibit layout that displays images with navigation controls.
 *
 * PHP version 5
 *
 * @package Omeka\Plugins\ImageDisplayPlugin
 * @author  Tristan Daniel Maat <tm@tlater.net>
 * @license GPL version 3
 */

$formStem = $block->getFormStem();
$options = $block->getOptions();
?>

<div class="selected-items">
    <h4><?php echo __('Items'); ?></h4>
    <?php echo $this->exhibitFormAttachments($block); ?>
</div>

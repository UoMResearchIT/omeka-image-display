<div class="field">
    <div class="two columns alpha">
        <?php
        echo get_view()->formLabel("image_display_public_append_to_items_show",
                                   __("Append to Public Items"));
        ?>
    </div>
    <div class="inputs five columns omega">
        <p class="explanation">
            <?php
            echo __("Whether the image display should be enabled for public item pages.");
            ?>
        </p>
        <?php
        echo get_view()->formCheckbox("image_display_public_append_to_items_show",
                                      null,
                                      array("checked" => $publicAppendToItemsShow));
        ?>
    </div>
</div>

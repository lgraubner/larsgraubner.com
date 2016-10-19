<?php
/**
 * Template part bio excerpt
 */
?>
<div class="bio">
    <div class="portrait">
        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/lars-60x60.jpg" srcset="<?php echo get_template_directory_uri(); ?>/assets/images/lars-60x60.jpg, <?php echo get_template_directory_uri(); ?>/assets/images/lars-60x60@2x.jpg 2x" class="portrait__image" width="60" height="60" alt="Lars Graubner" />
    </div>
    <div class="bio__text">
        <p class="nodrop"><strong>Lars Graubner</strong> is a passionate front-end developer from Germany. His daily business includes the use of Javascript, Node, React and Wordpress. <a href="<?php echo get_page_link(get_page_by_path('about')); ?>">Learn more…</a></p>
    </div>
</div>

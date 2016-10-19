<?php
/**
 * Template for 404 page
 */

get_template_part('templates/page', 'header'); ?>

<div class="inner">
    <p>Sorry, but the page you were trying to view does not exist. Use the search form below or <a href="<?php echo esc_url(home_url()); ?>">head to the front page</a>.</p>

    <?php get_template_part('templates/searchform'); ?>
</div>

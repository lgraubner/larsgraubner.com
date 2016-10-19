<?php
/**
 * Template for tag pages
 */

get_template_part('templates/page', 'header'); ?>
<?php get_template_part('templates/post-list'); ?>
<?php Simius\Extras\pagination_nav(); ?>

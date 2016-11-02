<?php
/**
 * Template for search page
 */

get_template_part('templates/page', 'header');
get_template_part('templates/searchform'); ?>
<?php if (have_posts()): ?>
    <?php get_template_part('templates/post-list'); ?>
    <?php Simius\Extras\pagination_nav(); ?>
<?php else: ?>
<div class="page-content">
    <div class="inner">
        <p>Could not find anything matching your search term. Please try a different phrase.</p>
    </div>
    <?php get_template_part('templates/featured-posts'); ?>
</div>
<?php endif; ?>

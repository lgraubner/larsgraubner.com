<?php get_template_part('templates/page', 'header'); ?>
<?php if (have_posts()): ?>
    <?php get_template_part('templates/post-list'); ?>
    <?php Roots\Sage\Extras\pagination_nav(); ?>
<?php else: ?>
<div class="page-content">
    <div class="inner">
        <p>Could not find anything matching your search term.</p>
    </div>
</div>
<?php endif; ?>

<?php
$args = array(
    'posts_per_page' => 2,
    'cat' => get_category_by_slug('featured')->term_id,
);
$query = new WP_Query($args);
if ($query->have_posts()) :
?>
<div class="featured-posts">
    <div class="inner">
        <h2 class="featured-posts__title">Featured articles</h2>
        <?php include(locate_template('templates/post-tiles.php')); ?>
    </div>
</div>
<?php endif; ?>

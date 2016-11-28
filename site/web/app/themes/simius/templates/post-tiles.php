<?php
/**
 * Template post tiles
 */
?>
<div class="post-tiles">
    <div class="post-tiles__row">
    <?php
    if (empty($query)) {
        throw new Exception('Query is empty!');
    }
    $index = 0;
    while ($query->have_posts()) : $query->the_post();
    $index++;
    ?>
        <div class="post">
            <div class="post__thumb<?php echo (!has_post_thumbnail() ? ' post__thumb--fallback' : ''); ?>">
                <a class="post__link" href="<?php the_permalink(); ?>">
                    <?php if (has_post_thumbnail() && !$query->is_search): ?>
                        <?php the_post_thumbnail('thumbnail-small'); ?>
                    <?php endif; ?>
                </a>
            </div>
            <div class="date"><?php echo get_the_date(); ?></div>
            <h3 class="post__title">
                <a href="<?php the_permalink() ?>" class="post__link"><?php the_title(); ?></a>
            </h3>
        </div>
    <?php if ($index % 2 == 0 && $index != $query->query['posts_per_page']): ?>
    </div>
    <div class="post-tiles__row">
    <?php endif; ?>
<?php endwhile; wp_reset_postdata(); ?>
</div>

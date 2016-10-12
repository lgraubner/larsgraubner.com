<?php while (have_posts()) : the_post(); ?>
<section class="intro section">
    <div class="inner">
        <div class="portrait">
            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/lars.jpg" srcset="<?php echo get_template_directory_uri(); ?>/assets/images/lars.jpg, <?php echo get_template_directory_uri(); ?>/assets/images/lars@2x.jpg 2x" class="portrait__image" width="110" height="110" alt="Lars Graubner" />
        </div>
        <?php the_content(); ?>
        <a href="<?php echo get_page_link(get_page_by_path('about')); ?>" class="button">Learn more about me</a>
    </div>
</section>
<?php endwhile; ?>

<?php
$args = array(
  'posts_per_page' => 4,
  'cat' => get_category_by_slug('featured')->term_id,
);
$featured = new WP_Query($args);
if ($featured->have_posts()) :
?>
<section class="featured-posts section">
  <div class="inner">
      <h2>Featured posts</h2>
      <div class="post-list">
        <?php
        $month = null;
        while ($featured->have_posts()) : $featured->the_post();
        ?>
          <div class="post">
            <?php if (has_post_thumbnail() && !is_search()): ?>
              <div class="post__thumb">
                <a class="post__link" href="<?php the_permalink(); ?>">
                  <?php the_post_thumbnail('thumbnail-small'); ?>
                </a>
              </div>
            <?php endif; ?>
            <div class="date"><?php echo get_the_date(); ?></div>
            <h3 class="post__title">
              <a href="<?php the_permalink() ?>" class="post__link"><?php the_title(); ?></a>
            </h3>
          </div>
        <?php endwhile; wp_reset_postdata(); ?>
        </div>
      <a href="<?php echo get_page_link(get_page_by_path('blog')); ?>" class="button">View all blog posts</a>
  </div>
</section>
<?php endif; ?>

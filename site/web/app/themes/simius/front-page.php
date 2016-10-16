<?php while (have_posts()) : the_post(); ?>
<section class="intro section">
    <div class="inner">
        <div class="portrait">
            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/lars-110x110.jpg" srcset="<?php echo get_template_directory_uri(); ?>/assets/images/lars-110x110.jpg, <?php echo get_template_directory_uri(); ?>/assets/images/lars-110x110@2x.jpg 2x" class="portrait__image" width="110" height="110" alt="Lars Graubner" />
        </div>
        <?php the_content(); ?>
        <a href="<?php echo get_page_link(get_page_by_path('about')); ?>" class="button">Learn more about me</a>
    </div>
</section>
<?php endwhile; ?>

<?php
$args = array(
  'posts_per_page' => 2,
  'cat' => get_category_by_slug('featured')->term_id,
);
$query = new WP_Query($args);
if ($query->have_posts()) :
?>
<section class="featured-posts section">
  <div class="inner">
      <h2>Featured posts</h2>
      <?php include(locate_template('templates/post-tiles.php')); ?>
      <a href="<?php echo get_page_link(get_page_by_path('blog')); ?>" class="button">View all blog posts</a>
  </div>
</section>
<?php endif; ?>

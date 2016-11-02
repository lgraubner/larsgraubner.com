<?php
/**
 * Template for front-page
 */

while (have_posts()) : the_post(); ?>
<section class="section intro">
    <div class="inner">
        <div class="portrait">
            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/lars-110x110.jpg" srcset="<?php echo get_template_directory_uri(); ?>/assets/images/lars-110x110.jpg, <?php echo get_template_directory_uri(); ?>/assets/images/lars-110x110@2x.jpg 2x" class="portrait__image" width="110" height="110" alt="Lars Graubner" />
        </div>
        <?php the_content(); ?>
        <a href="<?php echo get_page_link(get_page_by_path('about')); ?>" class="button">Learn more about me</a>
    </div>
</section>
<?php endwhile; ?>

<section class="section section__featured-posts">
    <?php get_template_part('templates/featured-posts'); ?>
    <a href="<?php echo get_page_link(get_page_by_path('blog')); ?>" class="button">View all articles</a>
</section>

<div class="page-header">
  <div class="inner">
      <h1>Thoughts and more.</h1>
  </div>
</div>

<div class="post-list">
  <div class="inner">
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
      <div class="post-list__item post">
        <div class="date"><?php the_date(); ?></div>
        <h2 class="post__title">
          <a class="post__link" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
        </h2>
        <?php if (has_post_thumbnail()): ?>
          <div class="post__thumb">
            <?php the_post_thumbnail(); ?>
          </div>
        <?php endif; ?>
        <div class="post__content post__content--excerpt">
          <?php the_excerpt(); ?>
          <a href="<?php the_permalink(); ?>" class="button">
            Continue reading
          </a>
        </div>
      </div>
    <?php endwhile; endif; ?>
  </div>
</div>

<?php Roots\Sage\Extras\pagination_nav(); ?>

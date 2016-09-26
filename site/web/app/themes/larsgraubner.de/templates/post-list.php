<div class="post-list">
  <div class="inner">
    <?php while (have_posts()): the_post(); ?>
      <div class="post-list__item post">
        <div class="date"><?php echo get_the_date(); ?></div>
        <h2 class="post__title">
          <a class="post__link" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
        </h2>
        <?php if (has_post_thumbnail() && !is_search()): ?>
          <div class="post__thumb">
              <a class="post__link" href="<?php the_permalink(); ?>">
                <?php the_post_thumbnail(680, 9999); ?>
              </a>
          </div>
        <?php endif; ?>
        <div class="post__content post__content--excerpt">
          <?php the_excerpt(); ?>
          <a href="<?php the_permalink(); ?>" class="button">
            Continue reading
          </a>
        </div>
      </div>
    <?php endwhile; ?>
  </div>
</div>

<div class="page-header">
  <h1>Thoughts and more.</h1>
</div>

<div class="post-list">
  <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <div class="post-list__item">
      <div class="date"><?php the_date(); ?></div>
      <h2 class="post__title">
        <a class="post__link" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
      </h2>
      <div class="post__content post__content--excerpt">
        <?php the_excerpt(); ?>
        <a href="<?php the_permalink(); ?>" class="button">
          Read more
        </a>
      </div>
    </div>
  <?php endwhile; endif; ?>
</div>

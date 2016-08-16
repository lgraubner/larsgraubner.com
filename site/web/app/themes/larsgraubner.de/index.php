<div class="page-header">
  <h1>Thoughts and more.</h1>
</div>

<div class="post-list">
  <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <div class="post-list__item">
      <div class="post-list__date"><?php the_date(); ?></div>
      <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
    </div>
  <?php endwhile; endif; ?>
</div>

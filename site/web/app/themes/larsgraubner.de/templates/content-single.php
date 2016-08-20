<?php while (have_posts()) : the_post(); ?>
  <article <?php post_class(); ?>>
    <header>
      <div class="date">
        <?php the_date(); ?>
      </div>
      <h1 class="post__title"><?php the_title(); ?></h1>
    </header>
    <?php if (has_post_thumbnail()): ?>
      <div class="post__thumb">
        <?php the_post_thumbnail(); ?>
      </div>
    <?php endif; ?>
    <div class="post__content">
      <?php the_content(); ?>
    </div>

  </article>
<?php endwhile; ?>

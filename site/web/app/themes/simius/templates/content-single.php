<?php use Simius\Titles; ?>
<?php while (have_posts()) : the_post(); ?>
  <article <?php post_class(); ?>>
    <div class="inner">
      <header>
        <div class="date">
          <?php the_date(); ?>
        </div>
        <h1 class="post__title"><?= Titles\title(); ?></h1>
      </header>
      <?php if (has_post_thumbnail()): ?>
        <div class="post__thumb">
          <?php the_post_thumbnail(); ?>
        </div>
      <?php endif; ?>
      <div class="post__content">
        <?php the_content(); ?>
      </div>
    </div>
    <div class="post__footer">
        <div class="inner">
          <?php
          if(get_the_tag_list()) {
              echo '<div class="tags">';
              echo get_the_tag_list('<ul><li>','</li><li>','</li></ul>');
              echo '</div>';
          }
          ?>
          <?php get_template_part('templates/bio'); ?>
        </div>
    </div>

  </article>
<?php endwhile; ?>

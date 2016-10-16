<div class="related-posts">
  <?php
  $tags = wp_get_post_tags(get_the_ID());
  if ($tags) {
    $tag_ids = array();
    foreach($tags as $individual_tag) {
        $tag_ids[] = $individual_tag->term_id;
    }

    $args = array(
      'tag__in' => $tag_ids,
      'post__not_in' => array(get_the_ID()),
      'posts_per_page' => 4,
    );
    $query = new WP_Query($args);

    if ($query->have_posts()) {
      echo '<h4 class="related-posts__title">Related posts</h4>';
      include(locate_template('templates/post-tiles.php'));
    }
  }
  ?>
</div>

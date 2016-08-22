<?php
    // @TODO: Catchy Quote, intro about
?>

<?php
$args = array(
  'posts_per_page' => 5,
);
$latest = new WP_Query($args);
if ($latest->have_posts()) :
?>
<div class="latest-posts">
  <h2>Latest blog posts</h2>
  <ul>
    <?php
    while ($latest->have_posts()) : $latest->the_post();
    ?>
    <li>
      <a href="<?php the_permalink() ?>"><?php the_title(); ?></a>
    </li>
    <?php endwhile; wp_reset_postdata(); endif; ?>
  </ul>
</div>

<?php
    // @TODO: Twitter
?>

<?php
    // @TODO: References
?>

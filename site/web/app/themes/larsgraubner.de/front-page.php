<section class="intro section">
    <div class="inner">
        <div class="portrait">
          <?php // @TODO: hover effect ?>
            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/lars@2x.jpg" alt="Lars Graubner" />
        </div>
        <p>I'm building web sites and web applications aiming for clean and efficient code to make the web even more awesome. My daily business includes the use of Javscript, Node, React and Wordpress.</p>

        <p>I'm building web sites and web applications aiming for clean and efficient code to make the web even more awesome. My daily business includes the use of Javscript, Node, React and Wordpress. <a href="<?php echo get_page_link(get_page_by_path('blog')); ?>">My personal blog</a> documents learnings and enlightments I have had as well as other useful stuff.</p>
        <a href="<?php echo get_page_link(get_page_by_path('about')); ?>" class="button">Learn more about me</a>
    </div>
</section>

<section class="twitter section section--gray">
  <div class="inner">
      <h2>Recently on Twitter</h2>
      <input type="hidden" name="_wpnonce" value="<?php echo wp_create_nonce('lg_twitter_nonce'); ?>" />
      <div id="tweet">
        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/loading.svg" width="40" alt="loading..." class="loading-animation">
      </div>
  </div>
</section>

<?php
$args = array(
  'posts_per_page' => 5,
);
$latest = new WP_Query($args);
if ($latest->have_posts()) :
?>
<section class="latest-posts section">
  <div class="inner">
      <h2>Latest blog posts</h2>
      <?php
      $month = null;
      while ($latest->have_posts()) : $latest->the_post();
        $newmonth = get_the_date('F');
        if ($month != $newmonth) {
          if (!is_null($month)) {
            echo '</ul>';
          }
          echo '<div class="date">' . $newmonth . '</div>';
          echo '<ul>';
        }
      ?>
        <li>
          <a href="<?php the_permalink() ?>"><?php the_title(); ?></a>
        </li>
        <?php $month = $newmonth; endwhile; wp_reset_postdata(); ?>
      </ul>
      <a href="<?php echo get_page_link(get_page_by_path('blog')); ?>" class="button">View all blog posts</a>
  </div>
</section>
<?php endif; ?>

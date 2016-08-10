<?php dynamic_sidebar('sidebar-footer'); ?>

<div class="social">
  <ul>
    <li class="social__item social__item--facebook">
      <a href="#" target="_blank"></a>
    </li>
    <li class="social__item social__item--twitter">
      <a href="#" target="_blank"></a>
    </li>
    <li class="social__item social__item--rss">
      <a href="<?= esc_url(home_url('/feed/')); ?>" target="_blank"></a>
    </li>
  </ul>
</div>

<!-- newsletter -->
<?php /* <div class="content" style="background-color:#fe6e00;color:#ffffff;font-family:Roboto Condensed,sans-serif;font-size:1.25em">
<div class="inner">
  <?php get_template_part('newsletter'); ?>
</div>
</div> */ ?>
<footer class="footer">
  <?php
  if (has_nav_menu('footer_navigation')) :
    wp_nav_menu(['theme_location' => 'footer_navigation']);
  endif;
  ?>
</footer>

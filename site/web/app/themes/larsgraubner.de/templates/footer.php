<?php dynamic_sidebar('sidebar-footer'); ?>

<footer class="footer">
  <?php
  if (has_nav_menu('footer_navigation')):
    wp_nav_menu(['theme_location' => 'footer_navigation']);
  endif;
  ?>
</footer>

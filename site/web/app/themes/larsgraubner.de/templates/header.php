<header class="header">
  <div class="inner">
    <div class="logo">
      <a href="<?= esc_url(home_url('/')); ?>"><?php bloginfo('name'); ?></a>
    </div>
    <nav role="navigation">
      <?php
      if (has_nav_menu('header_navigation')) :
        wp_nav_menu(['theme_location' => 'header_navigation']);
      endif;
      ?>
    </nav>
  </div>
</header>

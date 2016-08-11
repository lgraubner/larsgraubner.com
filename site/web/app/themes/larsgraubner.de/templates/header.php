<header class="header">
  <div class="inner">
    <div class="logo">
      <a href="<?= esc_url(home_url('/')); ?>"><?php bloginfo('name'); ?></a>
    </div>
    <nav class="menu-wrapper" role="navigation">
      <button class="menu-close js-close-menu">Close Navigation</button>
      <?php
      if (has_nav_menu('header_navigation')) :
        wp_nav_menu(['theme_location' => 'header_navigation']);
      endif;
      ?>
    </nav>
  </div>
</header>

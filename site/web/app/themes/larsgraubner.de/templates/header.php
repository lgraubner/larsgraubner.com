<header class="header">
  <div class="inner">
    <?php if (is_front_page()): ?>
      <h1 class="logo">
    <?php else: ?>
      <h4 class="logo">
    <?php endif; ?>
        <a href="<?= esc_url(home_url('/')); ?>"><?php bloginfo('name'); ?></a>
    <?php if (is_front_page()): ?>
      </h1>
    <?php else: ?>
      </h4>
    <?php endif; ?>
    <nav role="navigation">
      <?php
      if (has_nav_menu('header_navigation')) :
        wp_nav_menu(['theme_location' => 'header_navigation']);
      endif;
      ?>
    </nav>
  </div>
</header>

<?php use Roots\Sage\Breadcrumbs; ?>

<header class="header">
  <div class="inner">
    <button class="menu-toggle js-toggle-menu">Toggle Navigation</button>
    <div class="logo">
      <a href="<?= esc_url(home_url('/')); ?>"><?php bloginfo('name'); ?></a>
    </div>
    <?php // get_template_part('region-picker'); ?>
    <div class="search-link">
      <button class="js-toggle-search-bar"><?php _e('Search', 'dm'); ?></button>
    </div>
    <nav class="menu-wrapper" role="navigation">
      <button class="menu-close js-close-menu">Close Navigation</button>
      <?php
      if (has_nav_menu('left_navigation')) :
        wp_nav_menu(['theme_location' => 'left_navigation']);
      endif;
      ?>
      <?php
      if (has_nav_menu('right_navigation')) :
        wp_nav_menu(['theme_location' => 'right_navigation']);
      endif;
      ?>
    </nav>
  </div>
  <div class="search-bar">
    <?php get_template_part('searchform'); ?>
  </div>
</header>
<?php Breadcrumbs\render(); ?>
<?php if (is_front_page()): ?>
  <section class="slider">
    <div class="slider__slide">
      <?php if (get_option('deal')['type'] == 'casino'): ?>
        <?php get_template_part('templates/slide', 'casino'); ?>
      <?php else: ?>
        <?php get_template_part('templates/slide', 'wetten'); ?>
      <?php endif; ?>
    </div>
  </section>
<?php endif; ?>

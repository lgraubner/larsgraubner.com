<?php get_header(); ?>

  <main role="main">
    <header class="page-header page-header--subheading page-header--search">
      <div class="inner">
        <h1><?php _e('Search results'); ?></h1>
        <h2><?php echo sprintf( __('Your search for %s has %d results(s)'), get_search_query(), $wp_query->found_posts); ?>
        <?php get_template_part('searchform'); ?>
      </div>
    </header>
    <div class="content">
      <div class="inner">
        <?php get_template_part('loop', 'tiles'); ?>
      </div>
    </div>
  </main>

<?php get_footer(); ?>

<?php
namespace Simius\Cleanup;

/**
 * Remove wordpress scripts
 */
function remove_scripts() {
  if (!is_admin()) {
    wp_dequeue_script('wp-embed');
  }
}
add_action('wp_footer', __NAMESPACE__ . '\\remove_scripts');

/**
 * Remove various actions
 */
function remove_actions() {
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wp_shortlink_wp_head');
    remove_action('wp_head', 'rest_output_link_wp_head', 10);
    remove_action('wp_head', 'wp_oembed_add_discovery_links', 10);

    remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10);

    add_filter('the_generator', '__return_false');
    add_filter('show_admin_bar','__return_false');

    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );

    remove_action('wp_head', 'feed_links_extra', 3 );
}
add_action('after_setup_theme', __NAMESPACE__ . '\\remove_actions');

/**
 * Blacklist WordPress menu class names
 */
function remove_menu_classes( array $classes, $item, $args, $depth ) {
    if (in_array('current-menu-item', $classes)) {
      $classes[] = 'menu__item--active';
    }

    $classes = array_intersect($classes, array('menu__item', 'menu__item--active'));
    $classes = array_merge($classes, [
      'menu__item',
      sprintf('menu__item--%s', $item->post_name),
    ]);

    return $classes;
}
add_filter( 'nav_menu_css_class', __NAMESPACE__ . '\\remove_menu_classes', 10, 4 );

/**
 * Remove id from menus
 */
function remove_menu_id($var) {
  return '';
}
add_filter('nav_menu_item_id', __NAMESPACE__ . '\\remove_menu_id', 100, 1);

/**
 * Disable xmlrpc
 */
// add_filter('xmlrpc_enabled', '__return_false');

/**
 * Disable rest API
 */
add_filter('json_enabled', '__return_false');
add_filter('json_jsonp_enabled', '__return_false');

/**
 * Remove WP comment styles
 */
function remove_recent_comments_style() {
    global $wp_widget_factory;
    remove_action('wp_head', array($wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style'));
}
add_action('widgets_init', __NAMESPACE__ . '\\remove_recent_comments_style');

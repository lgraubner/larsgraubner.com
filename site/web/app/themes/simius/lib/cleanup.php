<?php
namespace Simius\Cleanup;

// remove wordpress scripts
function remove_scripts() {
  if (!is_admin()) {
    wp_dequeue_script('wp-embed');
  }
}
add_action('wp_footer', __NAMESPACE__ . '\\remove_scripts');

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

// Blacklist WordPress menu class names
function remove_menu_classes( array $classes, $item, $args, $depth ) {
    // $disallowed_class_names = array(
    //     "menu-item-object-{$item->object}",
    //     "menu-item-type-{$item->type}",
    //     "menu-item-{$item->ID}",
    //     "current-{$item->object}-item",
    //     "current-{$item->type}-item",
    //     "current-{$item->object}-parent",
    //     "current-{$item->type}-parent",
    //     "current-{$item->object}-ancestor",
    //     "current-{$item->type}-ancestor",
    //     'page_item',
    //     'page_item_has_children',
    //     "page-item-{$item->object_id}",
    //     'current_page_item',
    //     'current_page_parent',
    //     'current_page_ancestor',
    //     'menu-item',
    //     'menu-item-has-children',
    //     'menu-item-home',
    //     'current-menu-item',
    //     'current-menu-parent',
    //     'current-menu-ancestor',
    // );

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

// remove id from menus
function remove_menu_id($var) {
  return '';
}
add_filter('nav_menu_item_id', __NAMESPACE__ . '\\remove_menu_id', 100, 1);

// disable xmlrpc
add_filter('xmlrpc_enabled', '__return_false');

// remove wp emoji dns prefetch
function dns_prefetch_list( $hints, $relation_type ) {
    if ( 'dns-prefetch' === $relation_type ) {
        return ['//www.google-analytics.com'];
    }

    return $hints;
}
add_filter( 'wp_resource_hints', __NAMESPACE__ . '\\dns_prefetch_list', 10, 2 );

// disable rest API
add_filter('json_enabled', '__return_false');
add_filter('json_jsonp_enabled', '__return_false');

function remove_recent_comments_style() {
    global $wp_widget_factory;
    remove_action('wp_head', array($wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style'));
}
add_action('widgets_init', __NAMESPACE__ . '\\remove_recent_comments_style');

<?php

namespace Simius\Setup;

use Simius\Assets;

/**
 * Theme setup
 */
function setup() {
  // Enable features from Soil when plugin is activated
  // https://roots.io/plugins/soil/
  add_theme_support('soil-clean-up');
  add_theme_support('soil-nav-walker');
  add_theme_support('soil-nice-search');
  add_theme_support('soil-jquery-cdn');
  add_theme_support('soil-relative-urls');

  // Make theme available for translation
  // Community translations can be found at https://github.com/roots/sage-translations
  load_theme_textdomain('larsgraubner', get_template_directory() . '/lang');

  // Enable plugins to manage the document title
  // http://codex.wordpress.org/Function_Reference/add_theme_support#Title_Tag
  add_theme_support('title-tag');

  // Register wp_nav_menu() menus
  // http://codex.wordpress.org/Function_Reference/register_nav_menus
  register_nav_menus([
    'header_navigation' => __('Header Navigation', 'larsgraubner'),
    'footer_navigation' => __('Footer Navigation', 'larsgraubner'),
  ]);

  // Enable post thumbnails
  // http://codex.wordpress.org/Post_Thumbnails
  // http://codex.wordpress.org/Function_Reference/set_post_thumbnail_size
  // http://codex.wordpress.org/Function_Reference/add_image_size
  add_theme_support('post-thumbnails');
  set_post_thumbnail_size(610, 343, true);

  // default
  add_image_size('large-retina', 1360, 9999);
  add_image_size('small-retina', 750, 9999);

  // Enable post formats
  // http://codex.wordpress.org/Post_Formats
  add_theme_support('post-formats', ['aside', 'gallery', 'link', 'image', 'quote', 'video', 'audio']);

  // Enable HTML5 markup support
  // http://codex.wordpress.org/Function_Reference/add_theme_support#HTML5
  add_theme_support('html5', ['caption', 'comment-form', 'comment-list', 'gallery', 'search-form']);

  // Use main stylesheet for visual editor
  // To add custom styles edit /assets/styles/layouts/_tinymce.scss
  // add_editor_style(Assets\asset_path('styles/main.css'));
}
add_action('after_setup_theme', __NAMESPACE__ . '\\setup');

function adjust_image_sizes_attr( $sizes, $size ) {
   $sizes = '(max-width: 1360px) 100vw, 1360px';
   return $sizes;
}
add_filter( 'wp_calculate_image_sizes', __NAMESPACE__ . '\\adjust_image_sizes_attr', 10 , 2 );

/**
 * Register sidebars
 */
function widgets_init() {
  register_sidebar([
    'name'          => __('Footer', 'larsgraubner'),
    'id'            => 'sidebar-footer',
    'before_widget' => '<section class="widget %1$s %2$s">',
    'after_widget'  => '</section>',
    'before_title'  => '<h3>',
    'after_title'   => '</h3>'
  ]);
}
add_action('widgets_init', __NAMESPACE__ . '\\widgets_init');

/**
 * Determine which pages should NOT display the sidebar
 */
function display_sidebar() {
  static $display;

  isset($display) || $display = !in_array(true, [
    // The sidebar will NOT be displayed if ANY of the following return true.
    // @link https://codex.wordpress.org/Conditional_Tags
    is_404(),
    is_single(),
    is_front_page(),
    is_page_template('template-custom.php'),
  ]);

  return apply_filters('simius/display_sidebar', $display);
}

/**
 * Theme assets
 */
function assets() {
  wp_enqueue_style('simius', Assets\asset_path('styles/main.css'), false, null);

  if (is_single() && comments_open() && get_option('thread_comments')) {
    wp_enqueue_script('comment-reply');
  }

  // remove jQuery
  wp_deregister_script('jquery');

  wp_enqueue_script('simius/js', Assets\asset_path('scripts/main.js'), [], null, true);
}
add_action('wp_enqueue_scripts', __NAMESPACE__ . '\\assets', 100);

// add font loading
function font_assets() {
    echo '<script>' . file_get_contents(get_template_directory() . '/assets/scripts/fonts.js') . '</script>';
}

add_action('wp_head', __NAMESPACE__ . '\\font_assets');

// add js detection
function js_detection() {
    echo "<script>(function(H){H.className=H.className.replace(/\bno-js\b/,'js')})(document.documentElement)</script>";
}
add_action('wp_head', __NAMESPACE__ . '\\js_detection');

// redirect attachments to parent post
function redirect_attachment_page() {
    if ( is_attachment() ) {
        global $post;
        if ( $post && $post->post_parent ) {
            wp_redirect( esc_url( get_permalink( $post->post_parent ) ), 301 );
            exit;
        } else {
            wp_redirect( esc_url( home_url( '/' ) ), 301 );
            exit;
        }
    }
}
add_action( 'template_redirect', __NAMESPACE__ . '\\redirect_attachment_page' );

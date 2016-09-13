<?php
namespace Roots\Sage\Extras;
use Roots\Sage\Setup;
/**
 * Add <body> classes
 */
function body_class($classes) {
  // Add page slug if it doesn't exist
  if (is_single() || is_page() && !is_front_page()) {
    if (!in_array(basename(get_permalink()), $classes)) {
      $classes[] = basename(get_permalink());
    }
  }
  // Add class if sidebar is active
  if (Setup\display_sidebar()) {
    $classes[] = 'sidebar-primary';
  }
  return $classes;
}
add_filter('body_class', __NAMESPACE__ . '\\body_class');
/**
 * Clean up the_excerpt()
 */
function excerpt_more() {
  return '';
}
add_filter('excerpt_more', __NAMESPACE__ . '\\excerpt_more');

function pagination_nav() {
    global $wp_query;

    if ( $wp_query->max_num_pages > 1 ) { ?>
        <nav class="pagination" role="navigation">
            <div class="inner">
                <div class="pagination__previous"><?php next_posts_link('Older posts'); ?></div>
                <div class="pagination__next"><?php previous_posts_link('Newer posts'); ?></div>
            </div>
        </nav>
<?php }
}

function search_url_rewrite_rule() {
    if ( is_search() && !empty($_GET['s'])) {
        wp_redirect(home_url("/search/") . urlencode(get_query_var('s')));
        exit();
    }
}
add_action('template_redirect', __NAMESPACE__ . '\\search_url_rewrite_rule');

// add image size
add_image_size('preload', 136, 9999);
add_image_size('post-retina', 1360, 9999);

function image_tag($html, $id, $caption, $title, $align, $url, $size, $alt) {
    return sprintf('[image id="%s" url="%s"]', $id, $url);
}
add_filter('image_send_to_editor', __NAMESPACE__ . '\\image_tag', 10, 8);

function thumbnail_image_tag($html, $post_id, $post_thumbnail_id, $size, $attr) {
  return do_shortcode(sprintf('[image id="%s" thumb="false"]', $post_thumbnail_id));
}
add_filter('post_thumbnail_html', __NAMESPACE__ . '\\thumbnail_image_tag', 20, 5);

// remove paragraphs form images
function unautop_img($content) {
    $content = preg_replace(
        '/<p>\\s*?(<a rel=\"attachment.*?><img.*?><\\/a>|<img.*?>)?\\s*<\\/p>/s',
        '<figure>$1</figure>',
        $content
    );
    return $content;
}
add_filter('the_content', __NAMESPACE__ . '\\unautop_img', 99);

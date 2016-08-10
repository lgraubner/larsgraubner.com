<?php
$args = array(
  'post_type' => 'deal',
  'meta_query' => array(
    'relation' => 'AND',
    array(
      'key' => '_dm_valid_till',
      'value' => time(),
      'compare' => '>',
    ),
    array(
      'key' => '_is_featured',
      'value' => 'no',
      'compare' => '=',
    ),
  ),
);
$args_featured = array(
  'meta_query' => array(
    'relation' => 'AND',
    array(
      'key' => '_dm_valid_till',
      'value' => time(),
      'compare' => '>',
    ),
    array(
      'key' => '_is_featured',
      'value' => 'yes',
      'compare' => '=',
    ),
  ),
);

// featured
$featured = new WP_Query(array_merge($args, $args_featured));
if ($featured->have_posts()) {
  while ($featured->have_posts()) {
    $featured->the_post();
    get_template_part('templates/tile');
  }
  wp_reset_postdata();
}

// main
$deals = new WP_Query($args);
if ($deals->have_posts()) {
  while ($deals->have_posts()) {
    $deals->the_post();
    get_template_part('templates/tile');
  }
  wp_reset_postdata();
}
?>

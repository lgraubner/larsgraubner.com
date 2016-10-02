<?php
namespace Simius\Shortcodes;

function image($atts) {
    $a = shortcode_atts(array(
        'id' => null,
    ), $atts);

    if (is_null($a['id'])) {
        return;
    }

    return wp_get_attachment_image($a['id']);
}
add_shortcode('image', __NAMESPACE__ . '\\image');

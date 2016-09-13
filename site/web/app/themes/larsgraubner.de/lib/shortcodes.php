<?php
function codeblock_func($atts, $content) {
    $a = shortcode_atts( array(
        'lang' => 'javascript',
        'linestart' => 0,
    ), $atts );

    return sprintf('<pre data-start="%s"><code class="language-%s">%s</code></pre>', $a['linestart'], $a['lang'], $content);
}
add_shortcode( 'codeblock', 'codeblock_func' );

function image_func($atts) {
    $a = shortcode_atts(array(
        'id' => null,
        'thumb' => false,
        'url' => null,
    ), $atts);
    if (is_null($a['id'])) {
        return;
    }

    $img_src_preload = wp_get_attachment_image_src($a['id'], 'preload');
    $img_src_retina = wp_get_attachment_image_src($a['id'], 'post-retina');
    $max_width = 680;

    $image = get_post($a['id']);

    $alt = get_post_meta( $a['id'], '_wp_attachment_image_alt', true);
    $caption = $image->post_excerpt;

    $width = ($img_src_retina[1] < $max_width ? $img_src_retina[1] : $max_width);
    $height = ($img_src_retina[1] < $max_width ? $img_src_retina[2] : ($img_src_retina[2] / $img_src_retina[1]) * $max_width);

    $image = '<figure class="image">';
    $image .= '<div class="image__placeholder" style="padding-bottom: ' . ($height / $width) * 100 . '%;"></div>';
    $image_tag = '<img src="' . $img_src_preload[0] . '" data-orig="' . $img_src_retina[0] . '" width="' . $img_src_retina[1] . '" height="' . $img_src_retina[2] . '" alt="' . $alt . '" />';
    if (!is_null($a['url'])) {
        $image .= '<a href="' . $a['url'] . '">' . $image_tag . '</a>';
    } else {
        $image .= $image_tag;
    }

    $image .= '<noscript>';
    $image .= '<img src="' . $img_src_retina[0] . '" width="' . $img_src_retina[1] . '" height="' . $img_src_retina[2] . '" alt="' . $alt . '" class="fallback" />';
    $image .= '</noscript>';
    if (!empty($caption) && !$a['thumb']) {
        $image .= '<figcaption class="image__caption">' . $caption . '</figcaption>';
    }
    $image .= '</figure>';

    return $image;
}
add_shortcode('image', 'image_func');

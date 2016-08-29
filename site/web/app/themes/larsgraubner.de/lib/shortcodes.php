<?php
function codeblock_func($atts, $content) {
    $a = shortcode_atts( array(
        'lang' => 'javascript',
        'linestart' => 0,
    ), $atts );

    return sprintf('<pre data-start="%s"><code class="language-%s">%s</code></pre>', $a['linestart'], $a['lang'], $content);
}
add_shortcode( 'codeblock', 'codeblock_func' );

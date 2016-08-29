<?php

use Abraham\TwitterOAuth\TwitterOAuth;

add_action('wp_ajax_twitter', 'lg_twitter');
add_action('wp_ajax_nopriv_twitter', 'lg_twitter');

function lg_twitter() {
    if (!wp_verify_nonce($_REQUEST['_wpnonce'], 'lg_twitter_nonce')) {
        wp_die();
    }

    $connection = new TwitterOAuth('ODEysXlq4kxLYcVkzjgF0RpmA', 'z1KdR6QteUWXRhmhXo8O0jspPe591k7q2WB9sSEBje1zuwmmqM', '613599566-zF4TTQtRKXAxjU728cc98hSQRsvw4Sl19lWBpEDf', 'UeqHQQ74bgMsfxYD5GNrcCOqwsdjlSyu87OHV6hD8CSwe');
    $tweets = $connection->get('statuses/user_timeline', [
        'screen_name' => 'larsgraubner',
        'count' => 1,
    ]);
    if ($connection->getLastHTTPCode() == 200) {
        echo json_encode(array(
            'statusText' => 'ok',
            'status' => 200,
            'data' => $tweets,
        ));
    } else {
        echo json_encode(array(
            'statusText' => 'error',
            'status' => $connection->getLastHTTPCode(),
        ));
    }
    wp_die();
}

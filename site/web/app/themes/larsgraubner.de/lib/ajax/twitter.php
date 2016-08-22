<?php

use Abraham\TwitterOAuth\TwitterOAuth;

add_action('wp_ajax_twitter', 'lg_twitter');
add_action('wp_ajax_nopriv_twitter', 'lg_twitter');

function lg_get_tweets() {
    if (!wp_verify_nonce($_REQUEST['nonce'], 'lg_twitter_nonce')) {
        exit();
    }

    $connection = new TwitterOAuth(TWTR_CONSUMER_KEY, TWTR_CONSUMER_SECRET, TWTR_ACCESS_TOKEN, TWTR_ACCESS_TOKEN_SECRET);
    $tweets = $connection->get('', ['q' => 'larsgraubner']);
    if ($connection->getLastHTTPCode() == 200) {
        echo $tweets;
    } else {
        echo json_encode(array(
            'statusText' => 'error',
        ));
    }
}

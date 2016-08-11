<form class="searchform" method="get" action="<?= esc_url(home_url()); ?>" role="search">
  <input class="searchform__input" value="<?php echo get_search_query(); ?>" type="search" name="s" placeholder="<?php _e( 'search term', 'larsgraubner' ); ?>">
  <button class="searchform__submit" type="submit" role="button"><?php _e( 'Search', 'larsgraubner' ); ?></button>
  <button class="searchform__close js-close-search-bar">x</button>
</form>

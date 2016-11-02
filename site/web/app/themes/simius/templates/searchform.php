<?php
/**
 * Template search form
 */
?>
<form class="searchform" method="get" action="<?php echo esc_url(home_url()); ?>" role="search">
    <input class="searchform__input" value="<?php echo get_search_query(); ?>" type="search" name="s" placeholder="<?php _e( 'Search article...', 'larsgraubner' ); ?>">
    <button class="searchform__submit" type="submit" role="button"><?php _e( 'Go!', 'larsgraubner' ); ?></button>
</form>

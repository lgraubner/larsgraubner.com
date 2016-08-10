<?php
$lang = pll_current_language();
$default = pll_default_language();
$prefix = '/' . $lang . '/';
if ($lang == $default) {
  $prefix = '/';
}
if (!isset($loop_context)) {
  $loop_context = '';
}
?>
<?php if (have_posts()): while (have_posts()) : the_post(); ?>
  <?php
    $exclusive = deal_infos_get_meta( 'deal_infos_exklusiver_bonus' );
    $post_id = get_the_ID();
    $casino = wp_get_post_terms( $post_id, 'casino', array() );
    $casino_image = get_term_meta($casino[0]->term_id, '_dm_casino_logo');

    $checked = deal_infos_get_meta( 'deal_infos_geprft' );
    $bonus_suffix = dm_bonus_suffix(deal_infos_get_meta( 'deal_infos_bonusart' ));
    $meta_end = get_post_meta( get_the_ID(), 'deal_gltigkeit_gltig_bis_timestamp' , true);
    $soon = ($meta_end - time()) < (86400*7);
    $simple = deal_link_get_meta('deal_link_simple') === 'simple';
    $expired = false;
    if ($meta_end) {
      // end date including actual day
      $end = $meta_end;
      $now = time();

      if ($end < $now) {
        $expired = true;
      }
    }
  ?>
    <div class="tile-wide<?php echo ($expired ? ' tile-wide--expired' : ''); ?>">
      <div class="tile-wide__logo">
        <img src="<?php print $casino_image[0]; ?>" class="attachment-deal-logo size-deal-logo wp-post-image" alt="<?= $casino[0]->name?>">
      </div>
      <div class="tile-wide__content">
        <div class="tile-wide__meta">
        <span class="tile-wide__date">
          <?php the_time('D, d-m-Y'); ?>
        </span>
        <?php if ($exclusive) :?>
        <span class="tile-wide__exclusive">
          exklusive
        </span>
        <?php endif; ?>
        <?php if ($soon) : ?>
        <span class="tile-wide__endssoon">
          Deal expires soon
        </span>
        <?php endif;?>
        <?php if ($checked): ?>
        <span class="tile-wide__checked">
          verified
        </span>
        <?php endif; ?>
          <div class="tile-wide__used">
            Already used <span class="value"><?=deal_infos_get_meta( 'deal_infos_dealcounter_klicks' )?>x</span>
          </div>
        </div>
        <div class="tile-wide__text">
          <?php if($expired && $loop_context == 'single-more'): ?>
          <?php else: ?>
          <a href="<?php the_permalink(); ?>">
          <?php endif;?>
            <?php if (get_post_meta(get_the_ID(), 'deal_infos_varies', true) == 'varies'): ?>
                <span class="tile-wide__bonus"><?= sprintf('%s: varies - ', deal_infos_get_meta( 'deal_infos_bonusart' )) ?></span>
            <?php else: ?>
                <span class="tile-wide__bonus"><?= sprintf('%s: %s%s - ', deal_infos_get_meta( 'deal_infos_bonusart' ), number_format(deal_infos_get_meta( 'deal_infos_maximaler_bonus_mglich' ), 0, ',', '.'), $bonus_suffix) ?></span>
            <?php endif; ?>
            <span class="tile-wide__title"><?php the_title(); ?></span>
          <?php if($expired && $loop_context == 'single-more'): ?>
          <?php else: ?>
          </a>
          <?php endif;?>
        </div>
        <div class="tile-wide__teaser">
          <?= deal_darstellung_get_meta( 'deal_darstellung_subheadline' ) ?>
        </div>
        <div class="tile-wide__appendix">
          <div class="tile-wide__ends">
            <?php if(deal_infos_get_meta( 'deal_infos_neukundenbonus' ) === 'neukundenbonus' ): ?>
              Only for new customers
            <?php else: ?>
            <?php echo sprintf(__('Valid till %s', 'cdio'), date('d-m-Y', intval($meta_end))); ?>
            <?php endif;?>
          </div>
          <?php if(!in_array($loop_context, array('casino', 'single-more'))) : ?>
          <div class="tile-wide__crosslink">
            <a href="<?= sprintf('%scasinos/%s', $prefix, $casino[0]->slug)?>">
              <?= sprintf('Show all deals of %s', $casino[0]->name) ?>
            </a>
          </div>
          <?php endif; ?>

        </div>
        <?php if(!$simple) : ?>
        <div class="tile-wide__codebox<?php echo (!$expired ? ' tile-wide__codebox--enabled' : ''); ?>">
          <?php if($expired && $loop_context == 'single-more'): ?>
            <span>Get Code</span>
          <?php else: ?>
          <a rel="nofollow" class="js-get-code" data-cardid="<?= $post->ID ?>" data-url="<?= get_post_permalink($post->ID) ?>" data-slug="<?= $post->post_name ?>">
            Get Code
          </a>
          <?php endif;?>
          <div class="tile-wide__codevalue">**********</div>
        </div>
        <?php else: ?>
          <div class="tile-wide__codebox">
          <?php if($expired && $loop_context == 'single-more'): ?>
            <span>Claim deal now!</span>
          <?php else: ?>
            <a rel="nofollow" href="<?= sprintf('/go/%s/', $post->post_name) ?>" target="_blank">
              Claim deal now!
            </a>
          <?php endif; ?>
          </div>
        <?php endif; ?>
      </div>
    </div>
  <?php endwhile; else: ?>

    <div class="__no-results">
      No current deals offered with your active selection
    </div>

  <?php endif; ?>

<?php get_header(); ?>
<?php
$value_query = new WP_Query(array(
  'post_type' => 'deal',
  'posts_per_page' => -1,
  'meta_query' => array(
    array(
      'key' => 'deal_gltigkeit_gltig_ab_timestamp',
      'value' => time(),
      'compare' => '<',
    ),
  )
));

$bonus = array();
$bonus_p = array();
$type = array();
$umsatz = array();

if ($value_query->have_posts()) {
  while ($value_query->have_posts()) {
    $value_query->the_post();



    $bonus_p_val = get_post_meta(get_the_ID(), dm_FILTER_BONUS_P, true);
    if (!empty($bonus_p_val)) {
      $bonus_p[] = $bonus_p_val;
    }

    $bonus_type = get_post_meta(get_the_ID(), dm_FILTER_TYPE, true);
    if (!empty($bonus_type)) {
      $type[] = $bonus_type;
    }

    $bonus_val = get_post_meta(get_the_ID(), dm_FILTER_BONUS, true);
    if (!empty($bonus_val)) {
      // skip spins for now
      if ($bonus_type == 'Free Spin') {
        continue;
      }
      $bonus[] = number_format($bonus_val, 0, ',', '.');
    }

    $umsatz_f_bonus = get_post_meta(get_the_ID(), dm_FILTER_FAKTOR_BONUS, true);
    $umsatz_f_einzahlung = get_post_meta(get_the_ID(), dm_FILTER_FAKTOR_EZ, true);

    if (empty($umsatz_f_bonus) && empty($umsatz_f_einzahlung)) {
      continue;
    }

    if (!empty($umsatz_f_bonus && !empty($umsatz_f_einzahlung))) {
      $u = sprintf('%dxb + %dxd', $umsatz_f_bonus, $umsatz_f_einzahlung);
      $umsatz[] = $u;
      continue;
    }

    if (!empty($umsatz_f_bonus)) {
      $u = sprintf('%dxb', $umsatz_f_bonus);
    } else {
      $u = sprintf('%dxd', $umsatz_f_einzahlung);
    }
    $umsatz[] = $u;
  }
  wp_reset_postdata();
}

$bonus = array_unique($bonus);
$bonus_p = array_unique($bonus_p);
$type = array_unique($type);
$umsatz = array_unique($umsatz);
?>

<main role="main" class="all-deals">
  <header class="page-header">
    <div class="inner">
      <h1><?php _e('All deals', 'cdio'); ?></h1>
    </div>
  </header>
  <div class="content">
    <button class="filter-toggle js-toggle-filters">Deals filtern</button>
    <div class="inner">
      <div class="filter">
        <div class="filter__title">
          <button class="filter__close js-close-filter"><?php _e('Please filter:', 'cdio'); ?></button>
        </div>
        <div class="filter__list">
          <div class="filter__item js-show-popup filter__item--active" data-filter="all">
            <?php _e('All deals', 'cdio'); ?>
          </div>
          <div class="filter__item js-show-popup" data-filter="bonus">
            <?php _e('Bonus value', 'cdio'); ?>
          </div>
          <div class="filter__item js-show-popup" data-filter="conditions">
            <?php _e('Wagering req.', 'cdio'); ?>
          </div>
          <div class="filter__item js-show-popup" data-filter="bonus_p">
            <?php _e('Max Bonus %', 'cdio'); ?>
          </div>
          <div class="filter__item js-show-popup" data-filter="type">
            <?php _e('Bonus Type', 'cdio'); ?>
          </div>
        </div>
        <div class="filter__popup popup" data-active="all">
          <div class="popup__header">
            <div class="popup__title">
              <?php _e('Please filter:', 'cdio'); ?>
            </div>
            <div class="filter__list">
              <div class="filter__item js-show-popup filter__item--active" data-filter="all">
                <?php _e('All deals', 'cdio'); ?>
              </div>
              <div class="filter__item js-show-popup" data-filter="bonus">
                <?php _e('Bonus value', 'cdio'); ?>
              </div>
              <div class="filter__item js-show-popup" data-filter="conditions">
                <?php _e('Wagering req.', 'cdio'); ?>
              </div>
              <div class="filter__item js-show-popup" data-filter="bonus_p">
                <?php _e('Max Bonus %', 'cdio'); ?>
              </div>
              <div class="filter__item js-show-popup" data-filter="type">
                <?php _e('Bonus Type', 'cdio'); ?>
              </div>
            </div>
          </div>
          <div class="popup__options">
            <div class="popup__option popup__option--bonus">
              <div class="popup__option-desc filter__item js-filter-back">
                <?php _e('Bonus value', 'cdio'); ?>
              </div>
              <?php foreach ($bonus as $b): ?>
                <button class="popup__value js-apply-filter" data-value="<?= $b ?>"><?= $b ?>€</button>
              <?php endforeach; ?>
            </div>
            <div class="popup__option popup__option--conditions">
              <div class="popup__option-desc filter__item js-filter-back">
                <?php _e('Wagering req.', 'cdio'); ?>
              </div>
              <?php foreach ($umsatz as $u): ?>
                <button class="popup__value js-apply-filter" data-value="<?= $u ?>"><?= $u ?></button>
              <?php endforeach; ?>
            </div>
            <div class="popup__option popup__option--bonus_p">
              <div class="popup__option-desc filter__item js-filter-back">
                <?php _e('Max Bonus %', 'cdio'); ?>
              </div>
              <?php foreach ($bonus_p as $p): ?>
                <button class="popup__value js-apply-filter" data-value="<?= $p ?>"><?= $p ?>%</button>
              <?php endforeach; ?>
            </div>
            <div class="popup__option popup__option--type">
              <div class="popup__option-desc filter__item js-filter-back">
                <?php _e('Bonus Type', 'cdio'); ?>
              </div>
              <?php foreach ($type as $t): ?>
                <button class="popup__value js-apply-filter" data-value="<?= $t ?>"><?= $t ?></button>
              <?php endforeach; ?>
            </div>
          </div>
          <button class="popup__close js-close-popup">close</button>
        </div>
      </div>
      <div class="tiles">
        <?php query_posts(array(
          'post_type' => 'deal',
          'posts_per_page' => -1,
          'orderby' => array('date' => 'DESC'),
          'meta_query' => array(
            array(
              'key' => 'deal_gltigkeit_gltig_ab_timestamp',
              'value' => time(),
              'compare' => '<',
            ),
          )
        ));
        ?>
        <?php get_template_part('loop'); ?>
      </div>
    </div>
  </div>
</main>
<?php get_footer(); ?>

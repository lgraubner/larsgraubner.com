<?php
$includes = [
    'lib/assets.php',
    'lib/extras.php',
    'lib/cleanup.php',
    'lib/setup.php',
    'lib/title.php',
    'lib/wrapper.php',
    'lib/page.php',
    'lib/ajax/twitter.php',
    'lib/shortcodes.php',
];

foreach ($includes as $file) {
  if (!$filepath = locate_template($file)) {
    trigger_error(sprintf(__('Error locating %s for inclusion'), $file), E_USER_ERROR);
  }

  require_once $filepath;
}
unset($file, $filepath);

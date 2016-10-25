<?php
use Simius\Setup;
use Simius\Wrapper;

/**
 * Base template
 */
?>

<!doctype html>
<html <?php language_attributes(); ?> class="no-js">
    <?php get_template_part('templates/head'); ?>
    <body <?php body_class(); ?>>
        <?php
            do_action('get_header');
            get_template_part('templates/header');
        ?>
        <div class="wrap container">
            <main role="main" class="content" id="content">
                <?php include Wrapper\template_path(); ?>
            </main>
        </div>
        <?php
            do_action('get_footer');
            get_template_part('templates/footer');
            wp_footer();
        ?>
    </body>
</html>

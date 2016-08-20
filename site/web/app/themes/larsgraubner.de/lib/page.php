<?php
add_action( 'cmb2_admin_init', 'cmb2_page_metaboxes' );
function cmb2_page_metaboxes() {
    $prefix = '_page_';

    $cmb = new_cmb2_box( array(
        'id'            => 'page_heading',
        'title'         => __( 'Heading', 'lg' ),
        'object_types'  => array( 'page' ),
        'context'       => 'normal',
        'priority'      => 'default',
        'show_names'    => true,
    ) );

    $cmb->add_field( array(
        'name'       => __( 'Heading', 'lg' ),
        'desc'       => __( 'Displayed instead of page title.', 'lg' ),
        'id'         => $prefix . 'heading',
        'type'       => 'text',
    ) );
}

<?php
/**
 * Get the bootstrap! If using the plugin from wordpress.org, REMOVE THIS!
 */
if ( file_exists( dirname( __FILE__ ) . '/lib/cmb2/init.php' ) ) {
	require_once dirname( __FILE__ ) . '/lib/cmb2/init.php';
} elseif ( file_exists( dirname( __FILE__ ) . '/lib/CMB2/init.php' ) ) {
	require_once dirname( __FILE__ ) . '/lib/CMB2/init.php';
}
require_once dirname( __FILE__ ) . '/lib/cmb2-field-post-search-ajax-master/cmb-field-post-search-ajax.php';
require_once dirname( __FILE__ ) . '/meta-boxes/meta-boxes.php';

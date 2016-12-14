<?php
defined( 'ABSPATH' ) or die( 'Cheatin\' uh?' );

define( 'WP_ROCKET_ADVANCED_CACHE', true );
$rocket_cache_path = '/Users/adrienlementheour/Travail/Thinkovery/thinkovery/dest/wp-content/cache/wp-rocket/';
$rocket_config_path = '/Users/adrienlementheour/Travail/Thinkovery/thinkovery/dest/wp-content/wp-rocket-config/';

if ( file_exists( '/Users/adrienlementheour/Travail/Thinkovery/thinkovery/dest/wp-content/plugins/wp-rocket/inc/front/process.php' ) ) {
	include( '/Users/adrienlementheour/Travail/Thinkovery/thinkovery/dest/wp-content/plugins/wp-rocket/inc/front/process.php' );
} else {
	define( 'WP_ROCKET_ADVANCED_CACHE_PROBLEM', true );
}
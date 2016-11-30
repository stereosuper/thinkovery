<?php
defined( 'ABSPATH' ) or die( 'Cheatin&#8217; uh?' );

/**
 * Discloses scan class.
 *
 * @package SecuPress
 * @subpackage SecuPress_Scan
 * @since 1.0
 */
class SecuPress_Scan_Discloses extends SecuPress_Scan implements SecuPress_Scan_Interface {

	/** Constants. ============================================================================== */

	/**
	 * Class version.
	 *
	 * @var (string)
	 */
	const VERSION = '1.0.1';


	/** Properties. ============================================================================= */

	/**
	 * The reference to the *Singleton* instance of this class.
	 *
	 * @var (object)
	 */
	protected static $_instance;


	/** Init and messages. ====================================================================== */

	/**
	 * Init.
	 *
	 * @since 1.0
	 */
	protected function init() {
		global $is_apache, $is_nginx, $is_iis7;

		$this->title = __( 'Check if your WordPress lists the its version.', 'secupress' );
		$this->more  = __( 'When an attacker wants to hack into a WordPress site, (s)he will search for all available informations. The goal is to find something useful that will help him penetrate your site. Don\'t let them easily find any informations.', 'secupress' );

		if ( ! $is_apache && ! $is_nginx && ! $is_iis7 ) {
			$this->more_fix = static::get_messages( 301 );
			$this->fixable  = false;
			return;
		}

		$this->more_fix  = __( 'Depending on the scan results, one (or all) of the following will be applied:', 'secupress' ) . '<br/>';

		if ( $is_apache ) {
			/** Translators: %s is a file name. */
			$this->more_fix .= sprintf( __( 'Add rules in your %s file to avoid attackers discovering your WordPress version and PHP versions.', 'secupress' ), '<code>.htaccess</code>' ) . '<br/>';
		} elseif ( $is_iis7 ) {
			/** Translators: %s is a file name. */
			$this->more_fix .= sprintf( __( 'Add rules in your %s file to avoid attackers discovering your WordPress version and PHP versions.', 'secupress' ), '<code>web.config</code>' ) . '<br/>';
		} else {
			/** Translators: %s is a file name. */
			$this->more_fix .= sprintf( __( 'The %s file cannot be edited automatically, you will be given the rules to add into this file manually, to avoid attackers discovering your WordPress version and PHP versions.', 'secupress' ), '<code>nginx.conf</code>' ) . '<br/>';
		}

		$this->more_fix .= __( 'The meta tag containing the WordPress version may be removed.', 'secupress' ) . '<br/>';
		$this->more_fix .= __( 'The WordPress version may be removed from the styles and scripts URLs.', 'secupress' );
	}


	/**
	 * Get messages.
	 *
	 * @since 1.0
	 *
	 * @param (int) $message_id A message ID.
	 *
	 * @return (string|array) A message if a message ID is provided. An array containing all messages otherwise.
	 */
	public static function get_messages( $message_id = null ) {
		$messages = array(
			// "good"
			0   => __( 'Your site does not reveal either your <strong>WordPress version</strong> or <strong>PHP version</strong>.', 'secupress' ),
			1   => __( 'The website does not display the <strong>PHP version</strong> in the request headers anymore.', 'secupress' ),
			/** Translators: %s is a file name */
			2   => sprintf( __( 'The %s file is now protected from revealing your <strong>WordPress version</strong>.', 'secupress' ), '<code>readme.html</code>' ),
			/** Translators: 1 is a file name */
			3   => __( 'Since the rules against the <strong>PHP version</strong> disclosure added to your %s file do not seem to work, another method has been used to remove this information.', 'secupress' ),
			4   => __( 'The generator meta tag should not be displayed anymore.', 'secupress' ),
			5   => __( 'The <strong>WordPress version</strong> should now be removed from your styles URLs.', 'secupress' ),
			6   => __( 'The <strong>WordPress version</strong> should now be removed from your scripts URLs.', 'secupress' ),
			// "warning"
			100 => __( 'Unable to determine if your homepage is still disclosing your <strong>WordPress version</strong>.', 'secupress' ),
			/** Translators: %s is an URL */
			101 => sprintf( __( 'Unable to determine is %s is still disclosing your <strong>WordPress version</strong>.', 'secupress' ), '<code>readme.html</code>' ),
			// "bad"
			200 => __( 'The website displays the <strong>PHP version</strong> in the request headers.', 'secupress' ),
			201 => __( 'The website displays the <strong>WordPress version</strong> in the homepage source code (%s).', 'secupress' ),
			/** Translators: %s is an URL */
			202 => sprintf( __( 'The %s file should not be accessible by anyone to avoid to reveal your <strong>WordPress version</strong>.', 'secupress' ), '<code>readme.html</code>' ),
			// "cantfix"
			/** Translators: 1 is a file name, 2 is some code */
			300 => sprintf( __( 'Your server runs <strong>Nginx</strong>, the <strong>WordPress version</strong> and <strong>PHP version</strong> disclosure cannot be fixed automatically but you can do it yourself by adding the following code to your %1$s file: %2$s', 'secupress' ), '<code>nginx.conf</code>', '%s' ),
			301 => __( 'Your server runs an unrecognized system. The <strong>WordPress version</strong> and <strong>PHP version</strong> disclosure cannot be fixed automatically.', 'secupress' ),
			/** Translators: 1 is a file name, 2 is some code */
			302 => sprintf( __( 'Your %1$s file is not writable. Please add the following lines at the beginning of the file: %2$s', 'secupress' ), '<code>.htaccess</code>', '%s' ),
			/** Translators: 1 is a file name, 2 is a folder path (kind of), 3 is some code */
			303 => sprintf( __( 'Your %1$s file is not writable. Please add the following lines inside the tags hierarchy %2$s (create it if does not exist): %3$s', 'secupress' ), '<code>web.config</code>', '%1$s', '%2$s' ),
			/** Translators: 1 is a file name, 2 is some code */
			304 => sprintf( __( 'Your server runs <strong>Nginx</strong>, the <strong>PHP version</strong> disclosure cannot be fixed automatically but you can do it yourself by adding the following code to your %1$s file: %2$s', 'secupress' ), '<code>nginx.conf</code>', '%s' ),
			/** Translators: 1 is a file name, 2 is some code */
			305 => sprintf( __( 'Your server runs <strong>Nginx</strong>, the <strong>WordPress version</strong> disclosure cannot be fixed automatically but you can do it yourself by adding the following code to your %1$s file: %2$s', 'secupress' ), '<code>nginx.conf</code>', '%s' ),
		);

		if ( isset( $message_id ) ) {
			return isset( $messages[ $message_id ] ) ? $messages[ $message_id ] : __( 'Unknown message', 'secupress' );
		}

		return $messages;
	}


	/** Scan. =================================================================================== */

	/**
	 * Scan for flaw(s).
	 *
	 * @since 1.0
	 *
	 * @return (array) The scan results.
	 */
	public function scan() {
		global $is_nginx;

		$wp_version   = get_bloginfo( 'version' );
		$php_version  = phpversion();
		$wp_discloses = array();
		$is_bad       = false;

		// Get home page contents. ==========================.
		$response     = wp_remote_get( add_query_arg( secupress_generate_key( 6 ), secupress_generate_key( 8 ), user_trailingslashit( home_url() ) ), $this->get_default_request_args() );
		$has_response = ! is_wp_error( $response ) && 200 === wp_remote_retrieve_response_code( $response );

		if ( $has_response ) {
			$powered_by = wp_remote_retrieve_header( $response, 'x-powered-by' );
			$body       = wp_remote_retrieve_body( $response );
		} else {
			// "warning"
			$this->add_message( 100 );
		}

		// PHP version in headers. ==========================.
		if ( $has_response && false !== strpos( $powered_by, $php_version ) ) {
			// "bad"
			$this->add_message( 200 );
			$is_bad = true;
		}

		// WordPress version in homepage source code. =======.
		if ( $has_response ) {
			// Meta tag.
			preg_match_all( '#<meta[^>]*[name="generator"]?[^>]*content="WordPress ' . $wp_version . '"[^>]*[name="generator"]?[^>]*>#si', $body, $matches );

			if ( array_filter( $matches ) ) {
				// "bad"
				$wp_discloses[] = 'META';
			}
		}

		// Style tag src.
		$style_url = home_url( '/fake.css?ver=' . $wp_version );

		/** This filter is documented in wp-includes/class.wp-styles.php */
		if ( apply_filters( 'style_loader_src', $style_url, 'secupress' ) === $style_url ) {
			// "bad"
			$wp_discloses[] = 'CSS';
		}

		// Script tag src.
		$script_url = home_url( '/fake.js?ver=' . $wp_version );

		/** This filter is documented in wp-includes/class.wp-scripts.php */
		if ( apply_filters( 'script_loader_src', $script_url, 'secupress' ) === $script_url ) {
			// "bad"
			$wp_discloses[] = 'JS';
		}

		// Sum up!
		if ( $wp_discloses ) {
			// "bad"
			$this->add_message( 201, array( $wp_discloses ) );
			$is_bad = true;
		}

		// Readme file. =====================================.
		$response = wp_remote_get( home_url( 'readme.html' ), $this->get_default_request_args() );

		if ( ! is_wp_error( $response ) ) {
			if ( 200 === wp_remote_retrieve_response_code( $response ) ) {
				// "bad"
				$this->add_message( 202 );
				$is_bad = true;
			}
		} else {
			// "warning"
			$this->add_message( 101 );
		}

		if ( $is_bad && ! $this->fixable ) {
			$this->add_pre_fix_message( 301 );
		}

		// "good"
		$this->maybe_set_status( 0 );

		return parent::scan();
	}


	/** Fix. ==================================================================================== */

	/**
	 * Try to fix the flaw(s).
	 *
	 * @since 1.0
	 *
	 * @return (array) The fix results.
	 */
	public function fix() {
		global $is_apache, $is_nginx, $is_iis7;

		$todo        = array();
		$wp_version  = get_bloginfo( 'version' );
		$php_version = phpversion();

		// Get home page contents. ==========================.
		$response     = wp_remote_get( add_query_arg( secupress_generate_key( 6 ), secupress_generate_key( 8 ), user_trailingslashit( home_url() ) ), $this->get_default_request_args() );
		$has_response = ! is_wp_error( $response ) && 200 === wp_remote_retrieve_response_code( $response );

		if ( $has_response ) {
			$powered_by = wp_remote_retrieve_header( $response, 'x-powered-by' );
			$body       = wp_remote_retrieve_body( $response );
		} else {
			// "warning"
			$this->add_fix_message( 100 );
		}

		// PHP version in headers. ==========================.
		if ( $has_response && false !== strpos( $powered_by, $php_version ) ) {
			$todo['php_version'] = 1;
		}

		// WordPress version in homepage source code. =======.
		if ( $has_response ) {
			// Meta tag.
			preg_match_all( '#<meta[^>]*[name="generator"]?[^>]*content="WordPress ' . $wp_version . '"[^>]*[name="generator"]?[^>]*>#si', $body, $matches );

			if ( array_filter( $matches ) ) {
				// "good"
				secupress_activate_submodule( 'discloses', 'generator' );
				$this->add_fix_message( 4 );
			}
		}

		// Style tag src.
		$style_url = home_url( '/fake.css?ver=' . $wp_version );

		/** This filter is documented in wp-includes/class.wp-styles.php */
		if ( apply_filters( 'style_loader_src', $style_url, 'secupress' ) === $style_url ) {
			// "good"
			secupress_activate_submodule( 'discloses', 'wp-version-css' );
			$this->add_fix_message( 5 );
		}

		// Script tag src.
		$script_url = home_url( '/fake.js?ver=' . $wp_version );

		/** This filter is documented in wp-includes/class.wp-scripts.php */
		if ( apply_filters( 'script_loader_src', $script_url, 'secupress' ) === $script_url ) {
			// "good"
			secupress_activate_submodule( 'discloses', 'wp-version-js' );
			$this->add_fix_message( 6 );
		}

		// Readme file. =====================================.
		$response = wp_remote_get( home_url( 'readme.html' ), $this->get_default_request_args() );

		if ( ! is_wp_error( $response ) ) {
			if ( 200 === wp_remote_retrieve_response_code( $response ) ) {
				$todo['readme'] = 1;
			}
		} else {
			// "warning"
			$this->add_fix_message( 101 );
		}

		if ( $todo ) {
			if ( $is_apache ) {
				$this->fix_apache( $todo );
			} elseif ( $is_iis7 ) {
				$this->fix_iis7( $todo );
			} elseif ( $is_nginx ) {
				$this->fix_nginx( $todo );
			}
		}

		// "good"
		$this->maybe_set_fix_status( 0 );

		return parent::fix();
	}


	/**
	 * Fix for Apache system.
	 *
	 * @since 1.0
	 *
	 * @param (array) $todo Tasks to do.
	 */
	protected function fix_apache( $todo ) {
		global $wp_settings_errors;
		$all_rules = array();

		// PHP version disclosure in header.
		if ( isset( $todo['php_version'] ) ) {
			secupress_activate_submodule( 'discloses', 'no-x-powered-by' );

			// Got error?
			$last_error = is_array( $wp_settings_errors ) && $wp_settings_errors ? end( $wp_settings_errors ) : false;

			if ( $last_error && 'general' === $last_error['setting'] && 'apache_manual_edit' === $last_error['code'] ) {
				$all_rules[] = static::get_rules_from_error( $last_error );
				array_pop( $wp_settings_errors );
			} else {
				// Succeed: now test our rule against php version disclosure works.
				$this->scan_php_disclosure(); // Fix message 1, 3 or 100 inside.
			}
		}

		// `readme.html` file.
		if ( isset( $todo['readme'] ) ) {
			secupress_activate_submodule( 'discloses', 'readmes' );

			// Got error?
			$last_error = is_array( $wp_settings_errors ) && $wp_settings_errors ? end( $wp_settings_errors ) : false;

			if ( $last_error && 'general' === $last_error['setting'] && 'apache_manual_edit' === $last_error['code'] ) {
				$all_rules[] = static::get_rules_from_error( $last_error );
				array_pop( $wp_settings_errors );
			} else {
				// "good"
				$this->add_fix_message( 2 );
			}
		}

		if ( $all_rules ) {
			$all_rules = implode( "\n", $all_rules );
			// "cantfix"
			$this->add_fix_message( 302, array( $all_rules ) );
		}
	}


	/**
	 * Fix for IIS7 system.
	 *
	 * @since 1.0
	 *
	 * @param (array) $todo Tasks to do.
	 */
	protected function fix_iis7( $todo ) {
		global $wp_settings_errors;

		// PHP version disclosure in header.
		if ( isset( $todo['php_version'] ) ) {
			secupress_activate_submodule( 'discloses', 'no-x-powered-by' );

			// Got error?
			$last_error = is_array( $wp_settings_errors ) && $wp_settings_errors ? end( $wp_settings_errors ) : false;

			if ( $last_error && 'general' === $last_error['setting'] && 'iis7_manual_edit' === $last_error['code'] ) {
				$rules = static::get_rules_from_error( $last_error );
				$path  = static::get_code_tag_from_error( $last_error, 'secupress-iis7-path' );
				// "cantfix"
				$this->add_fix_message( 303, array( $path, $rules ) );
				array_pop( $wp_settings_errors );
			} else {
				// Succeed: now test our rule against php version disclosure works.
				$this->scan_php_disclosure(); // Fix message 1, 3 or 100 inside.
			}
		}

		// `readme.html` file.
		if ( isset( $todo['readme'] ) ) {
			secupress_activate_submodule( 'discloses', 'readmes' );

			// Got error?
			$last_error = is_array( $wp_settings_errors ) && $wp_settings_errors ? end( $wp_settings_errors ) : false;

			if ( $last_error && 'general' === $last_error['setting'] && 'iis7_manual_edit' === $last_error['code'] ) {
				$rules = static::get_rules_from_error( $last_error );
				$path  = static::get_code_tag_from_error( $last_error, 'secupress-iis7-path' );
				// "cantfix"
				$this->add_fix_message( 303, array( $path, $rules ) );
				array_pop( $wp_settings_errors );
			} else {
				// "good"
				$this->add_fix_message( 2 );
			}
		}
	}


	/**
	 * Fix for nginx system.
	 *
	 * @since 1.0
	 *
	 * @param (array) $todo Tasks to do.
	 */
	protected function fix_nginx( $todo ) {
		global $wp_settings_errors;
		$all_rules = array();

		// PHP version disclosure in header.
		if ( isset( $todo['php_version'] ) ) {
			secupress_activate_submodule( 'discloses', 'no-x-powered-by' );

			// Got error?
			$last_error = is_array( $wp_settings_errors ) && $wp_settings_errors ? end( $wp_settings_errors ) : false;
			$rules      = '<code>Error</code>';

			if ( $last_error && 'general' === $last_error['setting'] && 'nginx_manual_edit' === $last_error['code'] ) {
				$rules = static::get_rules_from_error( $last_error );
				array_pop( $wp_settings_errors );
			}

			$all_rules['php_version'] = $rules;
		}

		// `readme.html` file.
		if ( isset( $todo['readme'] ) ) {
			secupress_activate_submodule( 'discloses', 'readmes' );

			// Got error?
			$last_error = is_array( $wp_settings_errors ) && $wp_settings_errors ? end( $wp_settings_errors ) : false;
			$rules      = '<code>Error</code>';

			if ( $last_error && 'general' === $last_error['setting'] && 'nginx_manual_edit' === $last_error['code'] ) {
				$rules = static::get_rules_from_error( $last_error );
				array_pop( $wp_settings_errors );
			}

			$all_rules['readme'] = $rules;
		}

		if ( $all_rules ) {
			if ( isset( $all_rules['php_version'], $all_rules['readme'] ) ) {
				$all_rules = implode( "\n", $all_rules );
				// "cantfix"
				$this->add_fix_message( 300, array( $all_rules ) );
			} elseif ( isset( $all_rules['php_version'] ) ) {
				// "cantfix"
				$this->add_fix_message( 304, array( $all_rules['php_version'] ) );
			} else {
				$all_rules = implode( "\n", $all_rules );
				// "cantfix"
				$this->add_fix_message( 305, array( $all_rules['readme'] ) );
			}
		}
	}


	/** Tools. ================================================================================== */

	/**
	 * Scan for php version disclosure in head.
	 *
	 * @since 1.0
	 */
	protected function scan_php_disclosure() {
		global $is_apache;

		$response_test = wp_remote_get( user_trailingslashit( home_url() ), $this->get_default_request_args() );

		if ( is_wp_error( $response_test ) || 200 !== wp_remote_retrieve_response_code( $response_test ) ) {
			// "warning"
			$this->add_fix_message( 100 );
			return;
		}

		$powered_by  = wp_remote_retrieve_header( $response_test, 'x-powered-by' );
		$php_version = phpversion();

		if ( false === strpos( $powered_by, $php_version ) ) {
			// Test is ok.
			// "good".
			$this->add_fix_message( 1 );
		} else {
			// Test failed, try another way.
			secupress_activate_submodule( 'discloses', 'php-version' );
			$file = $is_apache ? '.htaccess' : 'web.config';
			// "good"
			$this->add_fix_message( 3, array( "<code>$file</code>" ) );
		}
	}
}

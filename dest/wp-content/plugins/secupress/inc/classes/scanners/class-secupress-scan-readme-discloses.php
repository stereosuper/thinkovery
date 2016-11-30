<?php
defined( 'ABSPATH' ) or die( 'Cheatin&#8217; uh?' );

/**
 * `readme.txt` disclose scan class.
 *
 * @package SecuPress
 * @subpackage SecuPress_Scan
 * @since 1.0
 */
class SecuPress_Scan_Readme_Discloses extends SecuPress_Scan implements SecuPress_Scan_Interface {

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

		/** Translators: %s is a file name */
		$this->title = sprintf( __( 'Check if the %s files from your plugins and themes are protected.', 'secupress' ), '<code>readme.txt</code>' );
		$this->more  = __( 'When an attacker wants to hack into a WordPress site, (s)he will search for all available informations. The goal is to find something useful that will help him penetrate your site. Don\'t let them easily find any informations.', 'secupress' );

		if ( ! $is_apache && ! $is_nginx && ! $is_iis7 ) {
			$this->more_fix = static::get_messages( 301 );
			$this->fixable  = false;
			return;
		}

		if ( $is_apache ) {
			/** Translators: 1 and 2 are file names. */
			$this->more_fix = sprintf( __( 'Add rules in your %1$s file to prevent attackers reading sensitive information from your %2$s files.', 'secupress' ), '<code>.htaccess</code>', '<code>readme.txt</code>' );
		} elseif ( $is_iis7 ) {
			/** Translators: 1 and 2 are file names. */
			$this->more_fix = sprintf( __( 'Add rules in your %1$s file to prevent attackers reading sensitive information from your %2$s files.', 'secupress' ), '<code>web.config</code>', '<code>readme.txt</code>' );
		} else {
			/** Translators: 1 and 2 are file names. */
			$this->more_fix = sprintf( __( 'The %1$s file cannot be edited automatically, you will be given the rules to add into this file manually, to prevent attackers reading sensitive information from your %2$s files.', 'secupress' ), '<code>nginx.conf</code>', '<code>readme.txt</code>' );
		}
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
		global $is_apache;
		$config_file = $is_apache ? '.htaccess' : 'web.config';

		$messages = array(
			// "good"
			/** Translators: %s is a file name */
			0   => sprintf( __( 'The %s files are protected from revealing sensitive information.', 'secupress' ), '<code>readme.txt</code>' ),
			/** Translators: 1 and 2 are file names */
			1   => sprintf( __( 'The rules forbidding access to your %1$s files have been successfully added to your %2$s file.', 'secupress' ), '<code>readme.txt</code>', "<code>$config_file</code>" ),
			// "warning"
			/** Translators: %s is a file name */
			100 => sprintf( __( 'Unable to determine the status of the %s files that may reveal sensitive information.', 'secupress' ), '<code>readme.txt</code>' ),
			// "bad"
			/** Translators: %s is a file name */
			200 => sprintf( __( 'The %s and/or %s files should not be accessible to anyone because they are revealing sensitive information.', 'secupress' ), '<code>readme.txt/md/html</code>', '<code>changelog.txt/md/html</code>' ),
			// "cantfix"
			/** Translators: 1 and 2 are a file names, 3 is some code */
			300 => sprintf( __( 'Your server runs <strong>Nginx</strong>, the %1$s files cannot be protected automatically but you can do it yourself by adding the following code to your %2$s file: %3$s', 'secupress' ), '<code>readme.txt</code>', '<code>nginx.conf</code>', '%s' ),
			/** Translators: %s is a file name */
			301 => sprintf( __( 'Your server runs an unrecognized system. The %s files cannot be protected automatically.', 'secupress' ), '<code>readme.txt</code>' ),
			/** Translators: 1 is a file name, 2 is some code */
			302 => sprintf( __( 'Your %1$s file is not writable. Please add the following lines at the beginning of the file: %2$s', 'secupress' ), "<code>$config_file</code>", '%s' ),
			/** Translators: 1 is a file name, 2 is a folder path (kind of), 3 is some code */
			303 => sprintf( __( 'Your %1$s file is not writable. Please add the following lines inside the tags hierarchy %2$s (create it if does not exist): %3$s', 'secupress' ), "<code>$config_file</code>", '%1$s', '%2$s' ),
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
		$protected = $this->are_files_protected();

		if ( is_null( $protected ) ) {
			// "warning"
			$this->add_message( 100 );

		} elseif ( ! $protected ) {
			// "bad"
			$this->add_message( 200 );

			if ( ! $this->fixable ) {
				$this->add_pre_fix_message( 301 );
			}
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

		$protected = $this->are_files_protected();

		if ( is_null( $protected ) ) {
			// "warning"
			$this->add_fix_message( 100 );
			return parent::fix();
		}

		if ( $protected ) {
			// "good"
			$this->add_fix_message( 0 );
			return parent::fix();
		}

		if ( $is_apache ) {
			$this->fix_apache();
		} elseif ( $is_iis7 ) {
			$this->fix_iis7();
		} elseif ( $is_nginx ) {
			$this->fix_nginx();
		}

		// "good"
		$this->maybe_set_fix_status( 0 );

		return parent::fix();
	}


	/**
	 * Fix for Apache system.
	 *
	 * @since 1.0
	 */
	protected function fix_apache() {
		global $wp_settings_errors;

		secupress_activate_submodule( 'discloses', 'readmes' );

		// Got error?
		$last_error = is_array( $wp_settings_errors ) && $wp_settings_errors ? end( $wp_settings_errors ) : false;

		if ( $last_error && 'general' === $last_error['setting'] && 'apache_manual_edit' === $last_error['code'] ) {
			$rules = static::get_rules_from_error( $last_error );
			// "cantfix"
			$this->add_fix_message( 302, array( $rules ) );
			array_pop( $wp_settings_errors );
			return;
		}

		// "good"
		$this->add_fix_message( 1 );
	}


	/**
	 * Fix for IIS7 system.
	 *
	 * @since 1.0
	 */
	protected function fix_iis7() {
		global $wp_settings_errors;

		secupress_activate_submodule( 'discloses', 'readmes' );

		// Got error?
		$last_error = is_array( $wp_settings_errors ) && $wp_settings_errors ? end( $wp_settings_errors ) : false;

		if ( $last_error && 'general' === $last_error['setting'] && 'iis7_manual_edit' === $last_error['code'] ) {
			$rules = static::get_rules_from_error( $last_error );
			$path  = static::get_code_tag_from_error( $last_error, 'secupress-iis7-path' );
			// "cantfix"
			$this->add_fix_message( 303, array( $path, $rules ) );
			array_pop( $wp_settings_errors );
			return;
		}

		// "good"
		$this->add_fix_message( 1 );
	}


	/**
	 * Fix for nginx system.
	 *
	 * @since 1.0
	 */
	protected function fix_nginx() {
		global $wp_settings_errors;

		secupress_activate_submodule( 'discloses', 'readmes' );

		// Get the error.
		$last_error = is_array( $wp_settings_errors ) && $wp_settings_errors ? end( $wp_settings_errors ) : false;
		$rules      = '<code>Error</code>';

		if ( $last_error && 'general' === $last_error['setting'] && 'nginx_manual_edit' === $last_error['code'] ) {
			$rules = static::get_rules_from_error( $last_error );
			array_pop( $wp_settings_errors );
		}

		// "cantfix"
		$this->add_fix_message( 300, array( $rules ) );
	}


	/** Tools. ================================================================================== */

	/**
	 * Tells if the readme files are accessible.
	 *
	 * @since 1.0
	 *
	 * @return (bool)
	 */
	protected function are_files_protected() {
		// Get all readme/changelog files.
		$plugins = rtrim( secupress_get_plugins_path(), '\\/' );
		$themes  = rtrim( secupress_get_themes_path(), '\\/' );
		$pattern = '{' . $plugins . ',' . $themes . '}/*/{README,CHANGELOG,readme,changelog}.{TXT,MD,HTML,txt,md,html}';
		$files   = glob( $pattern, GLOB_BRACE );

		// No file? Good, nothing to protect.
		if ( ! $files ) {
			// "good".
			return true;
		}

		// Get the first file path, relative to the root of the site.
		$abspath = wp_normalize_path( ABSPATH );
		$file    = reset( $files );
		if ( isset( $files[1] ) && false !== strpos( $file, '/akismet/' ) ) {
			// Akismet protects its files.
			$file = $files[1];
		}
		$file    = wp_normalize_path( $file );
		$file    = ltrim( str_replace( $abspath, '', $file ), '/' );

		// Get file contents.
		$response = wp_remote_get( site_url( $file ), $this->get_default_request_args() );

		if ( is_wp_error( $response ) ) {
			// "warning".
			return null;
		} elseif ( 200 === wp_remote_retrieve_response_code( $response ) ) {
			// "bad".
			return false;
		}
		// "good".
		return true;
	}
}

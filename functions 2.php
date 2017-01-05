<?php

class ng2_theme {

	/**
	 * @var instance
	 *
	 */
	private static $instance;

	/**
	 * Returns the instance of this class.
	 *
	 * @access  public
	 * @return  ng2_theme
	 *
	 */
	public static function instance() {
		if ( ! isset( self::$instance ) ) {
			$class_name     = __CLASS__;
			self::$instance = new $class_name;
		}

		return self::$instance;
	}

	/**
	 * ng2_theme constructor.
	 *
	 */
	function __construct() {

		add_action( 'wp_enqueue_scripts', array( $this, 'ng2_scripts' ) );

	}

	/**
	 * Enqueue Scripts
	 *
	 */
	function ng2_scripts() {
		wp_enqueue_script( 'inline', get_template_directory_uri() . '/dist/inline.bundle.js', array( 'jquery' ), null, true );
		wp_enqueue_script( 'styles', get_template_directory_uri() . '/dist/styles.bundle.js', array( 'inline' ), null, true );
		wp_enqueue_script( 'main', get_template_directory_uri() . '/dist/main.bundle.js', array( 'styles' ), null, true );

		$local_object = array(
			'api_url'            => rest_get_url_prefix() . '/wp/v2/',
			'template_directory' => get_template_directory_uri() . '/',
			'nonce'              => wp_create_nonce( 'wp_rest' ),
			'is_admin'           => current_user_can( 'administrator' ),
			'site_title' => get_bloginfo( 'name' ),
		);

		wp_localize_script( 'inline', 'wp_info', $local_object );

	}

}

function ng2_theme_init() {
	return ng2_theme::instance();
}

ng2_theme_init();

?>

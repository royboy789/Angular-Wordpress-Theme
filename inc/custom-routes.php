<?php
global $myplugin_api_mytype;

class angular_theme_routes {

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
	
	function __construct() {
		
		global $myplugin_api_mytype;
		add_filter( 'rest_api_init', array( $this, 'add_comments' ), 10, 3);
		
	}
	
	function add_comments() {
		
		if( function_exists( 'register_rest_field' ) ) {
			register_rest_field( 'post', 'comments', array(
				'get_callback' 	  => array( $this, 'get_comments' ),
				'update_callback' => null,
				'schema' 		  => null,
			) );
		}
				
	}
	
	function get_comments( $object, $field_name, $request ) {
		
		return get_comments( array( 'post_id' => $object[ 'id' ] ) );
		
	}
}
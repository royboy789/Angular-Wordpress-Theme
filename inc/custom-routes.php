<?php
global $myplugin_api_mytype;

class angular_theme_routes {
	
	function __init() {
		
		global $myplugin_api_mytype;
		add_filter( 'rest_api_init', array( $this, 'register_routes' ) );
		add_filter( 'rest_api_init', array( $this, 'add_comments' ), 10, 3);
		
	}
	
	function register_routes( $routes ) {
		
		register_rest_route( 'wp/v2', 'post_by_slug', array(
			'methods' => 'GET',
			'callback' => array( $this, 'get_post_by_slug' ),
			'args' => array(
				'slug' => array (
					'required' => false
				)
			)
		) );
		
	}
	
	function get_post_by_slug( WP_REST_Request $request ) {
		
		$slug = $request['slug'];
		$return['slug'] = $slug;
		
		$return['post'] = get_page_by_path( $slug, ARRAY_A, 'post' );
		$return['post']['comments'] = get_comments( array( 'ID' => $return['post']['ID'] ) );
		
		$response = new WP_REST_Response( $return );
		return $response;
			
	}
	
	function add_comments() {
		
		register_api_field( 'post', 'comments', array(
			'get_callback' 	  => array( $this, 'get_comments' ),
			'update_callback' => null,
			'schema' 		  => null,
		) );
				
	}
	
	function get_comments( $object, $field_name, $request ) {
		
		return get_comments( array( 'ID' => $object[ 'id' ] ) );
		
	}
}
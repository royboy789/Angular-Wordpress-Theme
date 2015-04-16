<?php
global $myplugin_api_mytype;

class angular_theme_routes {
	
	function __construct() {	
		$this->init();
	}
	
	function init() {
		global $myplugin_api_mytype;
		add_filter( 'json_endpoints', array( $this, 'register_routes' ) );
	}
	
	function register_routes( $routes ) {
		$routes['/post_by_slug'] = array(
			array( array( $this, 'get_post_by_slug'), WP_JSON_Server::READABLE ),
		);

		// Add more custom routes here

		return $routes;
	}
	
	function get_post_by_slug() {
		
		$slug = $_GET['slug'];
		$return['slug'] = $slug;
		
		$return['post'] = get_page_by_path( $slug, ARRAY_A, 'post' );
		
		$response = new WP_JSON_Response();
		$response->set_data( $return );		
		return $response;
			
	}
}

new angular_theme_routes();
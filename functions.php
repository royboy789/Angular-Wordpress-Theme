<?php

//require 'inc/custom-routes.php';
require 'inc/custom-routes.php';

require 'inc/angular-enqueue.php';


class angularjs_wp_theme {
	
	function init() {
		
		add_action( 'init', array( $this, 'register_my_menus' ) );
		add_action( 'init', array( $this, 'register_my_sidebar' ) );
		add_action( 'after_setup_theme', array( $this, 'add_awesome_theme_support' ) );
		add_action( 'admin_init', array( $this, 'apiCheck' ) );
		
		$angularScripts = new angular_enqueue();
		$angularScripts->init();
		
		$ang_routes = new angular_theme_routes();
		$ang_routes->__init();
		
	}
	
	function apiCheck(){
		
		if ( !class_exists( 'WP_REST_Response' ) ) {
		  add_action( 'admin_notices', array( $this, 'apiError' ) );
		} 
		
	}
	function apiError(){
		
		echo '<div class="error"><p><strong>JSON REST API</strong> must be installed and activated for this theme to work properly</p></div>';
		
	}

	/* THEME SUPPORT */
	function add_awesome_theme_support(){
		
		add_theme_support( 'post-thumbnails' );
		add_post_type_support( 'page', 'excerpt' );
		
	}

	// REGISTER MENUS
	function register_my_menus() {
		
	  register_nav_menus(
	    array(
	      'header-menu' => __( 'Header Menu' ),
	      'footer-menu' => __( 'Footer Menu' )
	    )
	  );
	  
	}

	//REGISTER SIDEBAR
	function register_my_sidebar() {
		
		register_sidebar(array(
			'name' 			=> 'Right Side',
			'id' 			=> 'right-sidebar',
			'before_widget' => '<section>',
			'after_widget' 	=> '</section>',
			'before_title' 	=> '<h4>',
			'after_title' 	=> '</h4>'
		));
		
	}

}

$angularJStheme = new angularjs_wp_theme();
$angularJStheme->init();

?>
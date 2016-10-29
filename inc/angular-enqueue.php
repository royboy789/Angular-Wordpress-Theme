<?php

class angular_enqueue {
	
	function init() {
		
		add_action( 'wp_enqueue_scripts', array( $this, 'angular_scripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'angular_styles' ) );
		add_action( 'wp_head', array( $this, 'system_include' ) );
		
	}
	
	function angular_scripts() {
		
		wp_enqueue_script( 'angular_core', get_template_directory_uri().'/build/js/angular-scripts.min.js', array( 'jquery' ), null, false );

		wp_localize_script( 'angular_theme', 'ajaxInfo',
			array(
				
				'api_url'			 => rest_get_url_prefix() . '/wp/v2/',
				'template_directory' => get_template_directory_uri() . '/',
				'nonce'				 => wp_create_nonce( 'wp_rest' ),
				'is_admin'			 => current_user_can('administrator')
				
			)
		);
		
	}
	
	function angular_styles() {
		
		wp_enqueue_style( 'angularStyles', get_template_directory_uri().'/build/css/styles.css', array(), null, 'all' );
		
	}

	function system_include() {
		echo "<script>
			System.config({
	        packages: {
	          js: {
	            format: 'register',
	            defaultExtension: 'js'
	          }
	        }
	      });
	      System.import('" . get_template_directory_uri() . "/build/js/boot.js').then(null, console.error.bind(console));
      </script>
      ";
	}
	
}	
	
	
?>
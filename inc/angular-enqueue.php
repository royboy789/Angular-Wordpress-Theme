<?php

class angular_enqueue {
	
	function init() {
		
		add_action( 'wp_enqueue_scripts', array( $this, 'angular_scripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'angular_styles' ) );
		add_action( 'wp_head', array( $this, 'system_include' ) );
		
	}
	
	function angular_scripts() {

		wp_enqueue_script( 'angular_theme', get_template_directory_uri().'/build/js/angular-scripts.min.js', array( 'jquery' ), null, false );
//		wp_enqueue_script( 'es6_shim', get_template_directory_uri().'/build/js/angular2/es6-shim.min.js', array( 'jquery' ), null, false );
//		wp_enqueue_script( 'system_polyfill', get_template_directory_uri().'/build/js/angular2/system-polyfills.js', array( 'es6_shim' ), null, false );
//		wp_enqueue_script( 'angular_polyfills', get_template_directory_uri().'/build/js/angular2/angular2-polyfills.js', array( 'system_polyfill' ), null, false );
//		wp_enqueue_script( 'system_src', get_template_directory_uri().'/build/js/angular2/system.src.js', array( 'angular_polyfills' ), null, false );
//		wp_enqueue_script( 'rx', get_template_directory_uri().'/build/js/angular2/RX.js', array( 'sytem_src' ), null, false );
//		wp_enqueue_script( 'angular_2', get_template_directory_uri().'/build/js/angular2/angular2.dev.js', array( 'rx' ), null, false );

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
			var packages = {
			  'app': { main: 'boot.js',  defaultExtension: 'js' },
			  'rxjs': { defaultExtension: 'js' },
			  'angular2-in-memory-web-api': { defaultExtension: 'js' },
			};
			
			var packageNames = [
			  '@angular/common',
			  '@angular/compiler',
			  '@angular/core',
			  '@angular/http',
			  '@angular/platform-browser',
			  '@angular/platform-browser-dynamic',
			  '@angular/router',
			  '@angular/router-deprecated',
			  '@angular/testing',
			  '@angular/upgrade',
			];
			
			packageNames.forEach(function(pkgName) {
			  packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
			});

			var config = {
			  paths: {
			  	'*': ajaxInfo.template_directory + 'build/js/angular/common/',
			  	 'app': ajaxInfo.template_directory + 'build/js/'
			  },
			  packages: packages,
			}
			
			System.config(config);
	      System.import('" . get_template_directory_uri() . "/build/js/boot.js').then(
		        function(){ 
		            console.log('success');
		        }, function( res ) {
		            console.log( 'fail', res );
		        }
	        );
      </script>
      ";
	}
	
}	
	
	
?>
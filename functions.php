<?php

require 'inc/custom-routes.php';

function apiCheck(){
	if ( !is_plugin_active( 'json-rest-api/plugin.php' ) ) {
	  add_action( 'admin_notices', 'apiError' );
	} 
}
function apiError(){
	echo '<div class="error"><p><strong>JSON REST API</strong> must be installed and activated for this theme to work properly</p></div>';
}

add_action('admin_init', 'apiCheck');

/* THEME SUPPORT */
function add_awesome_theme_support(){
	add_theme_support( 'post-thumbnails' );
	add_post_type_support( 'page', 'excerpt' );
}
add_action( 'after_setup_theme', 'add_awesome_theme_support' );

// Register Menu
function register_my_menus() {
  register_nav_menus(
    array(
      'header-menu' => __( 'Header Menu' ),
      'footer-menu' => __( 'Footer Menu' )
    )
  );
}
add_action( 'init', 'register_my_menus' );

//REGISTER SIDEBAR
register_sidebar(array(
	'name' 			=> 'Right Side',
	'id' 			=> 'right-sidebar',
	'before_widget' => '<section>',
	'after_widget' 	=> '</section>',
	'before_title' 	=> '<h4>',
	'after_title' 	=> '</h4>'
));

function enqueue_less_styles($tag, $handle) {
    global $wp_styles;
    $match_pattern = '/\.less$/U';
    if ( preg_match( $match_pattern, $wp_styles->registered[$handle]->src ) ) {
        $handle = $wp_styles->registered[$handle]->handle;
        $media = $wp_styles->registered[$handle]->args;
        $href = $wp_styles->registered[$handle]->src . '?ver=' . $wp_styles->registered[$handle]->ver;
        $rel = isset($wp_styles->registered[$handle]->extra['alt']) && $wp_styles->registered[$handle]->extra['alt'] ? 'alternate stylesheet' : 'stylesheet';
        $title = isset($wp_styles->registered[$handle]->extra['title']) ? "title='" . esc_attr( $wp_styles->registered[$handle]->extra['title'] ) . "'" : '';

        $tag = "<link rel='stylesheet' id='$handle' $title href='$href' type='text/less' media='$media' />";
    }
    return $tag;
}
add_filter( 'style_loader_tag', 'enqueue_less_styles', 5, 2);

function MyScripts() {

$query = new WP_Query();
$JSON = $query->get_posts();

//MODERNIZR
wp_enqueue_script('modernizr', get_bloginfo('template_directory').'/js/modernizr-1.5.min.js', array('jquery'), null, false);
wp_enqueue_script('modernizr');

//LESS CSS JS
wp_enqueue_script('less', get_bloginfo('template_directory').'/js/less-1.3.1.min.js', array('jquery'), null, false);
wp_enqueue_script('less');

//TINYMCE
wp_enqueue_script('tinymce', get_bloginfo('template_directory').'/js/tinymce.min.js', array('jquery'), null, false);
wp_enqueue_script('tinymce-second', get_bloginfo('template_directory').'/js/jquery.tinymce.min.js', array('tinymce'), null, false);

//ANGULAR
wp_enqueue_script('angular-core', '//ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular.js', array('jquery'), null, false);
wp_enqueue_script('angular-route', '//ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular-route.min.js', array('angular-core'), null, false);
wp_enqueue_script('angular-resource', '//ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular-resource.min.js', array('angular-route'), null, false);

wp_enqueue_script('angular-app', get_bloginfo('template_directory').'/js/angular-app.js', array('angular-core'), null, false);

//ANGULAR SMART NAV
wp_enqueue_script('angular-route', get_bloginfo('template_directory').'/js/angular-route.js', array('angular-core'), null, false);

//ANGULAR UI
wp_enqueue_script('angular-ie', get_bloginfo('template_directory').'/js/angular-ui-ieshiv.min.js', array('angular-core'), null, false);
wp_enqueue_script('angular-tinymce', get_bloginfo('template_directory').'/js/ui-tinymce.js', array('angular-core'), null, false);
wp_enqueue_style('angular-ui-css', get_bloginfo('template_directory').'/js/angular-ui.css', false, '1.0', 'all');
wp_enqueue_script( 'angular-bs-ui', get_bloginfo('template_directory').'/js/ui-bootstrap-tpls-0.10.0.min.js', array('angular-core'), null, false);


//BOOTSTRAP
wp_enqueue_style('bootstrap-core', get_bloginfo('template_directory').'/css/bootstrap.min.css', false, '1.0', 'all');
wp_enqueue_script('boostrap-js', get_bloginfo('template_directory').'/js/bootstrap.min.js', array('jquery'), null, false);

//LOCALIZE
wp_localize_script( 'angular-core', 'MyAjax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ), 'resturl' => get_bloginfo('wpurl').'/wp-json' ) );
wp_localize_script( 'angular-core', 'Directory', array( 'url' => get_bloginfo('template_directory'), 'site' => get_bloginfo('wpurl')) );
wp_localize_script( 'angular-core', 'wpApiOptions', array( 'base' => json_url(), 'nonce' => wp_create_nonce( 'wp_json' ) ) );



// LESS CSS
wp_enqueue_style('less-css', get_bloginfo('template_directory').'/more-style.less', false, '1.0', 'all');
wp_enqueue_style('less-css');
wp_enqueue_style('less-css-css', get_bloginfo('template_directory').'/more-style.css', false, '1.0', 'all');
// INCLUDE WHEN READY: wp_enqueue_style('less-css-css');

//TINY MCE
wp_enqueue_script('tiny_mce');


}

add_action('wp_enqueue_scripts', 'MyScripts');


//NEW ITEM
add_action("wp_ajax_new_item", "TestFunc");
add_action("wp_ajax_nopriv_new_item", "TestFunc");

function TestFunc(){	
		$json = str_replace(array('[', ']', '\\'), '', $_GET['data']);
		$data = json_decode($json, true);
		$post_id = $data['ID'];
		if($post_id){
			$my_post = array();
			$my_post['ID'] = $post_id;
			$my_post['post_content'] = $data['post_content'];
			$my_post['post_title'] = $data['post_title'];
			wp_update_post( $my_post );
		} else {
			$NewPost = array(
				'post_content' => $data['post_content'],
				'post_title' => $data['post_title'],
				'post_author'   => 1,
				'post_status' => 'publish',
				'post_type' => 'post'
			);
			
			wp_insert_post($NewPost);
		}
		echo 'SUCCESS!';
		die();
}


//DELETE ITEM
add_action("wp_ajax_delete_item", "DeletePost");


function DeletePost(){	
		$json = str_replace(array('[', ']', '\\'), '', $_GET['data']);
		$data = json_decode($json, true);
		$post_id = $data;
		wp_delete_post($post_id);
		echo 'SUCCESS!';
		die();
}

//GET POST ITEM
add_action("wp_ajax_get_post_data", "GetPostContent");
add_action("wp_ajax_nopriv_get_post_data", "GetPostContent");

function GetPostContent(){
		$json = str_replace(array('[', ']', '\\'), '', $_GET['id']);
		$data = json_decode($json, true);
		$post_id = $data['id'];
		$postData = get_post($post_id, ARRAY_A);
		$content = $postData['post_content'];
		$postData['post_content'] = apply_filters('the_content', $content);
		echo json_encode($postData);
		die();
}


//GET POSTS
add_action("wp_ajax_get_posts", "GetPosts");
add_action("wp_ajax_nopriv_get_posts", "GetPosts");

function GetPosts(){
	$loop = new WP_Query();
	$postData = $loop->get_posts();
	echo json_encode($postData);
	die();
}

//GET NAV
add_action("wp_ajax_get_header_nav", "GetNav");
add_action("wp_ajax_nopriv_get_header_nav", "GetNav");

function GetNav(){
	$NavData = array();
	$menu_items = wp_get_nav_menu_items('Main Nav');
	foreach( $menu_items as $menu_item){
		//$NavData['title'] = $menu_item->title;
		//$NavData['id'] = url_to_postid($menu_item->ID);
		$NavData[] = array('id' => url_to_postid($menu_item->url), 'title' => $menu_item->title, 'type' => $menu_item->type_label, 'url' => $menu_item->url); 
	}
	//echo print_r($NavData);
	echo json_encode($NavData);
	die();
}

//GET SIDEBAR DATA
add_action("wp_ajax_get_sidebar_data", "GetSidebar");
add_action("wp_ajax_nopriv_get_sidebar_data", "GetSidebar");

function GetSidebar(){
	die();
}


// USER ONLINE CHECK
add_action('wp_ajax_user_check', 'UserCheck');
add_action('wp_ajax_nopriv_user_check', 'UserCheck');
function UserCheck(){
	if(is_user_logged_in()){
		echo 'true';
	}
die();
}

// GET COMMENT DATA
add_action('wp_ajax_get_post_comments', 'PostComments');
add_action('wp_ajax_nopriv_get_post_comments', 'PostComments');
function PostComments(){
	$json = str_replace(array('[', ']', '\\'), '', $_GET['id']);
	$data = json_decode($json, true);
	$post_id = $data['id'];
	$postComments = get_comments('post_id='.$post_id);
	echo json_encode($postComments);
	die();
}

// POST COMMENT
add_action('wp_ajax_add_comment', 'AddComments');
add_action('wp_ajax_nopriv_add_comment', 'AddComments');

function AddComments(){
	$json = str_replace(array('[', ']', '\\'), '', $_GET['id']);
	$data = json_decode($json, true);
	//COMMENT DATA
	$postID = $data['comment_post_ID'];
	$time = current_time('mysql');
	
	$commentData = array(
		'comment_post_ID' => $postID,
		'comment_author_email' => $data['comment_author_email'],
		'comment_author' => $data['comment_author'],
		'comment_content' => $data['comment_content'],
		'comment_approved' => 1,
		'comment_date' => $time
	);
	//wp_insert_comment($commentData);
	echo 'SUCCESSFUL COMMENT!';
	die();
}

?>
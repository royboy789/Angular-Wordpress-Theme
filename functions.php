<?php
/* THEME SUPPORT */
function add_awesome_theme_support(){
	add_theme_support( 'post-thumbnails' );
	add_post_type_support( 'page', 'excerpt' );
}
add_action( 'after_setup_theme', 'add_awesome_theme_support' );


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
wp_register_script('modernizr', get_bloginfo('template_directory').'/js/modernizr-1.5.min.js', array('jquery'), null, false);
wp_enqueue_script('modernizr');

//LESS CSS JS
wp_register_script('less', get_bloginfo('template_directory').'/js/less-1.3.1.min.js', array('jquery'), null, false);
wp_enqueue_script('less');

//ANGULAR
wp_register_script('angular-core', 'http://ajax.googleapis.com/ajax/libs/angularjs/1.0.5/angular.min.js', array('jquery'), null, false);
wp_register_script('angular-app', get_bloginfo('template_directory').'/js/angular-app.js', array('angular-core'), null, false);

wp_enqueue_script('angular-core');
wp_enqueue_script('angular-app');

//BOOTSTRAP
wp_register_style('bootstrap-core', get_bloginfo('template_directory').'/css/bootstrap.min.css', false, '1.0', 'all');
wp_register_style('bootstrap-responsive', get_bloginfo('template_directory').'/css/bootstrap-responsive.min.css', false, '1.0', 'all');
wp_register_script('boostrap-js', get_bloginfo('template_directory').'/js/bootstrap.min.js', array('jquery'), null, false);

wp_enqueue_style('bootstrap-core');
wp_enqueue_style('bootstrap-responsive');
wp_enqueue_script('boostrap-js');

//LOCALIZE
wp_localize_script( 'angular-core', 'MyAjax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );
wp_localize_script( 'angular-core', 'PostData', array( 'data' => $JSON) );
wp_localize_script( 'angular-core', 'Directory', array( 'url' => get_bloginfo('template_directory')) );

// LESS CSS
wp_register_style('less-css', get_bloginfo('template_directory').'/more-style.less', false, '1.0', 'all');
wp_enqueue_style('less-css');
wp_register_style('less-css-css', get_bloginfo('template_directory').'/more-style.css', false, '1.0', 'all');
// INCLUDE WHEN READY: wp_enqueue_style('less-css-css');

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
add_action("wp_ajax_nopriv_delete_item", "DeletePost");

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
		echo json_encode($postData, JSON_FORCE_OBJECT);
		die();
}
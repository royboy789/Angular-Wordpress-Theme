<?php 
$parse_uri = explode('wp-content', $_SERVER['SCRIPT_FILENAME']);
$wp_load = $parse_uri[0].'wp-load.php';
require_once($wp_load);

$post_id = $_GET['id'];
$block = get_post($post_id, ARRAY_A);
if($_GET['title'] == true){
	echo '<h2>'.$block['post_title'].'</h2>';
}
$content = apply_filters('the_content', $block['post_content']);
echo $content;
?>
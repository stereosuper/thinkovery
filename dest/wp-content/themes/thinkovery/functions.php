<?php

define( 'THINK_VERSION', 1.0 );


/*-----------------------------------------------------------------------------------*/
/* General
/*-----------------------------------------------------------------------------------*/
// Plugins updates
add_filter( 'auto_update_plugin', '__return_true' );

// Theme support
add_theme_support( 'html5', array('comment-list', 'comment-form', 'search-form', 'gallery', 'caption', 'widgets') );
add_theme_support( 'post-thumbnails' );
add_theme_support( 'post-formats', array( 'link' ) );
add_theme_support('title-tag');

// Admin bar
show_admin_bar(false);

// Disable Tags
function think_unregister_tags(){
    unregister_taxonomy_for_object_type('post_tag', 'post');
}
add_action( 'init', 'think_unregister_tags' );


/*-----------------------------------------------------------------------------------*/
/* Clean WordPress head and remove some stuff for security
/*-----------------------------------------------------------------------------------*/
remove_action( 'wp_head', 'wp_generator' );
remove_action( 'wp_head', 'wp_shortlink_wp_head' );
remove_action( 'wp_head', 'rsd_link' );
remove_action( 'wp_head', 'wlwmanifest_link' );
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
add_filter( 'emoji_svg_url', '__return_false' );

// remove api rest links
remove_action( 'wp_head', 'rest_output_link_wp_head' );
remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );

// remove comment author class
function remove_comment_author_class( $classes ){
	foreach( $classes as $key => $class ){
		if(strstr($class, "comment-author-"))
			unset( $classes[$key] );
	}
	return $classes;
}
add_filter( 'comment_class' , 'remove_comment_author_class' );

// remove login errors
add_filter( 'login_errors', create_function('$a', "return null;") );


/*-----------------------------------------------------------------------------------*/
/* Admin
/*-----------------------------------------------------------------------------------*/
// Remove some useless admin stuff
function think_remove_submenus() {
  $page = remove_submenu_page( 'themes.php', 'themes.php' );
}
add_action( 'admin_menu', 'think_remove_submenus', 999 );
function think_remove_top_menus( $wp_admin_bar ){
    $wp_admin_bar->remove_node( 'wp-logo' );
}
add_action( 'admin_bar_menu', 'think_remove_top_menus', 999 );

// Custom posts in the dashboard
function think_right_now_custom_post() {
    $post_types = get_post_types(array( '_builtin' => false ) , 'objects' , 'and');
    foreach($post_types as $post_type){
        $cpt_name = $post_type->name;
        if($cpt_name != 'acf-field-group' && $cpt_name != 'acf-field' && $cpt_name != 'secupress_log_err404' && $cpt_name != 'secupress_log_action'){
            $num_posts = wp_count_posts($post_type->name);
            $num = number_format_i18n($num_posts->publish);
            $text = _n($post_type->labels->name, $post_type->labels->name , intval($num_posts->publish));
            echo '<li class="'. $cpt_name .'-count"><tr><a class="'.$cpt_name.'" href="edit.php?post_type='.$cpt_name.'"><td></td>' . $num . ' <td>' . $text . '</td></a></tr></li>';
        }
    }
}
add_action( 'dashboard_glance_items', 'think_right_now_custom_post' );

// Customize a bit the wysiwyg editor
function think_mce_before_init( $styles ){
    // Remove h1 and code
    $styles['block_formats'] = 'Paragraph=p;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6';
    // Let only the colors you want
    $styles['textcolor_map'] = '[' . "'000000', 'Noir', '565656', 'Texte', 'b5006a', 'Violet'" . ']';
    return $styles;
}
add_filter( 'tiny_mce_before_init', 'think_mce_before_init' );

// Add Options Page
if(function_exists('acf_add_options_page')){
    $optionsMainPage = acf_add_options_page(array(
        'position'   => 2,
        'page_title' => 'Theme General Options',
        'menu_title' => 'Theme Options',
        'redirect'   => false
    ));

    acf_add_options_sub_page(array(
        'page_title'    => 'Footer Settings',
        'menu_title'    => 'Footer',
        'parent_slug'   => $optionsMainPage['menu_slug'],
    ));

    acf_add_options_sub_page(array(
        'page_title'    => 'Déclinaisons',
        'menu_title'    => 'Déclinaisons',
        'parent_slug'   => $optionsMainPage['menu_slug'],
    ));
}


/*-----------------------------------------------------------------------------------*/
/* Images
/*-----------------------------------------------------------------------------------*/
// Enlever le lien par défaut autour des images
function think_imagelink_setup(){
	$image_set = get_option( 'image_default_link_type' );
    if($image_set !== 'none')
        update_option('image_default_link_type', 'none');
}
add_action( 'admin_init', 'think_imagelink_setup' );

// Enlever les <p> autour des images
function think_around_images($content){
   $content = preg_replace('/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/iU', '\1\2\3', $content);
   return $content;
}
add_filter( 'the_content', 'think_around_images' );

// Put the align classes on the div class'post-img'
function image_tag($html, $id, $alt, $title, $align){
    $html = '<div class="post-img align' . $align . '">' . $html . '</div>';
    return $html;
}
add_filter( 'get_image_tag', 'image_tag', 0, 5 );

// Remove the classes on images
add_filter( 'get_image_tag_class', '__return_empty_string' );

// Allow svg in media library
function think_mime_types($mimes){
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter( 'upload_mimes', 'think_mime_types' );


/*-----------------------------------------------------------------------------------*/
/* Menus
/*-----------------------------------------------------------------------------------*/
register_nav_menus(
	array(
		'primary' => 'Primary Menu',
        'secondary' => 'Secondary Menu'
	)
);

// Cleanup WP Menu html
function think_css_attributes_filter($var){
    return is_array($var) ? array_intersect($var, array('current-menu-item', 'current_page_parent', 'link-contact', 'hide-mb')) : '';
}
add_filter( 'nav_menu_css_class', 'think_css_attributes_filter' );


/*-----------------------------------------------------------------------------------*/
/* Sidebar & Widgets
/*-----------------------------------------------------------------------------------*/
function think_register_sidebars(){
	register_sidebar(array(
		'id' => 'sidebar',
		'name' => 'Sidebar',
		'description' => 'Take it on the side...',
		'before_widget' => '',
		'after_widget' => '',
		'before_title' => '',
		'after_title' => '',
		'empty_title'=> ''
	));
}
add_action( 'widgets_init', 'think_register_sidebars' );

// Deregister default widgets
function think_unregister_default_widgets(){
    unregister_widget('WP_Widget_Pages');
    unregister_widget('WP_Widget_Calendar');
    unregister_widget('WP_Widget_Archives');
    unregister_widget('WP_Widget_Links');
    unregister_widget('WP_Widget_Meta');
    unregister_widget('WP_Widget_Search');
    unregister_widget('WP_Widget_Text');
    unregister_widget('WP_Widget_Categories');
    unregister_widget('WP_Widget_Recent_Posts');
    unregister_widget('WP_Widget_Recent_Comments');
    unregister_widget('WP_Widget_RSS');
    unregister_widget('WP_Widget_Tag_Cloud');
    unregister_widget('WP_Nav_Menu_Widget');
}
add_action( 'widgets_init', 'think_unregister_default_widgets' );


/*-----------------------------------------------------------------------------------*/
/* Blog
/*-----------------------------------------------------------------------------------*/
// Only posts on search
function think_search_filter($query){
    if($query->is_search){
        $query->set('post_type', 'post');
    }
    return $query;
}
add_filter( 'pre_get_posts', 'think_search_filter' );

// Comments form error
function think_die_handler($message, $title='', $args=array()){
    if(empty($_POST['errorcomment'])){
        $_POST['errorcomment'] = $message;
    }

    if(!session_id()){
        session_start();
    }

    $_SESSION = $_POST;
    session_write_close();

    $url = strtok(wp_get_referer(), '?');
    header('Location: ' . $url . '?error=true#commentform');
    die();
}
function get_think_die_handler(){
    return 'think_die_handler';
}
add_filter('wp_die_handler', 'get_think_die_handler');


/*-----------------------------------------------------------------------------------*/
/* Enqueue Styles and Scripts
/*-----------------------------------------------------------------------------------*/
function think_scripts(){
    // header
	wp_enqueue_style( 'think-style', get_template_directory_uri() . '/css/main.css', array(), THINK_VERSION );

	// remove default
    wp_deregister_script( 'wp-embed' );
	wp_deregister_script( 'jquery' );

    // footer
	wp_enqueue_script( 'think-scripts', get_template_directory_uri() . '/js/main.js', array(), null, true );
}
add_action( 'wp_enqueue_scripts', 'think_scripts' );

?>

<?php

define( 'THINK_VERSION', '2.2.6' );

require_once(WPMU_PLUGIN_DIR . '/class-tgm-plugin-activation.php');


/*-----------------------------------------------------------------------------------*/
/* General
/*-----------------------------------------------------------------------------------*/
// Plugins updates
add_filter( 'auto_update_plugin', '__return_true' );

// Theme support
add_theme_support( 'html5', array(
    'comment-list',
    'comment-form',
    'search-form',
    'gallery',
    'caption',
    'widgets'
) );
add_theme_support( 'post-thumbnails' );
add_theme_support( 'post-formats', array( 'link' ) );
add_theme_support( 'title-tag' );

// Admin bar
show_admin_bar(false);


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
function think_remove_comment_author_class( $classes ){
	foreach( $classes as $key => $class ){
		if(strstr($class, 'comment-author-')) unset( $classes[$key] );
	}
	return $classes;
}
add_filter( 'comment_class' , 'think_remove_comment_author_class' );

// remove login errors
function think_login_errors(){
    return 'Something is wrong!';
}
add_filter( 'login_errors', 'think_login_errors' );


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

// Enlever le lien par défaut autour des images
function think_imagelink_setup(){
	if(get_option( 'image_default_link_type' ) !== 'none') update_option('image_default_link_type', 'none');
}
add_action( 'admin_init', 'think_imagelink_setup' );

// Add wrapper around iframe
function think_iframe_add_wrapper( $return, $data, $url ){
    return "<div class='wrapper-video'>{$return}</div>";
}
add_filter( 'oembed_dataparse', 'think_iframe_add_wrapper', 10, 3 );

// Enlever les <p> autour des images
function think_remove_p_around_images($content){
   return preg_replace('/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/iU', '\1\2\3', $content);
}
add_filter( 'the_content', 'think_remove_p_around_images' );

// Allow svg in media library
function think_mime_types($mimes){
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter( 'upload_mimes', 'think_mime_types' );

// Custom posts in the dashboard
function think_right_now_custom_post() {
    $post_types = get_post_types(array( '_builtin' => false ) , 'objects' , 'and');
    foreach($post_types as $post_type){
        $cpt_name = $post_type->name;
        if($cpt_name !== 'acf-field-group' && $cpt_name !== 'acf-field'){
            $num_posts = wp_count_posts($post_type->name);
            $num = number_format_i18n($num_posts->publish);
            $text = _n($post_type->labels->name, $post_type->labels->name , intval($num_posts->publish));
            echo '<li class="'. $cpt_name .'-count"><tr><a class="'.$cpt_name.'" href="edit.php?post_type='.$cpt_name.'"><td></td>' . $num . ' <td>' . $text . '</td></a></tr></li>';
        }
    }
}
add_action( 'dashboard_glance_items', 'think_right_now_custom_post' );

// Add new styles to wysiwyg
function think_button( $buttons ){
    array_unshift( $buttons, 'styleselect' );
    return $buttons;
}
add_filter( 'mce_buttons_2', 'think_button' );
function think_init_editor_styles(){
    add_editor_style();
}
add_action( 'after_setup_theme', 'think_init_editor_styles' );

// Customize a bit the wysiwyg editor
function think_mce_before_init( $styles ){
    $style_formats = array(
        array(
            'title' => 'Button',
            'selector' => 'a',
            'classes' => 'btn'
        )
    );
    $styles['style_formats'] = json_encode( $style_formats );
    // Remove h1 and code
    $styles['block_formats'] = 'Paragraph=p;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6';
    // Let only the colors you want
    $styles['textcolor_map'] = '[' . "'000000', 'Noir', '565656', 'Texte'" . ']';
    return $styles;
}
add_filter( 'tiny_mce_before_init', 'think_mce_before_init' );

// Option page
if(function_exists('acf_add_options_page')){
    acf_add_options_page(array(
        'position'   => 2,
        'page_title' => 'Theme Options',
        'menu_title' => 'Theme Options',
        'redirect'   => false
    ));
}

function think_mod_newsletter( $atts, $content = '' ) {
    $news = get_field('newsletter', 'options');

    $attributes = shortcode_atts( array(
        'id' => ''
    ), $atts, 'mod_newsletter' );

    $mod_newsletter = "<div class='newsletter newsletter-post' id='newsletter-post'>
        <p class='newsletter-title'>" . $news['newsletterTitle'] . "</p>
        <p>" . $news['newsletterSubtitle'] . "</p>" . do_shortcode('[mc4wp_form id="'. $attributes['id'] .'" element_id="newsletter-post-form"]') . "</div>";

    return $mod_newsletter;
}
add_shortcode( 'mod_newsletter', 'think_mod_newsletter' );


add_filter( 'wpcf7_form_elements', 'disable_first_select_element' );
function disable_first_select_element( $content ) {
	// global $wpcf7_contact_form;
	
	$find = '<option value="">';
	$replace = '<option value="" disabled selected>';
    $content = str_replace($find, $replace, $content);
    
	return $content;	
}


/*-----------------------------------------------------------------------------------*/
/* Blog
/*-----------------------------------------------------------------------------------*/
function think_search_filter( $query ){
    if( $query->is_search ){
        $query->set('post_type', 'post');
    }
    return $query;
}
if( !is_admin() ) add_filter('pre_get_posts', 'think_search_filter');

function estimated_time_to_read_post($content, $format = false) {
	$word_count = str_word_count($content);

	// 250 words a minute)
    $time_to_read = round($word_count * ( 1/250 ));
    $time = $format ? $time_to_read . ' min' : $time_to_read;
	return $time;
}

function sort_sectors($sorting_array, $array_to_sort) {
	$result = array();
	foreach($sorting_array as $sorting_array_value) {
		foreach ($array_to_sort as $array_to_sort_value) {
			if ($array_to_sort_value->slug === $sorting_array_value) {
				$result[] = $array_to_sort_value;
			}
		}
	}
	return $result;
}


/*-----------------------------------------------------------------------------------*/
/* Menus
/*-----------------------------------------------------------------------------------*/
register_nav_menus( array('primary' => 'Primary Menu') );

// Cleanup WP Menu html
function think_css_attributes_filter($var){
    return is_array($var) ? array_intersect($var, array('current-menu-item', 'current_page_parent')) : '';
}
add_filter( 'nav_menu_css_class', 'think_css_attributes_filter' );


/*-----------------------------------------------------------------------------------*/
/* Sidebar & Widgets
/*-----------------------------------------------------------------------------------*/
function think_register_sidebars(){
	register_sidebar( array(
		'id' => 'sidebar',
		'name' => 'Sidebar',
		'description' => 'Take it on the side...',
		'before_widget' => '',
		'after_widget' => '',
		'before_title' => '',
		'after_title' => '',
		'empty_title'=> ''
	) );
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
/* Post types
/*-----------------------------------------------------------------------------------*/
function think_post_type(){
    register_post_type( 'reference', array(
        'label' => 'References',
        'singular_label' => 'Reference',
        'public' => true,
        'menu_icon' => 'dashicons-portfolio',
        'show_in_rest' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'revisions'),
        'rewrite' => array(
            'with_front' => false,
        )
    ));
    register_post_type( 'job', array(
        'label' => 'Jobs',
        'singular_label' => 'Job',
        'public' => true,
        'publicly_queryable' => false,
        'menu_icon' => 'dashicons-businessman',
        'show_in_rest' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'revisions'),
        'rewrite' => array(
            'with_front' => false,
        )
    ));
}
add_action( 'init', 'think_post_type' );

function think_taxonomies(){
    register_taxonomy( 'reference_tag', array('reference'), array(
        'label' => 'Tags',
        'singular_label' => 'Tag',
        'hierarchical' => false,
        'show_admin_column' => true,
        'show_in_rest' => true
    ) );
    register_taxonomy( 'reference_cat', array('reference'), array(
        'label' => 'Secteurs',
        'singular_label' => 'Secteur',
        'hierarchical' => true,
        'show_admin_column' => true,
        'show_in_rest' => true
    ) );
    register_taxonomy( 'sector', array('post'), array(
        'label' => 'Secteurs',
        'singular_label' => 'Secteur',
        'hierarchical' => true,
        'show_admin_column' => true,
        'show_in_rest' => true
    ) );
}
add_action( 'init', 'think_taxonomies' );


/*-----------------------------------------------------------------------------------*/
/* Enqueue Styles and Scripts
/*-----------------------------------------------------------------------------------*/
function think_scripts(){
    // header
    wp_enqueue_style( 'think-style', get_template_directory_uri() . '/css/main.css', array(), THINK_VERSION );
    
	// footer
	wp_deregister_script('jquery');
	wp_enqueue_script( 'think-scripts', get_template_directory_uri() . '/js/main.js#deferload', array(), THINK_VERSION, true );

    wp_deregister_script( 'wp-embed' );
}
add_action( 'wp_enqueue_scripts', 'think_scripts' );

function add_async_defer_forscript($url) {
    if (strpos( $url, '.js' ) !== false) { 
        if (is_admin()) {
            $clean_url = str_replace('#asyncload', '', $url);
            $clean_url = str_replace('#deferload', '', $clean_url);
            return $clean_url;
        } else if (strpos($url, '#asyncload') !== false) {
            return str_replace('#asyncload', '', $url)."' async='true"; 
        } else if (strpos($url, '#deferload') !== false) {
            return str_replace('#deferload', '', $url)."' defer='true"; 
        }
    }
    return $url;
}
add_filter('clean_url', 'add_async_defer_forscript', 11, 1);

/*-----------------------------------------------------------------------------------*/
/* TGMPA
/*-----------------------------------------------------------------------------------*/
function think_register_required_plugins(){
	$plugins = array(
        array(
            'name'        => 'Advanced Custom Fields PRO',
            'slug'        => 'advanced-custom-fields-pro',
            'source'     => get_template_directory_uri() . '/plugins/advanced-custom-fields-pro.zip',
            'required'    => true,
            'force_activation' => false
        ),
        array(
            'name'        => 'Ajax Load More',
            'slug'        => 'ajax-load-more',
            'required'    => false,
            'force_activation' => false
        ),
        array(
            'name'        => 'Clean Image Filenames',
            'slug'        => 'clean-image-filenames',
            'required'    => false,
            'force_activation' => false
        ),
        array(
            'name'        => 'Contact Form',
            'slug'        => 'contact-form-7',
            'required'    => false,
            'force_activation' => false
        ),
        array(
            'name'        => 'EWWW Image Optimizer',
            'slug'        => 'ewww-image-optimizer',
            'required'    => false,
            'force_activation' => false
        ),
        array(
            'name'        => 'Loco Translate',
            'slug'        => 'loco-translate',
            'required'    => false,
            'force_activation' => false
        ),
        array(
            'name'        => 'Mailchimp for WordPress',
            'slug'        => 'mailchimp-for-wp',
            'required'    => false,
            'force_activation' => false
        ),
        array(
            'name'        => 'MultilingualPress',
            'slug'        => 'multilingual-press',
            'required'    => false,
            'force_activation' => false
        ),
        array(
            'name'        => 'Stereoberg',
            'slug'        => 'stereoberg',
            'source'     => get_template_directory_uri() . '/plugins/stereoberg.zip',
            'required'    => true,
            'version' => '1.1.0',
            'force_activation' => false
        ),
        array(
            'name'        => 'SecuPress Free — Sécurité WordPress',
            'slug'        => 'secupress',
            'required'    => false,
            'force_activation' => false
        ),
        array(
            'name'        => 'Yoast SEO',
            'slug'        => 'wordpress-seo',
            'required'    => false,
            'force_activation' => false
        ),
    );
    
	$config = array(
		'id'           => 'think',
		'default_path' => '', 
		'menu'         => 'tgmpa-install-plugins',
		'parent_slug'  => 'themes.php',
		'capability'   => 'edit_theme_options', 
		'has_notices'  => true,
		'dismissable'  => true,
		'dismiss_msg'  => '',
		'is_automatic' => false,
		'message'      => ''
    );
    
	tgmpa( $plugins, $config );
}
add_action( 'tgmpa_register', 'think_register_required_plugins' );

/*-----------------------------------------------------------------------------------*/
/* I18n
/*-----------------------------------------------------------------------------------*/

add_action( 'after_setup_theme', 'language_translation_setup' );
function language_translation_setup(){
    load_theme_textdomain( 'think', get_template_directory() . '/languages' );

    $locale = get_locale();
    $locale_file = get_template_directory() . "/languages/$locale.php";

    if ( is_readable( $locale_file ) ) {
        require_once( $locale_file );
    }
}

?>

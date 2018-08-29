<?php

define( 'THINK_VERSION', 1.7 );


/*-----------------------------------------------------------------------------------*/
/* General
/*-----------------------------------------------------------------------------------*/
// Plugins updates
add_filter( 'auto_update_plugin', '__return_true' );

// Theme support
add_theme_support( 'html5',
    array('comment-list', 'comment-form', 'search-form', 'gallery', 'caption', 'widgets')
);
add_theme_support( 'post-thumbnails' );
add_theme_support( 'post-formats', array( 'link' ) );
add_theme_support( 'title-tag' );

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

function concord_init_editor_styles(){
    add_editor_style();
}
add_action( 'after_setup_theme', 'concord_init_editor_styles' );

// Add styles format to TinyMCE
function think_button( $buttons ){
    array_unshift( $buttons, 'styleselect' );
    return $buttons;
}
add_filter( 'mce_buttons_2', 'think_button' );

// Customize a bit the wysiwyg editor
function think_mce_before_init( $styles ){
    
    // Add style formats
    $style_formats = array(
        array(
            'title' => 'Styles H1',
            'inline' => 'span',
            'classes' => 'h1',
        ),
        array(
            'title' => 'Styles H2',
            'inline' => 'span',
            'classes' => 'h2',
        ),
        array(
            'title' => 'Styles H3',
            'inline' => 'span',
            'classes' => 'h3',
        ),
        array(
            'title' => 'Styles H4',
            'inline' => 'span',
            'classes' => 'h4',
        ),
        array(
            'title' => 'Styles H5',
            'inline' => 'span',
            'classes' => 'h5',
        ),
        array(
            'title' => 'Styles H6',
            'inline' => 'span',
            'classes' => 'h6',
        ),
        array(
            'title' => 'Text Indent',
            'block' => 'p',
            'classes' => 'text-indent'
        )
    );
    $styles['style_formats'] = json_encode( $style_formats );

    // Remove h1 and code
    $styles['block_formats'] = 'Paragraph=p;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6';
    return $styles;
}
add_filter( 'tiny_mce_before_init', 'think_mce_before_init' );

function think_add_buttons( $plugin_array ) {
    $plugin_array['think'] = get_template_directory_uri() . '/think-editor-buttons/think-plugin.js';
    return $plugin_array;
}
add_filter( 'mce_external_plugins', 'think_add_buttons' );

function think_register_buttons( $buttons ) {
    array_push( $buttons, 'break', 'bckq', 'modNewsletter', 'modContact' );
    return $buttons;
}
add_filter( 'mce_buttons', 'think_register_buttons' );

function think_mod_newsletter( $atts, $content = '' ) {
    $mod_newsletter = "<div class='blog-newsletter-mod blog-mod'>
    <h3 class='h5'>" . __('Inscrivez-vous à notre newsletter', 'thinkovery') . "</h3>"
    . do_shortcode("[mc4wp_form id='8558']") ."</div>";

    return $mod_newsletter;
}
add_shortcode( 'mod_newsletter', 'think_mod_newsletter' );

function think_mod_contact( $atts, $content = '' ) {
    $mod_contact_datas = get_field('blog_modContact','options');
    
    if( !empty($mod_contact_datas['blog_modContact_btnLink']) ):
        $modContact_btnLabel = $mod_contact_datas['blog_modContact_btnLabel'] ? $mod_contact_datas['blog_modContact_btnLabel'] : __('Contactez-nous','thinkovery');
        $mod_contact = "<div class='blog-contact-mod blog-mod'>
                        <h3 class='h5'>" . $mod_contact_datas['blog_modContact_txt'] . "</h3>
                        <a href='". $mod_contact_datas['blog_modContact_btnLink'] ."' title='". $modContact_btnLabel ."' class='btn btn-medium'>". $modContact_btnLabel ."<svg class='icon'><use xlink:href='#icon-arrow-right'/></svg><i></i></a>
                        </div>";
    else:
        $mod_contact = '';
    endif;

    return $mod_contact;
}
add_shortcode( 'mod_contact', 'think_mod_contact' );

// Add Options Page
if(function_exists('acf_add_options_page')){
    $optionsMainPage = acf_add_options_page(array(
        'position'   => 2,
        'page_title' => 'Theme General Options',
        'menu_title' => 'Theme Options',
        'redirect'   => false
    ));

    acf_add_options_sub_page(array(
        'page_title'    => 'Blog Settings',
        'menu_title'    => 'Blog',
        'parent_slug'   => $optionsMainPage['menu_slug'],
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

// Remove the classes on images
add_filter( 'get_image_tag_class', '__return_empty_string' );

// Change markup images in content
function think_insert_image($html, $id, $caption, $title, $align, $url) {
    $html5 = '<div class="post-img align' . $align . '">' . $html . '</div>';
    return $html5;
}
add_filter( 'image_send_to_editor', 'think_insert_image', 10, 9 );

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
/* Blog
/*-----------------------------------------------------------------------------------*/
function custom_blog_search( $query ) {
    if ( is_search() && $query->is_main_query() ){
        // Set category to query
        if( !empty( $_GET['category'] ) ):  
            $query->set('category_name', $_GET['category'] );
        endif;

        // Set topic to query
        if( !empty( $_GET['topic'] ) ):  
            $query->set('tax_query', array(
                array(
                    'taxonomy' => 'rubrique',
                    'field'    => 'slug',
                    'terms'    => $_GET['topic']
                )
            ));
        endif;
    }
    return $query;
 };
add_filter('pre_get_posts', 'custom_blog_search');

// Add custom taxonomy "Rubriques"
add_action( 'init', 'register_topic_taxonomy', 0 );
function register_topic_taxonomy() {

	// !Rubrique Taxonomy
	$labels = array(
		'name'							=> _x( 'Topics', 'taxonomy general name', 'thinkovery' ),
		'singular_name'					=> _x( 'Topic', 'taxonomy singular name', 'thinkovery' ),
		'menu_name'						=> _x( 'Topics', 'taxonomy general name', 'thinkovery' ),
		'search_items'					=> __( 'Search Topics', 'thinkovery' ),
		'popular_items'					=> __( 'Popular Topics', 'thinkovery' ),
		'all_items'						=> __( 'All Topics', 'thinkovery' ),
		'parent_item'					=> __( 'Parent Topic', 'thinkovery' ),
		'parent_item_colon'				=> __( 'Parent Topic:', 'thinkovery' ),
		'edit_item'						=> __( 'Edit Topic', 'thinkovery' ),
		'view_item'						=> __( 'View Topic', 'thinkovery' ),
		'update_item'					=> __( 'Update Topic', 'thinkovery' ),
		'add_new_item'					=> __( 'Add New Topic', 'thinkovery' ),
		'new_item_name'					=> __( 'New Topic Name', 'thinkovery' ),
		'separate_items_with_commas' 	=> __( 'Separate topics with commas', 'thinkovery' ),
		'add_or_remove_items'			=> __( 'Add or remove topics', 'thinkovery' ),
		'choose_from_most_used'			=> __( 'Choose from the most used topics', 'thinkovery' ),
		'not_found'						=> __( 'No topics found.', 'thinkovery' ),
	);

	$rewrite = array(
		'slug'                       => 'rubrique',
		'with_front'                 => true,
		'hierarchical'               => false,
	);

	$args = array(
		'labels'                     => $labels,
		'hierarchical'               => true,
		'public'                     => true,
		'show_ui'                    => true,
		'show_admin_column'          => true,
		'show_in_nav_menus'          => true,
		'show_tagcloud'              => true,
		'rewrite'                    => $rewrite,
	);
	register_taxonomy( 'rubrique', array( 'post' ), $args );

}

add_filter( 'term_updated_messages', 'topic_taxonomy_messages' );
function topic_taxonomy_messages( $messages ) {

	$messages['rubrique'] = array(
		0 => '', // Unused. Messages start at index 1.
		1 => __( 'Topic added.', 'thinkovery' ),
		2 => __( 'Topic deleted.', 'thinkovery' ),
		3 => __( 'Topic updated.', 'thinkovery' ),
		4 => __( 'Topic not added.', 'thinkovery' ),
		5 => __( 'Topic not updated.', 'thinkovery' ),
		6 => __( 'Topic deleted.', 'thinkovery' ),
	);

	return $messages;
}

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

// Limit title lenth
function think_title_length( $title ){
    $max = 92;
    if( strlen($title) > $max ){
        // return substr( $title, 0, $max ) . " &hellip;";
        return explode("\n", wordwrap($title, $max))[0] . " &hellip;";
    }else{
        return $title;
    }
}


/*-----------------------------------------------------------------------------------*/
/* WP Rocket
/*-----------------------------------------------------------------------------------*/

function think_cookies($cookies){
    $cookies[] = 'think-decli';
    $cookies[] = 'think-cookies';
    return $cookies;
}
add_filter( 'rocket_cache_dynamic_cookies', 'think_cookies' );


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
	wp_enqueue_script( 'think-scripts', get_template_directory_uri() . '/js/main.js', array(), THINK_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'think_scripts' );

?>

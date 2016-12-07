<?php
	if(!session_id()){
		session_start();
	}

	$_POST = $_SESSION;
	global $errorComment;
	$errorComment = isset($_POST['errorcomment']) ? $_POST['errorcomment'] : false;

	if(!isset($_GET['error'])){
		if($errorComment){
			$_POST['errorcomment'] = false;
		}
		session_destroy();
	}
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class='no-js'>
	<head>
		<meta charset='utf-8'>
		<meta name='viewport' content='width=device-width,initial-scale=1'>

		<title><?php wp_title(''); ?></title>

		<link rel='alternate' type='application/rss+xml' title='<?php echo get_bloginfo('sitename') ?> Feed' href='<?php echo get_bloginfo('rss2_url') ?>'>

		<?php wp_head(); ?>
		<script src='https://use.typekit.net/uhd8avk.js'></script>
		<script>try{Typekit.load({ async: true });}catch(e){}</script>
	</head>

	<body <?php body_class(); ?>>

		<header role='banner'>
			<nav role='navigation' class='container'>
				<a href='<?php echo home_url('/'); ?>' title='<?php bloginfo( 'name' ); ?>' rel='home'><?php bloginfo( 'name' ); ?></a>
				<?php wp_nav_menu( array( 'theme_location' => 'primary', 'container' => false, 'menu_class' => 'menu-main' ) ); ?>
				<?php mlp_show_linked_elements( array('show_current_blog' => true) ); ?>
			</nav>
		</header>

		<main role='main'>

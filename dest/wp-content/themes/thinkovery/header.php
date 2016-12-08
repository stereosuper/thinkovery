<?php
	// Comments error
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

	// Declis
	global $declis;
	$declisField = get_field('decli', 'options');
	$declis = [];
	$count = 0;
	foreach($declisField as $decli){
	    $declis[$count]['mainColor'] = $decli['mainColor'];
	    $declis[$count]['title1'] = $decli['title1'];
	    $declis[$count]['title2'] = $decli['title2'];
	    $declis[$count]['txt'] = $decli['txt'];
	    $declis[$count]['circlePosX'] = $decli['circlePosX'];
	    $declis[$count]['circlePosY'] = $decli['circlePosY'];
	    $declis[$count]['circleWidth'] = $decli['circleWidth'];
	    $declis[$count]['circlePlan'] = $decli['circlePlan'];

	    $countImg = 0;
	    foreach($decli['homeImg'] as $img){
	        $declis[$count]['homeImg'][$countImg] = $img['img'];
	        $countImg ++;
	    }
	    $count ++;
	}
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class='no-js'>
	<head>
		<meta charset='utf-8'>
		<meta name='viewport' content='width=device-width,initial-scale=1'>

		<link rel='alternate' type='application/rss+xml' title='<?php echo get_bloginfo('sitename'); ?> Feed' href='<?php echo get_bloginfo('rss2_url'); ?>'>

		<?php wp_head(); ?>
		<script src='https://use.typekit.net/uhd8avk.js'></script>
		<script>try{Typekit.load({ async: true });}catch(e){}</script>
	</head>

	<body <?php body_class('theme-'.$declis[0]['mainColor']); ?>>

		<header role='banner'>
			<nav role='navigation' class='container'>
				<a href='<?php echo home_url('/'); ?>' title='<?php bloginfo( 'name' ); ?>' rel='home'><?php bloginfo( 'name' ); ?></a>
				<?php wp_nav_menu( array( 'theme_location' => 'primary', 'container' => false, 'menu_class' => 'menu-main' ) ); ?>
				<?php mlp_show_linked_elements( array('show_current_blog' => true) ); ?>
			</nav>
		</header>

		<main role='main'>

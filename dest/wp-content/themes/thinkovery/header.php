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

	// Lang
	$lang = __('en', 'thinkovery');
	$siteUrl = get_site_url('/');
	$siteUrl .= $lang == 'fr' ? '/?noredirect=fr_FR' : '/en/?noredirect=en_US';

	// Declis
	global $currentDecli;
	if(isset($_COOKIE['think-decli'])){
		$currentDecli = unserialize(base64_decode($_COOKIE['think-decli']));
	}else{
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
		$currentDecli = $declis[0];

		setcookie('think-decli', base64_encode(serialize($currentDecli)), time()+3600*24);
	}

	// Theme colors
	global $themeColors;
	$themeColors = [
	    'yellow' => [ 'rgb(255, 228, 0)', 'rgb(43, 240, 117)' ],
	    'orange' => [ 'rgb(255, 120, 0)', 'rgb(255, 228, 0)' ],
	    'red'    => [ 'rgb(255, 6, 0)', 'rgb(255, 120, 0)' ],
	    'pink'   => [ 'rgb(240, 43, 140)', 'rgb(255, 6, 0)' ],
	    'blue'   => [ 'rgb(2, 187, 255)', 'rgb(138, 126, 224)' ],
	    'green'  => [ 'rgb(43, 240, 117)', 'rgb(2, 187, 255)' ]
	];
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

	<body <?php body_class('theme-'.$currentDecli['mainColor']); ?>>

		<header role='banner' id='header'>
			<nav role='navigation' class='container'>
				<a href='<?php echo $siteUrl ?>' title='<?php bloginfo( 'name' ); ?>' rel='home' class='logo' id='logo'>
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 592 123' class='logo-svg' preserveAspectRatio='xMinYMin meet'>
					  	<title>Thinkovery</title>
					  	<path d='M29.4 66.2c0 8.2 4 11.8 10 11.8 3.1 0 4.4-.3 7.8-2v17.6c-3.1 1.2-5.1 1.3-9 1.3-16.1 0-27.8-8.5-27.8-27.3V49.8H0V34.1h10.4V14.3h19V34h17.9v15.7H29.4v16.5z'/>
					  	<path d='M75.8 62.5C75.8 53.2 82.2 50 88 50c5.5 0 11.3 4.2 11.3 12.2V95h18.3V61.6c0-18.6-8.4-29.4-24.6-29.4-5.8 0-14.7 3.3-17.2 10.9V0H57.5v94.9h18.3V62.5z'/>
					  	<path d='M144.5 33.5h-18.1V95h18.1V33.5z'/>
					  	<path d='M172.3 62.5c0-9.3 4.9-12.5 11.3-12.5 6.2 0 10.6 4.1 10.6 12.2V95h18.3V58.3c0-17.5-8.7-26.1-22.5-26.1-7.2 0-14.4 4.1-17.7 10.3v-9h-18.2V95h18.3l-.1-32.5z'/>
					  	<path d='M269.9 81.6c1.9 4.9 4.6 9.4 8 13.4h-18.5l-20.5-24.4V95h-18.1V.1h18.1v50.2l13.8-16.9h21.6l-23 27.1 18.6 21.1z'/>
					  	<path d='M391.5 95h-15.6l-12.5-29.8v-1.6c0-11.4-3.9-21.8-10.4-30.1h16.4l14.3 38.2 14.2-38.2h19.6l-26 61.5z'/>
					  	<path d='M461.5 74.7c-3 3.9-8.4 5.8-13.4 5.8-6.4 0-14.2-3.2-15.1-10.3h44.9c.1-1.6.3-4.1.3-5.7 0-19.4-13.9-32.4-31.4-32.4-17.6 0-32.1 12.5-32.1 31.9s14.4 32.3 32.1 32.3c10.4 0 21.8-3.3 28-12.5l-13.3-9.1zm-28.3-15.9c1.6-7.8 8.5-10.5 13.7-10.5 5.1 0 12 3 12.9 10.5h-26.6z'/>
					  	<path d='M525.1 49.8s-4 .1-5.9.1c-10.5 0-15.7 9.9-15.7 26.1v19h-18.3V33.5h18.3v14.9c4.5-16.5 21.6-15.1 21.6-15.1v16.5z'/>
					  	<path d='M546.3 96.9c-2.4 5.8-4.1 9.9-10.2 9.9-1.8 0-1.7 0-6.9-.9v15.6c4.4 1.5 7.6 1.5 8.5 1.5 13 0 18.8-5.7 24.7-19.3L592 33h-19l-13.2 33.8L546.6 33h-18.9l22.6 54.9-4 9z'/>
					  	<path class='theme-color logo-o' id='logo-o1' d='M315 17.5c-25.3 0-45.9 20.7-45.9 46.1s20.5 46.1 45.9 46.1c25.3 0 45.9-20.7 45.9-46.1S340.3 17.5 315 17.5zm.8 73.4c-15.3 0-27.7-12.6-27.7-28.2s12.4-28.2 27.7-28.2 27.7 12.6 27.7 28.2-12.4 28.2-27.7 28.2z'/>
					  	<path class='theme-color' d='M124 10.7c0 6.1 5.3 10.8 11.4 10.8 6.2 0 11.2-4.7 11.2-10.8 0-6.1-5-10.7-11.2-10.7-6.1.1-11.4 4.7-11.4 10.7z'/>
					</svg>
					<i class='border'></i>
					<i id='logo-o'></i>
				</a>
				<div class='menu-wrapper'>
					<?php wp_nav_menu( array( 'theme_location' => 'primary', 'container' => false, 'menu_class' => 'menu-main' ) ); ?>

					<ul class='lang'>
						<?php if( $lang != 'fr' ){ ?>
							<li><span>en</span></li>
							<li>
								<a rel='alternate' hreflang='fr-FR' href='<?php echo get_site_url('/'); ?>/?noredirect=fr_FR'>fr</a>
							</li>
						<?php }else{ ?>
							<li><span>fr</span></li>
							<li>
								<a rel='alternate' hreflang='en-US' href='<?php echo get_site_url('/'); ?>/en/?noredirect=en_US'>en</a>
							</li>
						<?php } ?>
					</ul>
				</div>
			</nav>
		</header>

		<main role='main' id='main'>

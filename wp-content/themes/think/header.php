<!DOCTYPE html>

<html <?php language_attributes(); ?> class='no-js'>
	<head>
		<meta charset='utf-8'>
		<meta name='viewport' content='width=device-width,initial-scale=1'>
		<meta name='format-detection' content='telephone=no'>

		<link rel='alternate' type='application/rss+xml' title='<?php echo get_bloginfo('sitename') ?> Feed' href='<?php echo get_bloginfo('rss2_url') ?>'>

		<?php wp_head(); ?>

		<script>document.getElementsByTagName('html')[0].className = 'js';</script>

		<link rel="preload" href="https://use.typekit.net/uhd8avk.js" as="script">
		<script src='https://use.typekit.net/uhd8avk.js'></script>

		<!-- Google Tag Manager -->
		<script>
			(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
			new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
			j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
			'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
			})(window,document,'script','dataLayer','GTM-MKRJ9ZB');
		</script>
		<!-- End Google Tag Manager -->
	</head>
	<body <?php body_class(); ?>>

		<!-- Google Tag Manager (noscript) -->
		<noscript>
			<iframe src='https://www.googletagmanager.com/ns.html?id=GTM-MKRJ9ZB' class='hidden'></iframe>
		</noscript>
		<!-- End Google Tag Manager (noscript) -->

		<header role='banner' id="main-header">
			<div class='container'>
				<a href='<?php echo home_url('/'); ?>' class="logo" title='<?php bloginfo( 'name' ); ?>' rel='home'><?php bloginfo( 'name' ); ?></a>
				<button id='burger' type="button">
					<span class="sesame-bun"></span>
					<span class="steak"></span>
					<span class="bun"></span>
					<span class="first-cross-line"></span>
					<span class="second-cross-line"></span>
				</button>
				<nav id="main-navigation" aria-expanded="false">
					<div class="main-navigation-container">
						<?php wp_nav_menu(array('theme_location' => 'primary', 'container' => null, 'menu_id' => '', 'menu_class' => 'menu')); ?>
						<div id="borders">
							<span class="border first"></span>
							<span class="border second"></span>
							<span class="border third"></span>
						</div>
					</div>
					<?php 
						mlp_show_linked_elements( array( 'link_text' => 'text', 'echo' => true, 'sort' => 'blogid', 'show_current_blog' => TRUE ) );
					?>
					<span class="line-opening"></span>
				</nav>
			</div>
		</header>
		<main role='main'>

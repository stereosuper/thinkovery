<!DOCTYPE html>

<html <?php language_attributes(); ?> class='no-js'>
	<head>
		<meta charset='utf-8'>
		<meta name='viewport' content='width=device-width,initial-scale=1'>
		<meta name='format-detection' content='telephone=no'>

		<link rel='alternate' type='application/rss+xml' title='<?php echo get_bloginfo('sitename') ?> Feed' href='<?php echo get_bloginfo('rss2_url') ?>'>

		<?php wp_head(); ?>

		<script>document.getElementsByTagName('html')[0].className = 'js';</script>

		<link rel="preload" href="https://use.typekit.net/ovy5fzp.js" as="script">
		<script src='https://use.typekit.net/ovy5fzp.js'></script>
		<script>try{Typekit.load({ async: false });}catch(e){}</script>

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

		<?php get_template_part('img/logo-loader.svg'); ?>

		<div id='shapes' class='shapes'>
            <svg class="shape"><use xlink:href="#icon-drop"/></svg>
            <svg class="shape"><use xlink:href="#icon-square"/></svg>
            <svg class="shape"><use xlink:href="#icon-triangle"/></svg>
            <svg class="shape"><use xlink:href="#icon-rectangle"/></svg>
            <svg class="shape"><use xlink:href="#icon-circle"/></svg>
        </div>

		<header role='banner' class="main-header" id='header'>
			<div class='container'>
				<a href='<?php echo home_url('/'); ?>' class="logo js-load-hidden" title='<?php bloginfo( 'name' ); ?>' rel='home' style="opacity:0">
					<svg width="155" height="34" viewBox="0 0 155 34" fill="none" xmlns="http://www.w3.org/2000/svg" id="logo">
						<path d="M147.189 33.8048C142.96 33.8048 139.732 31.7195 139.377 27.5155H143.251C143.767 29.4712 145.123 30.1551 147.093 30.1551C149.062 30.1551 151.063 28.5913 151.063 25.7235V23.2793C149.513 25.2021 147.867 25.6907 145.64 25.6907C141.862 25.6907 139.054 22.7578 139.054 17.8048V9.36519H142.992V17.7725C142.992 20.2162 144.316 22.0739 146.834 22.0739C149.288 22.0739 150.902 20.0209 150.902 17.5766V9.36519H154.808V25.8215C154.808 31.296 151.063 33.8048 147.189 33.8048ZM134.771 12.9736C131.953 12.9736 130.799 15.5099 130.799 19.7598V25.4147H126.656V9.40879H130.799V13.1791C131.613 10.266 133.481 9.06593 135.28 9.06593C136.287 9.06593 137.072 9.26066 137.69 9.54797V13.4168C136.705 12.9736 135.178 12.9736 134.771 12.9736ZM112.36 18.7999C112.632 20.9246 114.398 22.2274 116.741 22.2274C118.337 22.2274 119.966 21.5417 120.713 20.1708C121.698 20.7192 122.852 21.3362 123.871 21.8845C122.445 24.6263 119.389 25.7576 116.469 25.7576C111.953 25.7576 108.252 22.3988 108.252 17.3604C108.252 12.3219 111.953 9.06593 116.469 9.06593C120.985 9.06593 124.516 12.3219 124.516 17.3604C124.516 17.7719 124.482 18.423 124.448 18.7999H112.36ZM116.503 12.5621C114.33 12.5621 112.632 13.7961 112.326 15.9549H120.476C120.17 13.7615 118.54 12.5621 116.503 12.5621ZM98.7324 25.4147L92.077 9.40879H96.4913L100.566 20.0681L104.64 9.40879H109.088L102.399 25.4147C98.7324 25.4147 98.7324 25.4147 98.7324 25.4147ZM67.2994 25.4147L61.3237 18.5598V25.4147H57.2153V0.703369H61.3237V14.2071L65.7039 9.40879H71.0685L64.4137 16.4351L72.4943 25.4147H67.2994ZM50.4608 16.7093C50.4608 14.3785 49.2386 13.1451 47.4389 13.1451C45.5711 13.1451 43.9756 14.1044 43.9756 16.8807V25.4147H39.8331V9.40879H43.9756V11.7736C44.8584 10.0599 46.8619 9.06593 48.6951 9.06593C52.3961 9.06593 54.6032 11.4313 54.6032 15.9549V25.4147C53.924 25.4147 51.1059 25.4147 50.4608 25.4147V16.7093ZM34.726 6.51774C33.2661 6.51774 32.044 5.42105 32.044 3.98149C32.044 2.57598 33.2661 1.4793 34.726 1.4793C36.1524 1.4793 37.3405 2.57598 37.3405 3.98149C37.3405 5.42105 36.1524 6.51774 34.726 6.51774ZM25.6443 16.7093C25.6443 14.4126 23.9801 13.1451 22.2825 13.1451C20.5509 13.1451 18.4799 14.1044 18.4799 16.8807V25.4147H14.3375V0.703369H18.4799V11.8763C19.2266 9.92309 21.8411 9.06593 23.4031 9.06593C27.5115 9.06593 29.7861 11.8082 29.7861 16.5038V25.4147C29.1076 25.4147 26.3228 25.4147 25.6443 25.4147V16.7093ZM3.281 18.9714V12.7676H0.907227V9.40879H3.281V4.79087L7.4569 4.74786V9.40879H11.2631V12.7676H7.4569V19.0401C7.42345 20.4109 7.79678 21.5763 9.80021 21.5763L11.3282 21.3177V25.4147H9.18915C4.77491 25.4147 3.281 23.1186 3.281 18.9714ZM36.7635 25.4147H32.6551V9.40879H36.7635V25.4147Z" fill="#404040"/>
						<path class='circle' d="M81.7873 27.737C75.6847 27.737 70.7371 22.7892 70.7371 16.6865C70.7371 10.5833 75.6847 5.63599 81.7873 5.63599C87.8905 5.63599 92.8381 10.5833 92.8381 16.6865C92.8381 22.7892 87.8905 27.737 81.7873 27.737ZM81.9079 9.11778C77.7179 9.11778 74.3211 12.5522 74.3211 16.7888C74.3211 21.0254 77.7179 24.4604 81.9079 24.4604C86.0979 24.4604 89.4942 21.0254 89.4942 16.7888C89.4942 12.5522 86.0979 9.11778 81.9079 9.11778Z" fill="#1E5E32"/>
					</svg>
				</a>

				<button id="burger" class="burger js-load-hidden" style="opacity:0" type="button">
					<span class="sesame-bun"></span>
					<span class="steak"></span>
					<span class="bun"></span>
					<span class="first-cross-line"></span>
					<span class="second-cross-line"></span>
				</button>

				<nav id="main-navigation" class="main-navigation" aria-expanded="false" style="opacity:0">
					<div class="main-navigation-container">
						<?php wp_nav_menu(array('theme_location' => 'primary', 'container' => null, 'menu_id' => '', 'menu_class' => 'menu')); ?>
					</div>
					<?php 
						mlp_show_linked_elements( array( 'link_text' => 'text', 'echo' => true, 'sort' => 'blogid', 'show_current_blog' => TRUE ) );
					?>
					<div class="menu-borders">
						<span class="border first"></span>
						<span class="border second"></span>
						<span class="border third"></span>
					</div>
					<span class="line-opening"></span>
				</nav>
			</div>
		</header>

		<div id="borders" class="borders"></div>
		
		<main role='main' class='main js-load-hidden' style='opacity:0'>
			

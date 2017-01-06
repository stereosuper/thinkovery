<?php
/*
Template Name: About
*/

get_header(); ?>

	<div class='container'>

		<?php if ( have_posts() ) : the_post(); ?>

		    <div class='container-small'><h1><?php the_title(); ?></h1></div>

		    <div class='about-img about-img1'>
		    	<img src='<?php echo get_template_directory_uri(); ?>/layoutImg/about1.jpg' alt='Thinkovery team'>
		    	<svg class='icon hoop' style='fill:url(<?php echo $currentUrl; ?>#gradient-hoop)'><use xlink:href='#icon-hoop-thin'/></svg>
		    	<div class='mask'></div>
		    </div><div class='about-txt about-txt1 col-4'>
		    	<h2><?php the_field('title1'); ?></h2>
		    	<?php the_field('txt1'); ?>
		    </div>

		    <div class='about-img about-img2'>
		    	<img src='<?php echo get_template_directory_uri(); ?>/layoutImg/about2.jpg' alt=''>
		    </div><div class='about-img about-img3'>
		    	<img src='<?php echo get_template_directory_uri(); ?>/layoutImg/about3.jpg' alt=''>
		    	<svg class='icon hoop' style='fill:url(<?php echo $currentUrl; ?>#gradient-hoop)'><use xlink:href='#icon-hoop'/></svg>
		    	<div class='mask'></div>
		    </div>

		    <div class='about-txt about-txt2 col-4'>
		    	<h2><?php the_field('title2'); ?></h2>
		    	<?php the_field('txt2'); ?>
		    </div><div class='about-img about-img4'>
		    	<img src='<?php echo get_template_directory_uri(); ?>/layoutImg/about4.jpg' alt=''>
		    </div><div class='about-img-wrapper'>
		    	<div class='about-img about-img5'>
		    		<img src='<?php echo get_template_directory_uri(); ?>/layoutImg/about5.jpg' alt=''>
		    		<svg class='icon hoop' style='fill:url(<?php echo $currentUrl; ?>#gradient-hoop)'><use xlink:href='#icon-hoop'/></svg>
		    	</div>
		    	<div class='about-img about-img6'>
		    		<img src='<?php echo get_template_directory_uri(); ?>/layoutImg/about6.jpg' alt=''>
		    		<svg class='icon hoop' style='fill:url(<?php echo $currentUrl; ?>#gradient-hoop)'><use xlink:href='#icon-hoop'/></svg>
		    	</div>
		    </div><div class='about-txt about-txt3 col-3'>
		    	<h2><?php the_field('title3'); ?></h2>
		    	<?php the_field('txt3'); ?>
		    </div>

		    <div class='about-img about-img7'>
		    	<img src='<?php echo get_template_directory_uri(); ?>/layoutImg/about7.jpg' alt=''>
		    	<svg class='icon hoop' style='fill:url(<?php echo $currentUrl; ?>#gradient-hoop)'><use xlink:href='#icon-hoop-thin'/></svg>
		    	<div class='mask'></div>
		    </div>

		<?php else : ?>

		    <h1>404</h1>

		<?php endif; ?>

    </div>

<?php get_footer(); ?>

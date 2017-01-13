<?php
/*
Template Name: About
*/

get_header(); ?>

	<div class='container'>

		<?php if ( have_posts() ) : the_post(); ?>

		    <div class='container-small'><h1><?php the_title(); ?></h1></div>

		    <div class='about-img about-img1 animateOnScroll'>
		    	<?php
		    		$img1 = "<img src='" . get_template_directory_uri() . "/layoutImg/about1.jpg' alt='Thinkovery team'>";
		    		echo apply_filters( 'bj_lazy_load_html', $img1 );
		    	?>
		    	<svg class='icon hoop' style='fill:url(<?php echo $currentUrl; ?>#gradient-hoop)'><use xlink:href='#icon-hoop-thin'/></svg>
		    	<div class='mask'></div>
		    </div><div class='about-txt about-txt1 col-4'>
		    	<h2><?php the_field('title1'); ?></h2>
		    	<?php the_field('txt1'); ?>
		    </div>

		    <div class='about-img about-img2'>
		    	<?php
		    		$img2 = "<img src='" . get_template_directory_uri() . "/layoutImg/about2.jpg' alt=''>";
		    		echo apply_filters( 'bj_lazy_load_html', $img2 );
		    	?>
		    </div><div class='about-img about-img3'>
		    	<?php
		    		$img3 = "<img src='" . get_template_directory_uri() . "/layoutImg/about3.jpg' alt=''>";
		    		echo apply_filters( 'bj_lazy_load_html', $img3 );
		    	?>
		    	<svg class='icon hoop' style='fill:url(<?php echo $currentUrl; ?>#gradient-hoop)'><use xlink:href='#icon-hoop'/></svg>
		    	<div class='mask'></div>
		    </div>

		    <div class='about-txt about-txt2 col-4'>
		    	<h2><?php the_field('title2'); ?></h2>
		    	<?php the_field('txt2'); ?>
		    </div><div class='about-img about-img4 animateOnScroll'>
		    	<?php
		    		$img4 = "<img src='" . get_template_directory_uri() . "/layoutImg/about4.jpg' alt=''>";
		    		echo apply_filters( 'bj_lazy_load_html', $img4 );
		    	?>
		    </div><div class='about-img-wrapper'>
		    	<div class='about-img about-img5'>
		    		<?php
		    			$img5 = "<img src='" . get_template_directory_uri() . "/layoutImg/about5.jpg' alt=''>";
		    			echo apply_filters( 'bj_lazy_load_html', $img5 );
		    		?>
		    		<svg class='icon hoop' style='fill:url(<?php echo $currentUrl; ?>#gradient-hoop)'><use xlink:href='#icon-hoop'/></svg>
		    	</div>
		    	<div class='about-img about-img6 animateOnScroll'>
		    		<?php
		    			$img6 = "<img src='" . get_template_directory_uri() . "/layoutImg/about6.jpg' alt='Thinkovery team'>";
		    			echo apply_filters( 'bj_lazy_load_html', $img6 );
		    		?>
		    		<svg class='icon hoop' style='fill:url(<?php echo $currentUrl; ?>#gradient-hoop)'><use xlink:href='#icon-hoop'/></svg>
		    	</div>
		    </div><div class='about-txt about-txt3 col-3'>
		    	<h2><?php the_field('title3'); ?></h2>
		    	<?php the_field('txt3'); ?>
		    </div>

		    <div class='about-img about-img7 animateOnScroll'>
		    	<?php
		    		$img7 = "<img src='" . get_template_directory_uri() . "/layoutImg/about7.jpg' alt='Thinkovery team'>";
		    		echo apply_filters( 'bj_lazy_load_html', $img7 );
		    	?>
		    	<svg class='icon hoop' style='fill:url(<?php echo $currentUrl; ?>#gradient-hoop)'><use xlink:href='#icon-hoop-thin'/></svg>
		    	<div class='mask'></div>
		    </div>

		<?php else : ?>

		    <h1>404</h1>

		<?php endif; ?>

    </div>

<?php get_footer(); ?>

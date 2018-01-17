<?php
/*
Template Name: About
*/

get_header(); ?>

	<?php if ( have_posts() ) : the_post(); ?>

		<?php if( get_field('video') ){ ?>
			<div class='about-video'>
				<div>
					<div class='container'>
						<div class='container-small'>

							<div class='wrapper-video'>
								<div>
									<?php
										$video = "<iframe src='https://www.youtube.com/embed/" . get_field('video') . "?html5=1' frameborder='0' allowfullscreen></iframe>";
										echo apply_filters( 'bj_lazy_load_html', $video );
									?>
								</div>
							</div>

						</div>
					</div>
					<svg class='icon hoop' style='fill:url(<?php echo $currentUrl; ?>#gradient-hoop)'><use xlink:href='#icon-hoop-thin'/></svg>
				</div>
			</div>
		<?php } ?>
		
		<div class='container' id='aboutPage'>

		    <div class='container-small'><h1><?php the_title(); ?></h1></div>

		    <div class='about-img about-img1 animateOnScroll'>
		    	<?php
		    		$img1 = "<img src='" . get_template_directory_uri() . "/layoutImg/thinkovery-digital-learning-equipe-a-propos.jpg' alt='photo equipe thinkovery digital learning' title='a propos equipe thinkovery'>";
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
		    		$img2 = "<img src='" . get_template_directory_uri() . "/layoutImg/thinkovery-agence-digital-learning-alban-constantin-a-propos.jpg' alt='photo alban constantin thinkovery digital learning' title='a propos Alban constantin thinkovery digital learning'>";
		    		echo apply_filters( 'bj_lazy_load_html', $img2 );
		    	?>
		    </div><div class='about-img about-img3'>
		    	<?php
		    		$img3 = "<img src='" . get_template_directory_uri() . "/layoutImg/thinkovery-digital-learning-graphiste-a-propos.jpg' alt='photo equipe graphiste thinkovery digital learning' title='a propos equipe graphique thinkovery'>";
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
		    		$img4 = "<img src='" . get_template_directory_uri() . "/layoutImg/thinkovery-agence-digital-learning-equipe-production-a-propos.jpg' alt='photo equipe production thinkovery digital learning' title='a propos equipe production thinkovery'>";
		    		echo apply_filters( 'bj_lazy_load_html', $img4 );
		    	?>
		    </div><div class='about-img-wrapper'>
		    	<div class='about-img about-img5'>
		    		<?php
		    			$img5 = "<img src='" . get_template_directory_uri() . "/layoutImg/thinkovery-agence-digital-learning-reunion-a-propos.jpg' alt='photo reunion thinkovery digital learning' title='a propos reunion agence thinkovery'>";
		    			echo apply_filters( 'bj_lazy_load_html', $img5 );
		    		?>
		    		<svg class='icon hoop' style='fill:url(<?php echo $currentUrl; ?>#gradient-hoop)'><use xlink:href='#icon-hoop'/></svg>
		    	</div>
		    	<div class='about-img about-img6 animateOnScroll'>
		    		<?php
		    			$img6 = "<img src='" . get_template_directory_uri() . "/layoutImg/thinkovery-agence-digital-learning-equipe-dlm-a-propos.jpg' alt='photo equipe digital learning manager thinkovery' title='a propos equipe digital learning manager thinkovery'>";
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
		    		$img7 = "<img src='" . get_template_directory_uri() . "/layoutImg/thinkovery-agence-digital-learning-equipe-creation-a-propos.jpg' alt='photo equipe creation thinkovery digital learning' title='a propos equipe creation thinkovery digital learning'>";
		    		echo apply_filters( 'bj_lazy_load_html', $img7 );
		    	?>
		    	<svg class='icon hoop' style='fill:url(<?php echo $currentUrl; ?>#gradient-hoop)'><use xlink:href='#icon-hoop-thin'/></svg>
		    	<div class='mask'></div>
		    </div>
		
		</div>

	<?php else : ?>

		<div class='container'>
		    <h1>404</h1>
		</div>

	<?php endif; ?>


<?php get_footer(); ?>

<?php
/*
Template Name: Solutions
*/

get_header(); ?>

	<?php if ( have_posts() ) : the_post(); ?>

		<?php
			$imgMeta = wp_get_attachment_metadata( get_post_thumbnail_id() );
			$imgWidth = $imgMeta['width'];
			$imgHeight = $imgMeta['height'];
		?>

		<header class='solutions-header' style='background-image:url(<?php echo wp_get_attachment_url(get_field('img1')); ?>)' id='solutions-header' data-img-width='<?php echo $imgWidth; ?>' data-img-height='<?php echo $imgHeight; ?>'>
			<?php the_post_thumbnail(); ?>
			<div class='container'>
				<div class='container-medium'>
					<div class='solutions-intro hasParallax' data-parallax-strength='2.5'>
						<span class='subtitle'><?php the_field('subtitle'); ?></span>
						<h1><strong><?php the_field('title1_1'); ?> </strong><?php the_field('title1_2'); ?></h1>
						<p><?php the_field('intro'); ?></p>
					</div>
				</div>
			</div>
			<svg class='icon hoop hasParallax' data-parallax-strength='1.5' style='top:<?php the_field('circleY') ?>px;left:<?php the_field('circleX') ?>px;width:<?php the_field('circleWidth'); ?>px;height:<?php the_field('circleWidth'); ?>px;fill:url(<?php echo $currentUrl; ?>#gradient-hoop')' data-x='<?php the_field('circleX') ?>' data-y='<?php the_field('circleY') ?>'>
			        <use xlink:href='#icon-hoop-thin'/>
			</svg>
			<div class='solutions-cover hasParallax' data-parallax-strength='2' style='background-image:url(<?php echo wp_get_attachment_url(get_field('img')); ?>)'></div>
		</header>

		<section class='solutions clearfix'>
			<div class='container'>
				<div class='container-medium'>
					<h2><?php the_field('title2'); ?></h2>
					<?php the_field('txt'); ?>
				</div>

				<?php if( have_rows('items') ): ?>
					<ul class='solutions-list'>
						<?php while( have_rows('items') ){ the_row(); ?>
							<li>
								<h3><?php the_sub_field('title'); ?></h3>
								<p><?php the_sub_field('txt'); ?></p>
								<div class='img'>
									<?php echo wp_get_attachment_image( get_sub_field('img') ); ?>
								</div>
								<svg class='icon hoop' style='fill:url(<?php echo $currentUrl; ?>#gradient-hoop)'><use xlink:href='#icon-hoop-thin'/></svg>
							</li>
						<?php } ?>
					</ul>
				<?php endif; ?>

				<?php if(get_field('title3')){ ?>
					<div class='tools'>
						<h2><?php the_field('title3'); ?></h2>
						<?php the_field('txt3'); ?>
					</div>
				<?php } ?>
			</div>
		</section>

		<?php if( have_rows('tools') ): ?>
		    <section class='container-sliders slider-learn right-aligned'>
		        <div class='wrapper-sliders'>
		            <div class='slider'>
		                <ul class='slides'>
		                    <?php while( have_rows('tools') ){ the_row(); ?><li>
		                        <?php echo wp_get_attachment_image(get_sub_field('img'), 'medium'); ?>
		                        <div class='slide-desc'>
		                            <div class='slide-title'><?php the_sub_field('title'); ?></div>
		                            <div class='slide-content'><?php the_sub_field('txt'); ?></div>
		                        </div>
		                    </li><?php } ?>
		                </ul>
		            </div>
		        </div>
		        <svg class='icon hoop' style='fill:url(<?php echo $currentUrl; ?>#gradient-hoop)'><use xlink:href='#icon-hoop-very-thin'/></svg>
		    </section>
		<?php endif; ?>

	<?php else : ?>

	    <div class='container'><h1>404</h1></div>

	<?php endif; ?>

<?php get_footer(); ?>

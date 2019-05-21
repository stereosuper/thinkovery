<?php 
/*
Template Name: Offers
*/

get_header(); ?>

<div class='container'>

	<?php if ( have_posts() ) : the_post(); ?>

		<h1 class='offers-title'><?php the_title(); ?></h1>
		<?php the_content(); ?>

		<?php if( have_rows('menu') ) : ?>
			<ul class='offers-menu'>
			<?php while( have_rows('menu') ) : the_row(); ?>
				<li>
					<a href='#<?php the_sub_field('anchor'); ?>'>
						<?php the_sub_field('name'); ?>
					</a>
				</li>
			<?php endwhile; ?>
			</ul>
		<?php endif; ?>

		<?php if( have_rows('section') ) : $count = 0; ?>
			<?php while( have_rows('section') ) : the_row(); $count++; ?>
				<div id='<?php the_sub_field('anchor'); ?>' class='offer offer-<?php echo $count; ?>'>
					<div class='offers-text'>
						<div class='offer-text'>
							<?php the_sub_field('text'); ?>
						</div>
						<?php if( get_sub_field('text2') ) : ?>
							<div class='offer-text2'>
								<?php the_sub_field('text2'); ?>
							</div>
						<?php endif; ?>
					</div>

					<?php if( have_rows('columns') ) : ?>
						<div class='offer-cols'>
							<?php while( have_rows('columns') ) : the_row(); ?>
								<div class='offer-col'>
									<?php the_sub_field('text'); ?>
								</div>
							<?php endwhile; ?>
						</div>
					<?php endif; ?>

					<?php echo wp_get_attachment_image(get_sub_field('img'), 'full'); ?>
				</div>
			<?php endwhile; ?>
		<?php endif; ?>
	
	<?php endif; ?>

</div>

<?php get_footer(); ?>

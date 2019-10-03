<?php 
/*
Template Name: Offers
*/

get_header(); ?>

<div class='container' id='offers'>

	<?php if ( have_posts() ) : the_post(); ?>

		<h1 class='offers-title'><?php the_title(); ?></h1>
		<?php the_content(); ?>

		<?php if( have_rows('menu') ) : ?>
			<div class="offers-menu sidebar" id="offers-menu">
				<ul class="container">
					<?php while( have_rows('menu') ) : the_row(); ?>
						<li>
							<a id="anchor-<?php the_sub_field('anchor'); ?>" href='#<?php the_sub_field('anchor'); ?>'>
								<svg class="icon"><use xlink:href="#icon-<?php the_sub_field('icon'); ?>"/></svg>
								<?php the_sub_field('name'); ?>
							</a>
						</li>
					<?php endwhile; ?>
				</ul>
			</div>
		<?php endif; ?>

		<?php if( have_rows('section') ) : $count = 0; ?>
			<div class='offers'>
				<?php while( have_rows('section') ) : the_row(); $count++; ?>
					<div id='<?php the_sub_field('anchor'); ?>' class='offer offer-<?php echo $count; ?>' data-io="updateOffersMenu">
						<div class='offers-text'>
							<div class='offer-text'>
								<?php the_sub_field('text'); ?>
							</div>
							<?php echo wp_get_attachment_image(get_sub_field('img'), 'full'); ?>
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


						<?php if($link = get_sub_field('link')): ?>
							<div class='btn-container'>
								<div class='wrapper-btn'>
									<a href='<?php echo $link['url']; ?>' class='btn-invert btn-<?php echo ($count - 1) % 4 + 1; ?>'>
										<?php echo $link['title']; ?>
										<svg class="icon"><use xlink:href="#icon-arrow"></use></svg>
										<div class="departure">
											<div class='top'></div><div class='right'></div><div class='bot'></div><div class='left'></div>
										</div>
										<div class="arrival">
											<div class='top'></div><div class='right'></div><div class='bot'></div><div class='left'></div>
										</div>
									</a>
								</div>
							</div>
						<?php endif; ?>
					</div>
				<?php endwhile; ?>
			</div>
		<?php endif; ?>
	
	<?php endif; ?>

</div>

<?php get_footer(); ?>

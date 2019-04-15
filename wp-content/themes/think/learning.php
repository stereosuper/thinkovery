<?php 
/*
Template Name: Learning Experience
*/

get_header(); ?>

<div class='container'>

	<?php if ( have_posts() ) : the_post(); ?>

		<div class='intro-big'>
			<p><?php the_field('intro'); ?></p>
			<h1 class='h2'><?php the_title(); ?></h1>
			<?php the_content(); ?>
		</div>

		<?php $elts = get_field('elements'); if( $elts['title'] ) : ?>
			<h2 class='learning-elts-title'><?php echo $elts['title']; ?></h2>
		<?php endif; ?>

		<?php if( have_rows('elements') ): ?>
			<div class='learning-elts'>
				<?php while ( have_rows('elements') ): the_row(); ?>
					<?php if( have_rows('items') ): ?>
						<?php while ( have_rows('items') ) : the_row(); ?>
							<div>
								<h3><?php the_sub_field('title'); ?></h3>
								<p><?php the_sub_field('text'); ?></p>
							</div>
						<?php endwhile; ?>
					<?php endif; ?>
				<?php endwhile; ?>
			</div>
		<?php endif; ?>
		
		<div class='learning-anim-container'>
			<div class='learning-anim-wrapper'>
				<div class='learning-anim' id='learning-anim'>
					<svg class='shape'><use xlink:href='#icon-drop'/></svg>
					<svg class='shape'><use xlink:href='#icon-square'/></svg>
					<svg class='shape'><use xlink:href='#icon-triangle'/></svg>
					<svg class='shape'><use xlink:href='#icon-rectangle'/></svg>
					<svg class='shape'><use xlink:href='#icon-circle'/></svg>

					<svg class='border' viewBox="0 0 372 372" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="185.771" cy="186.186" r="184.955" stroke="#AEAEAE" stroke-dasharray="10 10"/>
					</svg>
					<svg viewBox="0 0 372 372" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="185.771" cy="186.186" r="184.955" stroke="#AEAEAE" stroke-dasharray="10 10"/>
					</svg>
					<svg class='circle' width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M35.8828 71.0468C16.442 71.0468 0.680664 55.2846 0.680664 35.8438C0.680664 16.4011 16.442 0.640747 35.8828 0.640747C55.3254 0.640747 71.0867 16.4011 71.0867 35.8438C71.0867 55.2846 55.3254 71.0468 35.8828 71.0468ZM36.2671 11.7325C22.9192 11.7325 12.098 22.6734 12.098 36.1697C12.098 49.666 22.9192 60.6086 36.2671 60.6086C49.6149 60.6086 60.4343 49.666 60.4343 36.1697C60.4343 22.6734 49.6149 11.7325 36.2671 11.7325Z" fill="#1E5E32"/>
					</svg>
				</div>
			</div>
			<div><?php the_field('animationText'); ?></div>
		</div>

		<div class='learning-bottom'>
			<div><?php the_field('bottomText'); ?></div>
		</div>
	
	<?php endif; ?>

</div>

<?php get_footer(); ?>

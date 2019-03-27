<?php get_header(); ?>

<div class='container'>

	<?php if ( have_posts() ) : the_post(); ?>

		<div class='col-3-desk'>
			<h1><?php the_title(); ?></h1>
			<?php the_content(); ?>
		</div>
	
	<?php endif; ?>

</div>

<?php get_footer(); ?>
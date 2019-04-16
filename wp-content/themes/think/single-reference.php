<?php get_header(); ?>

<article class='container'>

	<?php if ( have_posts() ) : the_post(); ?>

		<?php the_post_thumbnail(); ?>	

		<?php echo wp_get_attachment_image(get_field('logo'), 'full'); ?>

		<h1><?php the_title(); ?></h1>

		<?php the_content(); ?>

	<?php else : ?>
				
		<h1>404</h1>

	<?php endif; ?>

</article>

<?php get_footer(); ?>

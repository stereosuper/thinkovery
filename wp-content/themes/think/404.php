<?php get_header(); ?>

<div class='container-404 container'>

	<h1><?php the_field('404title', 'options'); ?></h1>
	<?php the_field('404text', 'options'); ?>

	<div class='memory-wrapper'>
		<div class='memory' id='memory'></div>

		<div class='memory-success' id='memory-success'>
			<?php the_field('404game', 'options'); ?>
		</div>
	</div>
</div>

<?php get_footer(); ?>
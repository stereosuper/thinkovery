<?php get_header(); ?>

	<div class='container'>
		<div class='container-small'>
	        <?php if ( have_posts() ) : the_post(); ?>

	            <h1><?php the_title(); ?></h1>

	            <?php if(get_field('intro')){ ?>
	                <div class='intro'><?php the_field('intro'); ?></div>
	            <?php } ?>

	            <?php the_content(); ?>

	        <?php else : ?>

	            <h1>404</h1>

	        <?php endif; ?>
        </div>
    </div>

<?php get_footer(); ?>

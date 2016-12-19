<?php
/*
Template Name: About
*/

get_header(); ?>

	<div class='container'>
		<div class='container-small'>
	        <?php if ( have_posts() ) : the_post(); ?>

	            <h1><?php the_title(); ?></h1>

	            <h2><?php the_field('title1'); ?></h2>
	            <?php the_field('txt1'); ?>

	            <h2><?php the_field('title2'); ?></h2>
	            <?php the_field('txt2'); ?>

	            <h2><?php the_field('title3'); ?></h2>
	            <?php the_field('txt3'); ?>

	        <?php else : ?>

	            <h1>404</h1>

	        <?php endif; ?>
        </div>
    </div>

<?php get_footer(); ?>

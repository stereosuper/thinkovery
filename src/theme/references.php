<?php
/*
Template Name: References
*/

get_header(); ?>

    <?php if ( have_posts() ) : the_post(); ?>

        <section class='container'>
            <h1><?php the_title(); ?></h1>
        </section>

        <section>
            <div class='container'>
                <h2><?php the_field('logosTitle'); ?></h2>
            </div>
        </section>

    <?php else : ?>

        <div class='container'>
            <h1>404</h1>
        </div>

    <?php endif; ?>

<?php get_footer(); ?>

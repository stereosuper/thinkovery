<?php
/*
Template Name: References
*/

get_header(); ?>

    <?php if ( have_posts() ) : the_post(); ?>

        <section class='container'>
            <h1><?php the_title(); ?></h1>

            <?php if( have_rows('cases') ):

                while ( have_rows('cases') ) : the_row(); ?>

                    <?php echo wp_get_attachment_image( get_sub_field('img') ); ?>
                    <h2><?php the_sub_field('title'); ?></h2>
                    <?php the_sub_field('txt'); ?>
                    <?php if(get_sub_field('link')){ ?>
                        <a href='<?php the_sub_field('link') ?>'><?php _e('En savoir plus', 'thinkovery'); ?></a>
                    <?php } ?>

                <?php endwhile;

            endif; ?>

            <?php if( have_rows('quotes') ):

                while ( have_rows('quotes') ) : the_row(); ?>

                    <blockquote>
                        <p><?php the_sub_field('quote'); ?></p>
                        <footer><?php the_sub_field('author'); ?></footer>
                    </blockquote>
                    <?php echo wp_get_attachment_image( get_sub_field('img') ); ?>

                <?php endwhile;

            endif; ?>
        </section>

        <section>
            <div class='container'>
                <h2><?php the_field('logosTitle'); ?></h2>

                <?php if( have_rows('logos') ): ?>
                    <ul>
                        <?php while ( have_rows('logos') ) : the_row(); ?>

                            <li><?php echo wp_get_attachment_image( get_sub_field('img') ); ?></li>

                        <?php endwhile; ?>
                    </ul>

                <?php endif; ?>
            </div>
        </section>

    <?php else : ?>

        <div class='container'>
            <h1>404</h1>
        </div>

    <?php endif; ?>

<?php get_footer(); ?>

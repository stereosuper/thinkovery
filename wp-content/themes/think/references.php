<?php 
/*
Template Name: Reference
*/

get_header(); ?>

<div class='container'>

	<?php if ( have_posts() ) : the_post(); ?>

        <h1><?php the_title(); ?></h1>
        <div class='col-2-desk'><?php the_content(); ?></div>
        
        <?php $refQuery = new WP_Query( array('post_type' => 'reference') ); ?>

        <?php if ( $refQuery->have_posts() ) : ?>
            <ul class='reference-list'>
                <?php while ( $refQuery->have_posts() ) : $refQuery->the_post(); ?>
                    <li class='reference-item'>
                        <a href='<?php the_permalink(); ?>' title='<?php the_title(); ?>'>
                            <?php echo wp_get_attachment_image(get_field('logo'), 'full'); ?>
                        </a>
                    </li>
                <?php endwhile; ?>
            </ul>
            <?php wp_reset_postdata(); ?>
        <?php endif; ?>
	
	<?php endif; ?>

</div>

<?php get_footer(); ?>

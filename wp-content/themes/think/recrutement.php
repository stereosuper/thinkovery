<?php 
/*
Template Name: Recrutement
*/

get_header(); ?>

<div class='container clearfix'>
    
    <?php if( have_posts() ): the_post(); ?>

        <h1><?php the_title(); ?></h1>

        <div class='editor'>
            <?php the_content(); ?>

            <?php $jobsQuery = new WP_Query(array('post_type' => 'job', 'posts_per_page' => -1));
            if( $jobsQuery->have_posts() ): ?>
                <h2 class='medium center job-accordion-title'><?php _e("Job offers", 'think'); ?></h2>
                <?php while( $jobsQuery->have_posts() ): $jobsQuery->the_post(); ?>
                    <div class="wp-block-stereoberg-question-answer medium job-accordion">
                        <h3><?php the_title(); ?></h3>
                        <div class="answer js-answer">
                            <div class='answer-content'>
                                <?php the_content(); ?>
                            </div>
                        </div>
                    </div>
                <?php endwhile; wp_reset_postdata(); ?>
            <?php endif; ?>
        </div>

    <?php endif; ?>
    
</div>

<?php get_footer(); ?>

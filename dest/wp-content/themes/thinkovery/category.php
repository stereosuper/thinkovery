<?php get_header(); ?>

    <div class='container'>
        <p><?php _e('Category', 'thinkovery'); ?>
        <h1><?php echo single_cat_title(); ?></h1>
        <?php get_search_form(); ?>

        <?php if ( have_posts() ) : ?>

            <?php
                while ( have_posts() ) :
                    the_post();
                    get_template_part('includes/post');
                endwhile;
            ?>

            <div class='pagination'>
                <?php echo paginate_links( array( 'prev_text' => __('Previous page', 'thinkovery'), 'next_text'  => __('Next page', 'thinkovery') ) ); ?>
            </div>

        <?php else : ?>

            <p><?php _e('No posts yet!', 'thinkovery'); ?></p>

        <?php endif; ?>
    </div>

<?php get_footer(); ?>

<?php get_header(); ?>

    <div class='container'>
        <div class='container-small'>
            <p><?php _e('Category', 'thinkovery'); ?>
            <h1><?php echo single_cat_title(); ?></h1>
            <?php get_search_form(); ?>
        </div>

        <section class='posts-list'>
            <?php if ( have_posts() ) : ?>

                <?php
                    global $countPost, $formatLink;
                    $countPost = 0;
                    while ( have_posts() ) :
                        the_post();
                        $formatLink = get_post_format() === 'link' ? true : false;
                        get_template_part('includes/post');
                        if(!$formatLink){
                            $countPost ++;
                        }
                    endwhile;
                ?>

                <div class='pagination'>
                    <?php echo paginate_links( array( 'prev_text' => __('Previous page', 'thinkovery'), 'next_text'  => __('Next page', 'thinkovery') ) ); ?>
                </div>

            <?php else : ?>

                <p><?php _e('No posts yet!', 'thinkovery'); ?></p>

            <?php endif; ?>
        </section>
    </div>

<?php get_footer(); ?>

<?php get_header(); ?>

    <div class='container'>
        <div class='container-small'>
            <p class='subtitle'><?php _e('Category', 'thinkovery'); ?>
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
                    <?php echo paginate_links( array( 'prev_text' => __('Previous page', 'thinkovery') . "<svg class='icon'><use xlink:href='#icon-arrow-left'/></svg>", 'next_text'  => __('Next page', 'thinkovery') . "<svg class='icon'><use xlink:href='#icon-arrow-right'/></svg>", 'end_size' => 2, 'mid_size' => 0 ) ); ?>
                </div>

            <?php else : ?>

                <p><?php _e('No posts yet!', 'thinkovery'); ?></p>

            <?php endif; ?>
        </section>
    </div>

<?php get_footer(); ?>

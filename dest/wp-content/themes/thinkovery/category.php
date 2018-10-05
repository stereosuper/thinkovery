<?php get_header(); ?>

    <div class='container'>

        <div class='grid category-header'>
			<div class='col-3 search-params'>
				<a href='<?php echo get_permalink( get_option( 'page_for_posts' ) ); ?>' title='<?php the_field('blogTitle', 'options'); ?>' class='back-link-blog'><?php the_field('blogTitle', 'options'); ?></a>
				<?php get_search_form(); ?>
			</div>
			<div class='col-8 container-small'>
                <p class='subtitle'><?php _e('Category', 'thinkovery'); ?>
                <h1><?php echo single_cat_title(); ?></h1>
			</div>
		</div>

        <section class='posts-list'>
            <?php if ( have_posts() ) : ?>
                <div class='grid'>
                    <?php
                        global $countPost, $formatLink;
                        $countPost = 0;
                        while ( have_posts() ) :
                            the_post();
                            $formatLink = get_post_format() === 'link' ? true : false;
                            echo "<div class='col-4 post-ratio-m'>";
                                get_template_part('includes/post');
                            echo "</div>";
                            if(!$formatLink){
                                $countPost ++;
                            }
                        endwhile;
                    ?>
                </div>
                <div class='pagination'>
                    <?php echo paginate_links( array( 'prev_text' => __('Previous page', 'thinkovery') . "<svg class='icon'><use xlink:href='#icon-arrow-left'/></svg>", 'next_text'  => __('Next page', 'thinkovery') . "<svg class='icon'><use xlink:href='#icon-arrow-right'/></svg>", 'end_size' => 2, 'mid_size' => 0 ) ); ?>
                </div>

            <?php else : ?>

                <p><?php _e('No posts yet!', 'thinkovery'); ?></p>

            <?php endif; ?>
        </section>
    </div>

<?php get_footer(); ?>

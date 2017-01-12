<?php
/*
Template Name: References
*/

get_header(); ?>

    <?php if ( have_posts() ) : the_post(); ?>

        <section class='container'>
            <div class='container-small'><h1><?php the_title(); ?></h1></div>

            <?php if( have_rows('cases') ): $count = 0;

                while ( have_rows('cases') ) : the_row(); $count ++; ?>

                    <div class='study-case <?php if($count % 2 === 0) echo 'study-case-odd'; ?>'>

                        <div class='case'>
                            <div class='img <?php if(get_sub_field('video')) echo 'wrapper-video'; ?>'>
                                <?php if(get_sub_field('video')){ ?>
                                    <div>
                                        <iframe src='<?php the_sub_field('video'); ?>?enablejsapi=1&html5=1' frameborder='0' allowfullscreen></iframe>
                                        <div class='cover-video' style='background-image:url(<?php echo wp_get_attachment_url(get_sub_field('img')); ?>)'>
                                            <svg class='icon hoop' style='fill:url(<?php echo $currentUrl; ?>#gradient-hoop)'><use xlink:href='#icon-hoop-thin'/></svg>
                                        </div>
                                    </div>
                                <?php }else{ echo wp_get_attachment_image( get_sub_field('img'), 'full' ); } ?>
                            </div>
                            <div class='study-content'>
                                <b class='study-subtitle'><?php _e('Case study', 'thinkovery'); ?> n°<?php echo $count; ?></b>
                                <h2 class='animateOnScroll'><?php the_sub_field('title'); ?></h2>
                                <?php the_sub_field('txt'); ?>
                                <?php if(get_sub_field('link')){ ?>
                                    <a href='<?php the_sub_field('link') ?>' class='btn-small'>
                                        <?php _e('Read more on our blog', 'thinkovery'); ?><svg class='icon'><use xlink:href='#icon-arrow-right'/></svg>
                                    </a>
                                <?php } ?>
                            </div>
                        </div>
                        <?php if(get_sub_field('quote')){ ?>
                            <div class='study-quote'>
                                <blockquote>
                                    <p><?php the_sub_field('quote'); ?></p>
                                </blockquote>
                                <div class='quote-img'>
                                    <?php echo wp_get_attachment_image( get_sub_field('quoteImg') ); ?>
                                </div>
                                <p class='quote-cite animateOnScroll'>
                                    <?php the_sub_field('quoteAuthor'); ?>
                                    <b><?php the_sub_field('quoteJob'); ?></b>
                                </p>
                            </div>
                        <?php } ?>

                    </div>

                <?php endwhile;

            endif; ?>
        </section>

        <section class='study-logos'>
            <div class='container'>
                <h2><?php the_field('logosTitle'); ?></h2>
            </div>

            <?php if( have_rows('logos') ): ?>
                <div class='container-sliders slider-logos'>
                    <div class='wrapper-sliders'>
                        <div class='slider'>
                            <ul class='slides'>
                                <?php while( have_rows('logos') ){ the_row(); ?><li>
                                    <div class='img'>
                                        <?php echo wp_get_attachment_image( get_sub_field('img'), 'medium' ); ?>
                                    </div>
                                    <div class='slide-desc'>
                                        <div class='slide-title'><?php the_sub_field('name'); ?></div>
                                        <div class='slide-content'><?php the_sub_field('txt'); ?></div>
                                    </div>
                                </li><?php } ?>
                            </ul>
                        </div>
                    </div>
                    <svg class='icon hoop' style='fill:url(<?php echo $currentUrl; ?>#gradient-hoop)'><use xlink:href='#icon-hoop-thin'/></svg>
                </div>
            <?php endif; ?>
        </section>

    <?php else : ?>

        <div class='container'>
            <h1>404</h1>
        </div>

    <?php endif; ?>

<?php get_footer(); ?>

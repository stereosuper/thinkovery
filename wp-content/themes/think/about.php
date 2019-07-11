<?php 
/*
Template Name: Qui sommes-nous
*/

get_header(); ?>

<div class='container clearfix'>
    
    <?php if( have_posts() ): the_post(); ?>

        <h1><?php the_title(); ?></h1>

        <?php if( have_rows('section1')) : $section1 = get_field('section1'); ?>
            <section class='about-section1'>
                <div class='content'>
                    <h2><?php echo $section1['title']; ?></h2>
                    <?php echo $section1['text']; ?>
                </div>
                <div class='content'><?php echo wp_get_attachment_image($section1['img'], 'large'); ?></div>
            </section>
        <?php endif; ?>

        <?php if( have_rows('section2')) : $section2 = get_field('section2'); ?>
            <section class='about-section2'>
                <div class='content'>
                    <h2><?php echo $section2['title']; ?></h2>
                    <?php echo $section2['text']; ?>
                </div>
                <div class='content'>
                    <?php echo wp_get_attachment_image($section2['img'], 'large'); ?>
                    <?php echo wp_get_attachment_image($section2['imgSmall'], 'medium'); ?>
                </div>
            </section>
        <?php endif; ?>

        <?php if( have_rows('section3')) : $section3 = get_field('section3'); ?>
            <section class='about-section3'>
                <div class='content'>
                    <h2><?php echo $section3['title']; ?></h2>
                    <?php echo $section3['text']; ?>
                </div>
                <?php 
                $is_video = $section3['image_or_video'];
                ?>
                <?php if( $is_video && $section3['video'] ) : ?>
                    <div class='wp-block-stereoberg-video js-video-vimeo video' data-id='<?php echo $section3['video']; ?>'>
                        <div id="vimeo-id-<?php echo $section3['video']; ?>" class="iframe"></div>
                        <button class="cross js-cross" type="button">
                            <span class="cross-line first-cross-line"></span>
                            <span class="cross-line second-cross-line"></span>
                        </button>
                        <div class="cover" style="background-image:url(<?php echo $section3['video_cover']['url']; ?>)"></div>
                        <div class="play"></div>
                        <button class="cross js-cross" type="button"><span class="cross-line first-cross-line"></span><span class="cross-line second-cross-line"></span></button>
                        <div class="player-background js-cross"></div>
                    </div>
                <?php endif; ?>
                <?php if( !$is_video && $section3['img'] ) : ?>
                    <div class="wp-block-image">
                        <figure class="aligncenter">
                            <?php echo wp_get_attachment_image($section3['img']['ID'], 'large'); ?>
                        </figure>
                    </div>
                <?php endif; ?>
            </section>
        <?php endif; ?>

        <?php if( have_rows('section4')) : $section4 = get_field('section4'); ?>
            <section class='about-section4'>
                <div class='content'>
                    <h2><?php echo $section4['title']; ?></h2>
                    <?php echo $section4['text']; ?>
                    
                    <?php $btn = $section4['btn']; if( $btn ) : ?>
                        <a href="<?php echo $section4['btn']['url']; ?>" class="btn-invert btn-2">
                            <?php echo $section4['btn']['title']; ?>
                            <svg class="icon"><use xlink:href="#icon-arrow"></use></svg>
                            <div class="departure">
                                <div class="top"></div><div class="right"></div><div class="bot"></div><div class="left"></div>
                            </div>
                            <div class="arrival">
                                <div class="top"></div><div class="right"></div><div class="bot"></div><div class="left"></div>
                            </div>
                        </a>
                    <?php endif; ?>
                </div>
            </section>
        <?php endif; ?>

    <?php endif; ?>
    
</div>

<?php get_footer(); ?>

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
                <div>
                    <h2><?php echo $section1['title']; ?></h2>
                    <?php echo $section1['text']; ?>
                </div>
                <div><?php echo wp_get_attachment_image($section1['img'], 'large'); ?></div>
            </section>
        <?php endif; ?>

        <?php if( have_rows('section2')) : $section2 = get_field('section2'); ?>
            <section class='about-section2'>
                <div>
                    <h2><?php echo $section2['title']; ?></h2>
                    <?php echo $section2['text']; ?>
                </div>
                <div>
                    <?php echo wp_get_attachment_image($section2['img'], 'large'); ?>
                    <?php echo wp_get_attachment_image($section2['imgSmall'], 'medium'); ?>
                </div>
            </section>
        <?php endif; ?>

        <?php if( have_rows('section3')) : $section3 = get_field('section3'); ?>
            <section class='about-section3'>
                <div>
                    <h2><?php echo $section3['title']; ?></h2>
                    <?php echo $section3['text']; ?>
                </div>
            </section>
        <?php endif; ?>

        <?php if( have_rows('section4')) : $section4 = get_field('section4'); ?>
            <section class='about-section4'>
                <div>
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

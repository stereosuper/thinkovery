<?php get_header(); ?>

<div class='container'>

    <?php if ( have_posts() ) : the_post(); ?>
    
		<header id="home-intro" class="home-header" data-io="updateBorder">
            <?php $title = get_field('title'); ?>
            <h1>
                <?php echo $title['green'] ? $title['green'] . '<span>' . $title['black'] . '</span>' : get_the_title(); ?>
            </h1>

            <?php $video = get_field('video'); ?>
        </header>

        <?php if( have_rows('sections') ) : $count = 0; ?>
            <?php while( have_rows('sections') ) : the_row(); $count ++; ?>
                <section id="<?php the_sub_field('id'); ?>" class="home-section" data-io="updateBorder">
                    <div class='wrapper-img'>
                        <?php echo wp_get_attachment_image( get_sub_field('img'), 'full' ); ?>
                    </div>
                    
                    <div class='section-content'>
                        <h2><?php the_sub_field('title'); ?></h2>
                        <?php the_sub_field('text'); ?>

                        <?php $btn = get_sub_field('btn'); if( $btn ): ?>
                            <div class='wrapper-btn'>
                                <a href='<?php echo $btn['url']; ?>' class='btn-invert btn-<?php echo $count; ?>'>
                                    <?php echo $btn['title']; ?>
                                    <svg class="icon"><use xlink:href="#icon-arrow"></use></svg>
                                    <div class='top'></div><div class='right'></div><div class='bot'></div><div class='left'></div>
                                </a>
                            </div>
                        <?php endif; ?>
                    </div>
                </section>
            <?php endwhile; ?>
        <?php endif; ?>

    <?php endif; ?>
    
</div>

<?php get_footer(); ?>
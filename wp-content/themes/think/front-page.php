<?php get_header(); ?>

<div class='container'>

    <?php if ( have_posts() ) : the_post(); ?>
    
		<header id="home-intro" class="home-header js-home-section" data-io="updateBorder" data-section-name="home-intro">
            <?php $video = get_field('video'); if( $video['id'] ) : ?>
                <div class='js-video video' data-id='<?php echo $video['id']; ?>' id='home-video'>
                    <?php $title = get_field('title'); ?>
                    <h1 class='video-title'>
                        <?php echo $title['green'] ? $title['green'] . '<span>' . $title['black'] . '</span>' : get_the_title(); ?>
                    </h1>
                    <div class="iframe"></div>
                    <button class="cross js-cross" type="button">
                        <span class="cross-line first-cross-line"></span>
                        <span class="cross-line second-cross-line"></span>
                    </button>
                    <div class="player-background js-cross" type="button"></div>
                    <div class="cover" style="background-image:url(<?php echo wp_get_attachment_url($video['img'], 'full'); ?>)"></div>
                    <div class='wrapper-player'><svg class="icon"><use xlink:href="#icon-player"></use></svg></div>
                </div>
            <?php endif; ?>
        </header>

        <?php if( have_rows('sections') ) : $count = 0; ?>
            <?php while( have_rows('sections') ) : the_row(); $count ++; ?>
            <?php 
            $section_id = get_sub_field('id');
            ?>
                <section id="<?php echo $section_id ?>" class="js-home-section home-section">
                    <div class='wrapper-img'>
                        <?php echo wp_get_attachment_image( get_sub_field('img'), 'full' ); ?>
                    </div>
                    
                    <div class='section-content' data-io="updateBorder" data-section-name="<?php echo $section_id ?>">
                        <h2><?php the_sub_field('title'); ?></h2>
                        <?php the_sub_field('text'); ?>

                        <?php $btn = get_sub_field('btn'); if( $btn ): ?>
                            <div class='wrapper-btn'>
                                <a href='<?php echo $btn['url']; ?>' class='btn-invert btn-<?php echo $count; ?>'>
                                    <?php echo $btn['title']; ?>
                                    <svg class="icon"><use xlink:href="#icon-arrow"></use></svg>
                                    <div class="departure">
                                        <div class='top'></div><div class='right'></div><div class='bot'></div><div class='left'></div>
                                    </div>
                                    <div class="arrival">
                                        <div class='top'></div><div class='right'></div><div class='bot'></div><div class='left'></div>
                                    </div>
                                </a>
                            </div>
                        <?php endif; ?>
                    </div>

                    <?php if($count === 1) : ?>
                        <div class='plane-path' id='plane-path'>
                            <div class='svg'>
                                <svg width="1122" height="650" viewBox="0 0 1122 650" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path mask='url(#dash)' d="M0.685547 289.931C60.7015 218.061 278.522 -5.23507 445.677 12.5474C654.62 34.7754 778.747 293.364 604 361.5C495 404 465.692 304.054 484.5 264.5C533 162.5 684.239 205.476 710.912 429.979C736.477 645.15 840.707 647 915 647C980.5 647 1030 634 1060.5 621.5" stroke="#AEAEAE"/>
                                    <mask id='dash'>
                                        <path d="M0.685547 289.931C60.7015 218.061 278.522 -5.23507 445.677 12.5474C654.62 34.7754 778.747 293.364 604 361.5C495 404 465.692 304.054 484.5 264.5C533 162.5 684.239 205.476 710.912 429.979C736.477 645.15 840.707 647 915 647C980.5 647 1030 634 1060.5 621.5" stroke="#fff" stroke-dasharray="10 10"/>
                                    </mask>
                                </svg>
                                <div class='plane' id='plane'></div>
                            </div>
                        </div>
                    <?php endif; ?>

                    <?php if($count === 3) : ?>
                        <svg class='shape s1'><use xlink:href='#icon-drop'/></svg>
                        <svg class='shape s2'><use xlink:href='#icon-square'/></svg>
                        <svg class='shape s3'><use xlink:href='#icon-square'/></svg>
                        <svg class='shape s4'><use xlink:href='#icon-triangle'/></svg>
                        <svg class='shape s5'><use xlink:href='#icon-triangle'/></svg>
                        <svg class='shape s6'><use xlink:href='#icon-triangle'/></svg>
                        <svg class='shape s7'><use xlink:href='#icon-rectangle'/></svg>
                        <svg class='shape s8'><use xlink:href='#icon-rectangle'/></svg>
                        <svg class='shape s9'><use xlink:href='#icon-rectangle'/></svg>
                        <svg class='shape s10'><use xlink:href='#icon-circle'/></svg>
                        <svg class='shape s11'><use xlink:href='#icon-circle'/></svg>
                    <?php endif; ?>

                    <?php if($count === 4) : ?>
                        <div class='morpion' id='morpion'>
                            <div class='vertical'></div>
                            <svg class='shape s1'><use xlink:href='#icon-drop'/></svg>
                            <svg class='shape s2'><use xlink:href='#icon-rectangle'/></svg>
                            <svg class='shape s3'><use xlink:href='#icon-rectangle'/></svg>
                            <svg class='shape s4'><use xlink:href='#icon-rectangle'/></svg>
                            <svg class='shape s5'><use xlink:href='#icon-circle'/></svg>
                        </div>
                    <?php endif; ?>
                </section>
            <?php endwhile; ?>
        <?php endif; ?>

    <?php endif; ?>
    
</div>

<?php get_footer(); ?>
<?php
/*
Template Name: Front Page
*/

get_header(); ?>

    <?php if ( have_posts() ) : the_post(); ?>

        <header>
            <div id='bloc-top'>
                <?php $count = 0; foreach($declis as $decli){ ?>
                    <div class='slide-home <?php if($count === 0) echo 'slide-on'; ?>' style='background-image:url("<?php echo wp_get_attachment_url($decli['homeImg'][0]); ?>")' data-color='<?php echo $decli['mainColor']; ?>'>
                        <strong style='z-index:<?php echo $decli['circlePlan']; ?>;left:<?php echo $decli['baselinePosX']; ?>px;top:<?php echo $decli['baselinePosY']; ?>' data-x='<?php echo $decli['baselinePosX']; ?>' data-y='<?php echo $decli['baselinePosY']; ?>' class='baseline'>
                            <span><?php echo $decli['title1']; ?></span><svg class='icon hoop' style='width:<?php echo $decli['circleWidth']; ?>px;height:<?php echo $decli['circleWidth']; ?>px'>
                                <use xlink:href='#icon-hoop'/>
                            </svg><span><?php echo $decli['title2']; ?></span>
                        </strong>
                        <span class='baseline-second'><span><?php echo $decli['title1']; ?></span> <span><?php echo $decli['title2']; ?></span></span>
                        <?php
                            $countImg = 0;
                            foreach($decli['homeImg'] as $img){
                                if($countImg > 0){ ?>
                                    <div style="background-image:url('<?php echo wp_get_attachment_url($currentDecli['homeImg'][$countImg]); ?>');z-index:<?php echo $countImg+1; ?>" class='slider-plans'></div>
                                <?php }
                                $countImg ++;
                            }
                        ?>
                    </div>
                <?php $count ++; } ?>
                <div id='slider-home-nav' class='theme-color'>
                    <button class='prev btn-small-back'><?php _e('Previous', 'Thinkovery'); ?><svg class='icon'><use xlink:href='#icon-arrow-left'/></svg></button>
                    <span><span class='current'>1</span>/<?php echo $count; ?></span>
                    <button class='next btn-small'><?php _e('Next', 'Thinkovery'); ?><svg class='icon'><use xlink:href='#icon-arrow-right'/></svg></button>
                </div>
            </div>
            <div id='bloc-revelation'>
                <div class='container'>
                    <div class='zone-txt align-right'>
                        <?php $count = 0; foreach($declis as $decli){ ?>
                            <div class='slide-home-txt <?php if($count === 0) echo 'txt-on'; ?>'>
                                <?php echo $decli['txt']; ?>
                            </div>
                        <?php $count ++; } ?>
                        <h1><?php the_title(); ?></h1>
                    </div>
                    <a href='<?php the_field('ctaLink'); ?>' class='btn'>
                        <?php the_field('ctaTxt'); ?><svg class='icon'><use xlink:href='#icon-arrow-right'/></svg><i></i>
                    </a>
                </div>
            </div>
        </header>

        <section id='mooc-spoc' class='container wrapper-blocs-half'>
            <div class='bloc-half'>
                <h2><?php the_field('section1Title1'); ?></h2>
                <?php the_field('section1Txt1'); ?>
                <?php if(get_field('section1Video1')){ ?>
                    <div class='wrapper-video'>
                        <iframe src='<?php the_field('section1Video1'); ?>?enablejsapi=1&html5=1' frameborder='0' allowfullscreen></iframe>
                        <div class='cover-video' style='background-image:url(<?php echo wp_get_attachment_url(get_field('section1Cover1')); ?>)'>
                            <svg class='icon hoop'><use xlink:href='#icon-hoop-thin'/></svg>
                        </div>
                    </div>
                <?php } ?>
            </div><div class='bloc-half'>
                <h2><?php the_field('section1Title2'); ?></h2>
                <?php the_field('section1Txt2'); ?>
                <?php if(get_field('section1Video2')){ ?>
                    <div class='wrapper-video'>
                        <iframe src='<?php the_field('section1Video2'); ?>?enablejsapi=1&html5=1' frameborder='0' allowfullscreen></iframe>
                        <div class='cover-video' style='background-image:url(<?php echo wp_get_attachment_url(get_field('section1Cover2')); ?>)'>
                            <svg class='icon hoop'><use xlink:href='#icon-hoop-thin'/></svg>
                        </div>
                    </div>
                <?php } ?>
            </div>
        </section>

        <section id='more-than-moocs' class='bg-black'>
            <div class='container wrapper-blocs-half'>
                <div class='bloc-half align-right'>
                    <h2><?php the_field('section2Title'); ?></h2>
                    <?php the_field('section2Txt'); ?>
                </div>
                <svg class='icon hoop'><use xlink:href='#icon-hoop'/></svg>
                <svg class='icon hoop'><use xlink:href='#icon-hoop'/></svg>
                <svg class='icon hoop'><use xlink:href='#icon-hoop'/></svg>
                <svg class='icon hoop'><use xlink:href='#icon-hoop'/></svg>
                <svg class='icon hoop'><use xlink:href='#icon-hoop'/></svg>
                <svg class='icon hoop'><use xlink:href='#icon-hoop'/></svg>
                <svg class='icon hoop'><use xlink:href='#icon-hoop'/></svg>
                <svg class='icon hoop'><use xlink:href='#icon-hoop'/></svg>
                <svg class='icon hoop'><use xlink:href='#icon-hoop'/></svg>
                <svg class='icon hoop'><use xlink:href='#icon-hoop'/></svg>
            </div>
        </section>

        <section id='digital-learning'>
            <div class='container'>
                <div class='container-small'>
                    <h2>
                        <?php the_field('section3Titre'); ?><?php if(get_field('section3displayLogo')){ ?><svg class='icon logo-in-title'>
                            <use xlink:href='#icon-logo-thinkovery'/>
                        </svg><?php } ?>
                    </h2>
                    <?php the_field('section3Txt'); ?>
                    <div class='bloc-with-picto'>
                        <h3><span class='title-picto'><svg class='icon profile'><use xlink:href='#icon-profile'/></svg></span><?php the_field('researchTitle'); ?></h3>
                        <?php the_field('researchTxt'); ?>
                    </div>
                </div>
            </div>

            <?php if( have_rows('researcher') ): ?>
                <div class='container-sliders' id='slider-learn-from-best'>
                    <div class='wrapper-sliders'>
                        <div class='slider'>
                            <ul class='slides'>
                                <?php while( have_rows('researcher') ){ the_row(); ?><li>
                                    <?php echo wp_get_attachment_image(get_sub_field('img')); ?>
                                    <div class='slide-desc'>
                                        <div class='slide-title'><?php the_sub_field('name'); ?></div>
                                        <div class='slide-content'><?php the_sub_field('job'); ?></div>
                                    </div>
                                </li><?php } ?>
                            </ul>
                        </div>
                    </div>
                    <svg class='icon hoop'><use xlink:href='#icon-hoop-thin'/></svg>
                </div>
            <?php endif; ?>

            <div class='container'>
                <div class='container-small'>
                    <div class='bloc-with-picto'>
                        <h3><span class='title-picto'><svg class='icon star'><use xlink:href='#icon-star'/></svg></span><?php the_field('expTitle'); ?></h3>
                        <?php the_field('expTxt'); ?>
                    </div>
                </div>
            </div>

            <div class='container-sliders' id='slider-best-way-learn'>
                <div class='wrapper-sliders'>
                    <div class='slider'>
                        <ul class='slides'>
                            <li>
                                <img src='<?php echo get_template_directory_uri(); ?>/img/photo1-learn.jpg'>
                                <div class='slide-desc'>
                                    <div class='slide-title'>
                                        Zup de CO
                                    </div>
                                    <div class='slide-content'>
                                        SPOC "Le tuto des tuteurs"
                                    </div>
                                </div>
                            </li><!--
                            --><li>
                                <img src='<?php echo get_template_directory_uri(); ?>/img/photo2-learn.jpg'>
                                <div class='slide-desc'>
                                    <div class='slide-title'>
                                        Zup de CO
                                    </div>
                                    <div class='slide-content'>
                                        SPOC "Le tuto des tuteurs"
                                    </div>
                                </div>
                            </li><!--
                            --><li>
                                <img src='<?php echo get_template_directory_uri(); ?>/img/photo3-learn.jpg'>
                                <div class='slide-desc'>
                                    <div class='slide-title'>
                                        Zup de CO
                                    </div>
                                    <div class='slide-content'>
                                        SPOC "Le tuto des tuteurs"
                                    </div>
                                </div>
                            </li><!--
                            --><li>
                                <img src='<?php echo get_template_directory_uri(); ?>/img/photo4-learn.jpg'>
                                <div class='slide-desc'>
                                    <div class='slide-title'>
                                        Zup de CO
                                    </div>
                                    <div class='slide-content'>
                                        SPOC "Le tuto des tuteurs"
                                    </div>
                                </div>
                            </li><!--
                            --><li>
                                <img src='<?php echo get_template_directory_uri(); ?>/img/photo5-learn.jpg'>
                                <div class='slide-desc'>
                                    <div class='slide-title'>
                                        Zup de CO
                                    </div>
                                    <div class='slide-content'>
                                        SPOC "Le tuto des tuteurs"
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <svg class='icon hoop'><use xlink:href='#icon-hoop-very-thin'/></svg>
            </div>
        </section>

    <?php else : ?>

        <div class='container'>
            <h1>404</h1>
        </div>

    <?php endif; ?>

<?php get_footer(); ?>

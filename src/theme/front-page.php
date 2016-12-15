<?php
/*
Template Name: Front Page
*/

echo $currentDecli['baselinePosX'] . $currentDecli['baselinePosY'] . $currentDecli['baselinePlan'];

get_header(); ?>

    <?php if ( have_posts() ) : the_post(); ?>

        <header>
            <div id='bloc-top' style='background-image:url("<?php echo wp_get_attachment_url($currentDecli['homeImg'][0]); ?>")'>
                <strong style='transform:translate3d(<?php echo $currentDecli['baselinePosX']; ?>px, <?php echo $currentDecli['baselinePosY']; ?>px, 0)' data-x='<?php echo $currentDecli['baselinePosX']; ?>' data-y='<?php echo $currentDecli['baselinePosY']; ?>' class='baseline'>
                    <span><?php echo $currentDecli['title1']; ?></span><svg class='icon hoop' style='width:<?php echo $currentDecli['circleWidth']; ?>px;height:<?php echo $currentDecli['circleWidth']; ?>px'>
                        <use xlink:href='#icon-hoop'/>
                    </svg><span><?php echo $currentDecli['title2']; ?></span>
                </strong>
                <span class='baseline-second'><?php echo $currentDecli['title1']; ?> <?php echo $currentDecli['title2']; ?></span>
                <?php
                    $countImg = 0;
                    foreach($currentDecli['homeImg'] as $img){
                        if($countImg > 0){ ?>
                            <div style="background-image: url('<?php echo wp_get_attachment_url($currentDecli['homeImg'][$countImg]); ?>')"></div>
                        <?php }
                        $countImg ++;
                    }
                ?>
            </div>
            <div id='bloc-revelation'>
                <div class='container'>
                    <div class='zone-txt align-right'>
                        <?php echo $currentDecli['txt']; ?>
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
                <div class='wrapper-video'>
                    <?php the_field('section1Video1'); ?>
                    <div class='cover-video' style='background-image: url(<?php echo get_template_directory_uri(); ?>/img/cover-video-1.jpg);'>
                        <svg class='icon hoop'><use xlink:href='#icon-hoop-thin'/></svg>
                    </div>
                </div>
            </div><div class='bloc-half'>
                <h2><?php the_field('section1Title2'); ?></h2>
                <?php the_field('section1Txt2'); ?>
                <div class='wrapper-video'>
                    <?php the_field('section1Video2'); ?>
                    <div class='cover-video' style='background-image: url(<?php echo get_template_directory_uri(); ?>/img/cover-video-2.jpg);'>
                        <svg class='icon hoop'><use xlink:href='#icon-hoop-thin'/></svg>
                    </div>
                </div>
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
                    <h2><?php the_field('section3Titre'); ?></h2>
                    <?php the_field('section3Txt'); ?>
                    <div class='bloc-with-picto'>
                        <h3><span class='title-picto'><svg class='icon profile'><use xlink:href='#icon-profile'/></svg></span><?php the_field('researchTitle'); ?></h3>
                        <?php the_field('researchTxt'); ?>
                    </div>
                </div>
            </div>
            <div class='container-sliders' id='slider-learn-from-best'>
                <div class='wrapper-sliders'>
                    <div class='slider'>
                        <ul class='slides'>
                            <li>
                                <img src='<?php echo get_template_directory_uri(); ?>/img/photo1.jpg'>
                                <div class='slide-desc'>
                                    <div class='slide-title'>
                                        Roland Lehoucq
                                    </div>
                                    <div class='slide-content'>
                                        Astrophysicien. Commissariat à l’énergie atomique et aux énergies alternatives
                                    </div>
                                </div>
                            </li><!--
                            --><li>
                                <img src='<?php echo get_template_directory_uri(); ?>/img/photo2.jpg'>
                                <div class='slide-desc'>
                                    <div class='slide-title'>
                                        Roland Lehoucq
                                    </div>
                                    <div class='slide-content'>
                                        Astrophysicien. Commissariat à l’énergie atomique et aux énergies alternatives
                                    </div>
                                </div>
                            </li><!--
                            --><li>
                                <img src='<?php echo get_template_directory_uri(); ?>/img/photo3.jpg'>
                                <div class='slide-desc'>
                                    <div class='slide-title'>
                                        Roland Lehoucq
                                    </div>
                                    <div class='slide-content'>
                                        Astrophysicien. Commissariat à l’énergie atomique et aux énergies alternatives
                                    </div>
                                </div>
                            </li><!--
                            --><li>
                                <img src='<?php echo get_template_directory_uri(); ?>/img/photo4.jpg'>
                                <div class='slide-desc'>
                                    <div class='slide-title'>
                                        Roland Lehoucq
                                    </div>
                                    <div class='slide-content'>
                                        Astrophysicien. Commissariat à l’énergie atomique et aux énergies alternatives
                                    </div>
                                </div>
                            </li><!--
                            --><li>
                                <img src='<?php echo get_template_directory_uri(); ?>/img/photo5.jpg'>
                                <div class='slide-desc'>
                                    <div class='slide-title'>
                                        Roland Lehoucq
                                    </div>
                                    <div class='slide-content'>
                                        Astrophysicien. Commissariat à l’énergie atomique et aux énergies alternatives
                                    </div>
                                </div>
                            </li><!--
                            --><li>
                                <img src='<?php echo get_template_directory_uri(); ?>/img/photo6.jpg'>
                                <div class='slide-desc'>
                                    <div class='slide-title'>
                                        Roland Lehoucq
                                    </div>
                                    <div class='slide-content'>
                                        Astrophysicien. Commissariat à l’énergie atomique et aux énergies alternatives
                                    </div>
                                </div>
                            </li><!--
                            --><li>
                                <img src='<?php echo get_template_directory_uri(); ?>/img/photo7.jpg'>
                                <div class='slide-desc'>
                                    <div class='slide-title'>
                                        Roland Lehoucq
                                    </div>
                                    <div class='slide-content'>
                                        Astrophysicien. Commissariat à l’énergie atomique et aux énergies alternatives
                                    </div>
                                </div>
                            </li><!--
                            --><li>
                                <img src='<?php echo get_template_directory_uri(); ?>/img/photo8.jpg'>
                                <div class='slide-desc'>
                                    <div class='slide-title'>
                                        Roland Lehoucq
                                    </div>
                                    <div class='slide-content'>
                                        Astrophysicien. Commissariat à l’énergie atomique et aux énergies alternatives
                                    </div>
                                </div>
                            </li><!--
                            --><li>
                                <img src='<?php echo get_template_directory_uri(); ?>/img/photo5.jpg'>
                                <div class='slide-desc'>
                                    <div class='slide-title'>
                                        Roland Lehoucq
                                    </div>
                                    <div class='slide-content'>
                                        Astrophysicien. Commissariat à l’énergie atomique et aux énergies alternatives
                                    </div>
                                </div>
                            </li><!--
                            --><li>
                                <img src='<?php echo get_template_directory_uri(); ?>/img/photo2.jpg'>
                                <div class='slide-desc'>
                                    <div class='slide-title'>
                                        Roland Lehoucq
                                    </div>
                                    <div class='slide-content'>
                                        Astrophysicien. Commissariat à l’énergie atomique et aux énergies alternatives
                                    </div>
                                </div>
                            </li><!--
                            --><li>
                                <img src='<?php echo get_template_directory_uri(); ?>/img/photo4.jpg'>
                                <div class='slide-desc'>
                                    <div class='slide-title'>
                                        Roland Lehoucq
                                    </div>
                                    <div class='slide-content'>
                                        Astrophysicien. Commissariat à l’énergie atomique et aux énergies alternatives
                                    </div>
                                </div>
                            </li><!--
                            --><li>
                                <img src='<?php echo get_template_directory_uri(); ?>/img/photo7.jpg'>
                                <div class='slide-desc'>
                                    <div class='slide-title'>
                                        Roland Lehoucq
                                    </div>
                                    <div class='slide-content'>
                                        Astrophysicien. Commissariat à l’énergie atomique et aux énergies alternatives
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <svg class='icon hoop'><use xlink:href='#icon-hoop-thin'/></svg>
            </div>
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

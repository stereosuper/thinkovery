<?php
/*
Template Name: Front Page
*/

get_header(); ?>

    <?php if ( have_posts() ) : the_post(); ?>

        <header>
            <div style='background-image:url("<?php echo wp_get_attachment_url($currentDecli['homeImg'][0]); ?>")'>
                <div class='container'>
                    <strong>
                        <span><?php echo $currentDecli['title1']; ?></span>
                        <span><?php echo $currentDecli['title2']; ?></span>
                    </strong>
                </div>
                <?php
                    $countImg = 0;
                    foreach($currentDecli['homeImg'] as $img){
                        if($countImg > 0){ ?>
                            <div style="background-image: url('<?php echo wp_get_attachment_url($declis[0]['homeImg'][$countImg]); ?>')"></div>
                        <?php }
                        $countImg ++;
                    }
                ?>
            </div>

            <div class='container'>
                <?php echo $currentDecli['txt']; ?>
                <h1><?php the_title(); ?></h1>
                <a href='<?php the_field('ctaLink'); ?>' class='btn'><?php the_field('ctaTxt'); ?></a>
            </div>
        </header>

        <section class='container'>
            <div>
                <h2><?php the_field('section1Title1'); ?></h2>
                <?php the_field('section1Txt1'); ?>
                <?php the_field('section1Video1'); ?>
            </div><div>
                <h2><?php the_field('section1Title2'); ?></h2>
                <?php the_field('section1Txt2'); ?>
                <?php the_field('section1Video2'); ?>
            </div>
        </section>

        <section>
            <div class='container'>
                <h2><?php the_field('section2Title'); ?></h2>
                <?php the_field('section2Txt'); ?>
            </div>
        </section>

        <section>
            <div class='container'>
                <h2><?php the_field('section3Titre'); ?></h2>
                <?php the_field('section3Txt'); ?>

                <h3><?php the_field('researchTitle'); ?></h3>
                <?php the_field('researchTxt'); ?>
            </div>
            <div class='container'>
                <h3><?php the_field('expTitle'); ?></h3>
                <?php the_field('expTxt'); ?>
            </div>
        </section>

    <?php else : ?>

        <div class='container'>
            <h1>404</h1>
        </div>

    <?php endif; ?>

<?php get_footer(); ?>

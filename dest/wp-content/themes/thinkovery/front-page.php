<?php
/*
Template Name: Front Page
*/

get_header(); ?>

    <?php if ( have_posts() ) : the_post(); ?>

        <?php
            $declisField = get_field('decli', 'options');
            $declis = [];
            $count = 0;
            foreach($declisField as $decli){
                $declis[$count]['mainColor'] = $decli['mainColor'];
                $declis[$count]['secondaryColor'] = $decli['secondaryColor'];
                $declis[$count]['title1'] = $decli['title1'];
                $declis[$count]['title2'] = $decli['title2'];
                $declis[$count]['txt'] = $decli['txt'];
                $declis[$count]['circlePosX'] = $decli['circlePosX'];
                $declis[$count]['circlePosY'] = $decli['circlePosY'];
                $declis[$count]['circleWidth'] = $decli['circleWidth'];
                $declis[$count]['circlePlan'] = $decli['circlePlan'];

                $countImg = 0;
                foreach($decli['homeImg'] as $img){
                    $declis[$count]['homeImg'][$countImg] = $img['img'];
                    $countImg ++;
                }
                $count ++;
            }
        ?>

        <header>
            <div style='background-image:url("<?php echo wp_get_attachment_url($declis[0]['homeImg'][0]); ?>")'>
                <div class='container'>
                    <h2><b><?php echo $declis[0]['title1']; ?></b> <b><?php echo $declis[0]['title2']; ?></b></h2>
                </div>
                <?php
                    $countImg = 0;
                    foreach($declis[0]['homeImg'] as $img){
                        if($countImg > 0){ ?>
                            <div style="background-image: url('<?php echo wp_get_attachment_url($declis[0]['homeImg'][$countImg]); ?>')"></div>
                        <?php }
                        $countImg ++;
                    }
                ?>
            </div>

            <div class='container'>
                <?php echo $declis[0]['txt']; ?>
                <h1><?php the_title(); ?></h1>
                <a href='<?php the_field('ctaLink'); ?>' class='btn'><?php the_field('ctaTxt'); ?></a>
            </div>
        </header>

        <section class='container'>
            <div>
                <h3><?php the_field('section1Title1'); ?></h3>
                <?php the_field('section1Txt1'); ?>
                <?php the_field('section1Video1'); ?>
            </div><div>
                <h3><?php the_field('section1Title2'); ?></h3>
                <?php the_field('section1Txt2'); ?>
                <?php the_field('section1Video2'); ?>
            </div>
        </section>

        <section>
            <div class='container'>
                <h3><?php the_field('section2Title'); ?></h3>
                <?php the_field('section2Txt'); ?>
            </div>
        </section>

        <section>
            <div class='container'>
                <h3><?php the_field('section3Titre'); ?></h3>
                <?php the_field('section3Txt'); ?>

                <h4><?php the_field('researchTitle'); ?></h4>
                <?php the_field('researchTxt'); ?>
            </div>
            <div class='container'>
                <h4><?php the_field('expTitle'); ?></h4>
                <?php the_field('expTxt'); ?>
            </div>
        </section>

    <?php else : ?>

        <div class='container'>
            <h1>404</h1>
        </div>

    <?php endif; ?>

<?php get_footer(); ?>

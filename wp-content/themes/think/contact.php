<?php 
/*
Template Name: Contact
*/

get_header(); ?>
    
<?php if( have_posts() ): the_post(); ?>

    <div class='container'>
        <div class='col-3-desk'>
            <h1><?php the_title(); ?></h1>
            <?php the_content(); ?>
        </div>
    </div>

    <div class='contact-infos'>
        <div class='container'>
            <div class='col-3-desk'>
                <?php $address = get_field('address', 'options'); if( $address['address'] ) : ?>
                    <span><a href='<?php echo $address['link']; ?>'><?php echo $address['address']; ?></a></span>
                <?php endif; ?>

                <?php
                    $phone = get_field('tel', 'options');
                    if( $phone['num'] ):
                ?>
                    <span><a href='tel:<?php echo $phone['num']; ?>'>
                        <?php echo $phone['displayNum'] ? $phone['displayNum'] : $phone['num']; ?>
                    </a></span>
                <?php endif; ?>
            </div>
        </div>
    </div>
        
    <div class='contact-form'>
        <div class='container'>
            <div class='col-3-desk'>
                <?php $form = get_field('form'); if( $form ) echo do_shortcode($form); ?>
            </div>
        </div>
    </div>

<?php endif; ?>

<?php get_footer(); ?>

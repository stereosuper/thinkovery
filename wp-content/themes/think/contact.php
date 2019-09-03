<?php 
/*
Template Name: Contact
*/

get_header(); ?>
    
<?php if( have_posts() ): the_post(); ?>
    <div class="contact-section wrapper-collant">
        <div class="container contact-sidebar js-contact-sidebar">
            <div class="col-2-desk">
                <h1 class="title"><?php the_title(); ?></h1>
                <div class="contact-info">
                    <?php 
                        $address = get_field('address', 'options');
                        if($address['address']) : 
                    ?>
                        <span class="info">
                            <svg class='icon'><use xlink:href='#icon-location'/></svg>
                            <a href="<?php echo $address['link']; ?>" class="info-link"><?php echo $address['address']; ?></a>
                        </span>
                    <?php endif; ?>
                    <?php
                        $phone = get_field('tel', 'options');
                        if($phone['num']):
                    ?>
                        <span class="info">
                            <svg class='icon'><use xlink:href='#icon-phone'/></svg>
                            <a href="tel:<?php echo $phone['num']; ?>" rel="nofollow" class="info-link">
                                <?php echo $phone['displayNum'] ? $phone['displayNum'] : $phone['num']; ?>
                            </a>
                        </span>
                    <?php endif; ?>
                </div>
            </div>
        </div>
        <div class="contact-form">
            <div class="container">
                <div class="col-2-desk">
                <div class="content">
                    <?php the_content(); ?>
                </div>
                <div class="form">
                    <?php $form = get_field('form'); if( $form ) echo do_shortcode($form); ?>
                </div>
                </div>
            </div>
        </div>
    </div>

<?php endif; ?>

<?php get_footer(); ?>

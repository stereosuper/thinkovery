<?php
/*
Template Name: Contact
*/

$success = $_GET['success'] ? true : false;

get_header(); ?>

	<div class='container <?php if($success){ echo 'success'; } ?>'>
		<?php if ( have_posts() ) : the_post(); ?>

			<div class='contact-sidebar'>
			    
                <h1><?php the_title(); ?></h1>

			    <ul class='contact-infos'>
			    	<li>
			    		<a href='<?php the_field('maps'); ?>' target='_blank' title='<?php _e('Open on Google Maps', 'thinkovery'); ?>'><svg class='icon'><use xlink:href='#icon-map'/></svg></a>
			    		<?php the_field('adress'); ?>
			    	</li>
			    	<li>
			    		<a href='tel:<?php the_field('phone', 'options'); ?>' title='<?php _e('Call us', 'thinkovery'); ?>'><svg class='icon'><use xlink:href='#icon-phone'/></svg></a>
			    		<?php the_field('phoneDisplay', 'options'); ?>
			    	</li>
					<?php if( get_field('email', 'options') ){ ?>
						<li>
							<a href='mailto:<?php the_field('email', 'options'); ?>' title='<?php _e('Send an email', 'thinkovery'); ?>'><svg class='icon icon-mail'><use xlink:href='#icon-envelope'/></svg></a>
							<?php the_field('email', 'options'); ?>
						</li>
					<?php } ?>
			    </ul>

			</div><div class='contact-main'>

				<h2>Vous avez un projet de Digital Learning?</h2>
				<p>N'hésitez pas à nous contacter afin d'échanger sur vos projets (conseil, accompagnement, réalisations...) ou bien tout simplement si vous avez besoin de renseignements sur nos offres ainsi que le Digital Learning.</p>
			    
                <?php if(!$success) : ?>
			    	<?php echo get_template_part( 'includes/form' ); ?>
                <?php else : ?>
					<div class='bloc-success'>
						<h2><?php _e('Thank you', 'thinkovery'); ?></h2>
						<p>
                            <?php _e('Your message have been sent.', 'thinkovery'); ?><br>
							<?php _e('We will come back to you as soon as possible.', 'thinkovery'); ?><br>
                            <?php _e('Have a great day!', 'thinkovery'); ?>
                        </p>
					</div>
				<?php endif; ?>
                
                <!--<svg class='icon hoop layer' data-depth='1.50' style='fill:url(<?php //echo $currentUrl; ?>#gradient-hoop)'><use xlink:href='#icon-hoop-thin'/></svg>
                <svg class='icon hoop layer' data-depth='1.10' style='fill:url(<?php //echo $currentUrl; ?>#gradient-hoop)'><use xlink:href='#icon-hoop-thin'/></svg>
                <svg class='icon hoop layer' data-depth='0.70' style='fill:url(<?php //echo $currentUrl; ?>#gradient-hoop)'><use xlink:href='#icon-hoop-thin'/></svg>
                <svg class='icon hoop layer' data-depth='0.30' style='fill:url(<?php //echo $currentUrl; ?>#gradient-hoop)'><use xlink:href='#icon-hoop-thin'/></svg>-->
			</div>

            <?php if(has_post_thumbnail()){ ?>
                <div class='bg' style='background-image:url(<?php the_post_thumbnail_url(); ?>)'></div>
            <?php } ?>

		<?php else : ?>

		    <h1>404</h1>

		<?php endif; ?>
    </div>

<?php get_footer(); ?>

<?php
/*
Template Name: Contact
*/

    $error = false;
    if(isset($_POST['submit'])){
        global $wp;
        $currentUrl = home_url( $wp->request );  
        $currentTitle = wp_title('&raquo;',FALSE);  

        $hubspotutk      = $_COOKIE['hubspotutk']; //grab the cookie from the visitors browser.
        $ip_addr         = $_SERVER['REMOTE_ADDR']; //IP address too.
        $hs_context      = array(
            'hutk' => $hubspotutk,
            'ipAddress' => $ip_addr,
            'pageUrl' => $currentUrl,
            'pageName' => $currentTitle
        );

        $firstname = $_POST['firstname'];
        $email = $_POST['email'];
        $lastname = $_POST['lastname'];
        $phone = $_POST['phone'];
        $subject = $_POST['objet-contact'];
        $message = $_POST['note'];


        $hs_context_json = json_encode($hs_context);

        //Need to populate these variable with values from the form.
        $str_post = "firstname=" . urlencode($firstname) 
            . "&lastname=" . urlencode($lastname) 
            . "&email=" . urlencode($email) 
            . "&phone=" . urlencode($phone) 
            . "&je_vous_contacte_pour_=" . urlencode($subject) 
            . "&precisez_votre_demande=" . urlencode($message) 
            . "&hs_context=" . urlencode($hs_context_json); //Leave this one be

        //replace the values in this URL with your portal ID and your form GUID
        $endpoint = 'https://forms.hubspot.com/uploads/form/v2/4019924/fd72d66a-9ead-4216-9e23-99e3fb889fc4';

        $ch = @curl_init();
        @curl_setopt($ch, CURLOPT_POST, true);
        @curl_setopt($ch, CURLOPT_POSTFIELDS, $str_post);
        @curl_setopt($ch, CURLOPT_URL, $endpoint);
        @curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/x-www-form-urlencoded'
        ));
        @curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response    = @curl_exec($ch); //Log the response from HubSpot as needed.
        $status_code = @curl_getinfo($ch, CURLINFO_HTTP_CODE); //Log the response status code
        @curl_close($ch);

        $success = $status_code == "204" || $status_code == "302" ? true : false;
        $error = $status_code == "404" || $status_code == "500" ? true : false;
    }
    

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
					<?php //if( get_field('email', 'options') ){ ?>
						<!--<li>
							<a href='mailto:<?php // the_field('email', 'options'); ?>' title='<?php // _e('Send an email', 'thinkovery'); ?>'><svg class='icon icon-mail'><use xlink:href='#icon-envelope'/></svg></a>
							<?php //the_field('email', 'options'); ?>
						</li>-->
					<?php //} ?>
			    </ul>

			</div><div class='contact-main'>
			    
				<?php if(!$success) : ?>
					
					<?php if( get_field('formTitle') ){ ?>
						<h2><?php the_field('formTitle'); ?></h2>
					<?php } ?>
					<?php if( get_field('formText') ){ ?>
						<p><?php the_field('formText'); ?></p>
					<?php } ?>


                        
					<?php include(locate_template('includes/form.php')); ?>
					
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

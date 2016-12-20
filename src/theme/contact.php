<?php
/*
Template Name: Contact
*/

$error = false;
$success = false;
$errorLastname = false;
$errorFirstname = false;
$errorJob = false;
$errorMail = false;
$errorPhone = false;
$errorSubject = false;
$errorMsg = false;
$errorSend = false;

$lastname = isset($_POST['last_name']) ? strip_tags(stripslashes($_POST['last_name'])) : '';
$firstname = isset($_POST['first_name']) ? strip_tags(stripslashes($_POST['first_name'])) : '';
$job = isset($_POST['job']) ? strip_tags(stripslashes($_POST['job'])) : '';
$mail = isset($_POST['email']) ? strip_tags(stripslashes($_POST['email'])) : '';
$phone = isset($_POST['tel']) ? strip_tags($_POST['tel']) : '';
$subject = isset($_POST['subject']) ? strip_tags(stripslashes($_POST['subject'])) : '';
$msg = isset($_POST['message']) ? strip_tags(stripslashes($_POST['message'])) : '';

// $mailto = get_field('email', 'options');
$mailto = 'shwarp@live.fr';


if(isset($_POST['submit'])){

    if(empty($lastname)){
        $errorLastname = __('The field "Last Name" is mandatory', 'thinkovery');
        $error = true;
    }
    if(empty($firstname)){
        $errorFirstname = __('The field "First Name" is mandatory', 'thinkovery');
        $error = true;
    }
    if(empty($job)){
        $errorJob = __('The field "Function" is mandatory', 'thinkovery');
        $error = true;
    }
    if(empty($mail)){
        $errorMail = __('The field "Email" is mandatory', 'thinkovery');
        $error = true;
    }else{
        if(!filter_var($mail, FILTER_VALIDATE_EMAIL)){
            $erreurMail = __('The email address is not valid', 'thinkovery');
            $error = true;
        }
    }
    if(!empty($phone)){
        if(!(strlen($phone) < 20 && strlen($phone) > 9 && preg_match("/^\+?[^.\-][0-9\.\- ]+$/", $phone))){
            $errorPhone = __('The phone number is not valid', 'thinkovery');
            $error = true;
        }
    }
    if(empty($subject)){
        $errorSubject = __('Please choose a subject', 'thinkovery');
        $error = true;
    }
    if(empty($msg)){
        $errorMsg = __('The field "Project" is mandatory', 'thinkovery');
        $error = true;
    }

    if(!$error){
        $name = sprintf('%s %s', $firstname, $lastname);
        $subjectMail = 'Nouveau message provenant de thinkovery.com';
        $headers = 'From: "' . $name . '" <' . $mail . '>' . "\r\n" .
                   'Reply-To: ' . $mail . "\r\n";

        $content = 'De: ' . $name . "\r\n" .
                   'Email: ' . $mail . "\r\n";
        if(!empty($phone)){
            $content .= 'Téléphone: ' . $phone . "\r\n";
        }
        $content .= 'Fonction: ' . $job . "\r\n";
        $content .= 'Sujet: ' . $subject . "\r\n";
        $content .= "\r\n" . 'Message: ' . $msg;

        $sent = wp_mail($mailto, $subjectMail, $content, $headers);

        if($sent){
            $success = true;
        }else{
            $error = true;
            $errorSend = __("We are sorry, an error happened! Please try again later.", 'thinkovery');
        }
    }
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
			    	<li>
			    		<a href='mailto:<?php the_field('email', 'options'); ?>' title='<?php _e('Send an email', 'thinkovery'); ?>'><svg class='icon icon-mail'><use xlink:href='#icon-envelope'/></svg></a>
			    		<?php the_field('email', 'options'); ?>
			    	</li>
			    </ul>
			</div><div class='contact-main'>
			    <?php if(!$success) : ?>
			    	<?php if($error){ ?>
			    		<p><?php _e("The form countains some errors, please check the highlighted fields", 'thinkovery'); ?>:</p>
			    	<?php } ?>
				    <form method='post' action='<?php the_permalink(); ?>' id='form-contact'>
				    	<div class='field m-right <?php if($errorLastname) echo 'error'; ?>'>
				    		<input type='text' name='last_name' id='last_name' value='<?php echo $lastname; ?>' required>
				    		<label for='last_name'><?php _e('Last Name', 'thinkovery'); ?>*</label>
				    		<?php if($errorLastname) echo '<span>'. $errorLastname .'</span>'; ?>
				    	</div><div class='field <?php if($errorFirstname) echo 'error'; ?>'>
				    		<input type='text' name='first_name' id='first_name' value='<?php echo $firstname; ?>' required>
				    		<label for='first_name'><?php _e('First Name', 'thinkovery'); ?>*</label>
				    		<?php if($errorFirstname) echo '<span>'. $errorFirstname .'</span>'; ?>
				    	</div>
				    	<div class='field <?php if($errorJob) echo 'error'; ?>'>
				    		<input type='text' name='job' id='job' value='<?php echo $job; ?>' class='big' required>
				    		<label for='job'><?php _e('Function', 'thinkovery'); ?>*</label>
				    		<?php if($errorJob) echo '<span>'. $errorJob .'</span>'; ?>
				    	</div>
				    	<div class='field m-right <?php if($errorPhone) echo 'error'; ?>'>
				    		<input type='tel' name='tel' id='tel' value='<?php echo $phone; ?>'>
				    		<label for='tel'><?php _e('Phone', 'thinkovery'); ?> <i>(<?php _e('optionnal', 'thinkovery'); ?>)</i></label>
				    		<?php if($errorPhone) echo '<span>'. $errorPhone .'</span>'; ?>
				    	</div><div class='field <?php if($errorMail) echo 'error'; ?>'>
				    		<input type='email' name='email' id='email' value='<?php echo $mail; ?>' required>
				    		<label for='email'><?php _e('Email', 'thinkovery'); ?>*</label>
				    		<?php if($errorMail) echo '<span>'. $errorMail .'</span>'; ?>
				    	</div>
				    	<fieldset class='field-full <?php if($errorSubject) echo 'error'; ?>'>
				    		<legend><?php _e('I am contacting you to', 'thinkovery'); ?>*</legend>
				    		<div class='radio'>
				    			<input type='radio' name='subject' id='work_with' value='Travailler avec vous'>
				    			<label for='work_with'>
                                    <svg class='icon'><use xlink:href='#icon-thumb'/></svg>
                                    <?php _e('Work with you', 'thinkovery'); ?>
                                </label>
				    		</div><div class='radio'>
				    			<input type='radio' name='subject' id='work_for' value='Travailler chez vous'>
				    			<label for='work_for'>
                                    <svg class='icon'><use xlink:href='#icon-diamond'/></svg>
                                    <?php _e('Work for you', 'thinkovery'); ?>
                                </label>
				    		</div><div class='radio'>
				    			<input type='radio' name='subject' id='know' value='Vous connaître' checked>
				    			<label for='know'>
                                    <svg class='icon'><use xlink:href='#icon-chat'/></svg>
                                    <?php _e('Know you', 'thinkovery'); ?>
                                </label>
				    		</div><div class='radio'>
				    			<input type='radio' name='subject' id='mum' value='Maman!'>
				    			<label for='mum'>
                                    <svg class='icon'><use xlink:href='#icon-heart'/></svg>
                                    <?php _e("It's mum, call me back!", 'thinkovery'); ?>
                                </label>
				    		</div>
				    		<?php if($errorSubject) echo '<span>'. $errorSubject .'</span>'; ?>
				    	</fieldset>
				    	<div class='field-full <?php if($errorMsg) echo 'error'; ?>'>
				    		<textarea name='message' id='message' required><?php echo $msg; ?></textarea>
				    		<label for='message'><?php _e('Your project', 'thinkovery'); ?>*</label>
				    		<?php if($errorMsg) echo '<span>'. $errorMsg .'</span>'; ?>
				    	</div>
				    	<button class='btn btn-medium' type='submit' name='submit' for='form-contact'>
				    		<?php _e('Send', 'thinkovery'); ?><svg class='icon'><use xlink:href='#icon-arrow-right'/></svg><i></i>
				    	</button>
				    </form>
				<?php else : ?>
					<p><?php _e('Thank you, your message has been sent!', 'thinkovery'); ?></p>
					<p><?php _e('We will get back to you as soon as possible.', 'thinkovery'); ?></p>
				<?php endif; ?>
                <svg class='icon hoop'><use xlink:href='#icon-hoop-thin'/></svg>
                <svg class='icon hoop'><use xlink:href='#icon-hoop-thin'/></svg>
                <svg class='icon hoop'><use xlink:href='#icon-hoop-thin'/></svg>
                <svg class='icon hoop'><use xlink:href='#icon-hoop-thin'/></svg>
			</div>

            <?php if(has_post_thumbnail()){ ?>
                <div class='bg' style='background-image:url(<?php the_post_thumbnail_url(); ?>)'></div>
            <?php } ?>

		<?php else : ?>

		    <h1>404</h1>

		<?php endif; ?>
    </div>

<?php get_footer(); ?>

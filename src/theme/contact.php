<?php
/*
Template Name: Contact
*/

get_header(); ?>

	<div class='container'>
		<?php if ( have_posts() ) : the_post(); ?>

		    <h1><?php the_title(); ?></h1>

		    <ul>
		    	<li>
		    		<a href='<?php the_field('maps'); ?>' target='_blank'>Google Maps</a>
		    		<?php the_field('adress'); ?>
		    	</li>
		    	<li>
		    		<a href='tel:<?php the_field('phone', 'options'); ?>'>Phone</a>
		    		<?php the_field('phoneDisplay', 'options'); ?>
		    	</li>
		    	<li>
		    		<a href='mailto:<?php the_field('email', 'options'); ?>'>Mail</a>
		    		<?php the_field('email', 'options'); ?>
		    	</li>
		    </ul>

		    <form method='post' action='<?php the_permalink(); ?>'>
		    	<div>
		    		<input type='text' name='last_name' id='last_name' required>
		    		<label for='last_name'><?php _e('Last Name', 'thinkovery'); ?>*</label>
		    	</div><div>
		    		<input type='text' name='first_name' id='first_name' required>
		    		<label for='first_name'><?php _e('First Name', 'thinkovery'); ?>*</label>
		    	</div>
		    	<div>
		    		<input type='text' name='job' id='job' required>
		    		<label for='job'><?php _e('Function', 'thinkovery'); ?>*</label>
		    	</div>
		    	<div>
		    		<input type='tel' name='tel' id='tel'>
		    		<label for='tel'><?php _e('Phone number (facultative)', 'thinkovery'); ?></label>
		    	</div><div>
		    		<input type='email' name='email' id='email' required>
		    		<label for='email'><?php _e('Email', 'thinkovery'); ?>*</label>
		    	</div>
		    	<fieldset>
		    		<legend><?php _e('I am contacting you for', 'thinkovery'); ?>*</legend>
		    		<div>
		    			<input type='radio' name='subject' id='work_with'>
		    			<label for='work_with'><?php _e('Working with you', 'thinkovery'); ?></label>
		    		</div><div>
		    			<input type='radio' name='subject' id='work_for'>
		    			<label for='work_for'><?php _e('Working for you', 'thinkovery'); ?></label>
		    		</div><div>
		    			<input type='radio' name='subject' id='know' checked>
		    			<label for='know'><?php _e('Knowing you', 'thinkovery'); ?></label>
		    		</div><div>
		    			<input type='radio' name='subject' id='mum'>
		    			<label for='mum'><?php _e("It's mum, call me back!", 'thinkovery'); ?></label>
		    		</div>
		    	</fieldset>
		    	<div>
		    		<textarea name='message' id='message' required></textarea>
		    		<label for='message'><?php _e('Your project', 'thinkovery'); ?>*</label>
		    	</div>
		    	<button class='btn' type='submit'>
		    		<?php _e('Send', 'thinkovery'); ?><svg class='icon'><use xlink:href='#icon-arrow-right'/></svg><i></i>
		    	</button>
		    </form>

		<?php else : ?>

		    <h1>404</h1>

		<?php endif; ?>
    </div>

<?php get_footer(); ?>

<form role='search' method='get' action='<?php echo home_url( '/' ); ?>'>
	<input type='search' name='s' value='<?php the_search_query(); ?>' placeholder='<?php _e('Search', 'thinkovery'); ?>...'/>
	<button type='submit'><?php _e('Search', 'thinkovery'); ?></button>
</form>

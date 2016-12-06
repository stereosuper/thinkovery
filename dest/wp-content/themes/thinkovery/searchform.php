<form role='search' method='get' action='<?php echo home_url( '/' ); ?>'>
	<input type='search' name='s' value='<?php echo trim(get_search_query()); ?>' placeholder='<?php _e('Search', 'thinkovery'); ?>...' required>
	<button type='submit'><?php _e('Search', 'thinkovery'); ?></button>
</form>

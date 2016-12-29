<form role='search' method='get' action='<?php echo home_url( '/' ); ?>' class='form-search'>
	<input type='search' name='s' id='search' value='<?php echo trim(get_search_query()); ?>' required>
    <label for='search'><?php _e('Search', 'thinkovery'); ?>...</label>
	<button type='submit'><?php _e('Search', 'thinkovery'); ?><svg class='icon'><use xlink:href='#icon-search'/></svg></button>
</form>

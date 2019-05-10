<form role='search' method='get' action='<?php echo esc_url( home_url( '/' ) ); ?>' class='blog-search'>
	<input type='search' name='s' value='<?php the_search_query(); ?>'>
	<button type='submit' id='search'><svg class="icon"><use href="#icon-search"/></svg></button>
</form>
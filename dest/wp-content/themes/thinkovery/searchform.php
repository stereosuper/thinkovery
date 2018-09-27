<form role='search' method='get' action='<?php echo home_url( '/' ); ?>' class='search-form'>
	<?php
		$categories = array(
			'taxonomy'          => 'category',
			'value_field'       => 'slug',
			'selected'          => !empty( $_GET['category'] ) ? $_GET['category'] : 0,
			'id'                => 'categories',
			'name'              => 'category',
			'show_option_none'  => __( 'Categories', 'thinkovery' ),
			'option_none_value' => '0', 
			'order'             => 'ASC',
			'hide_empty'        => 1
		);
		echo '<label class="screen-reader-text" for="categories">'. __('Categories', 'thinkovery') .'</label>';
		wp_dropdown_categories( $categories );

		$topics = array(
			'taxonomy'          => 'rubrique',
			'value_field'       => 'slug',
			'selected'          => !empty( $_GET['topic'] ) ? $_GET['topic'] : 0,
			'id'                => 'topics',
			'name'              => 'topic',
			'show_option_none'  => __( 'Rubriques', 'thinkovery' ),
			'option_none_value' => '0', 
			'order'             => 'ASC',
			'hide_empty'        => 1
		);
		echo '<label class="screen-reader-text" for="topics">'. __('Rubriques', 'thinkovery') .'</label>';
		wp_dropdown_categories( $topics );
	?>
	
	<label class='screen-reader-text' for='s'><?php _e('Mot clé', 'thinkovery'); ?></label>
	<input type='text' name='s' id='s' value='<?php echo trim(get_search_query()); ?>' placeholder='<?php _e('Mot clé', 'thinkovery'); ?>'>
    
	<button type='submit' class='btn-small'>
		<?php _e('Filtrer', 'thinkovery'); ?><svg class='icon'><use xlink:href='#icon-arrow-right'/></svg><i></i>
	</button>
	
</form>

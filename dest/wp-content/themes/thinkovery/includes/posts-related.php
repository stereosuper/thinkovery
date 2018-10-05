<?php
	global $post;
	$currentPost = $post;
	$categories = get_the_terms($post->ID, 'category');

	if ($categories) {

		$categoryIds = array();
		foreach ($categories as $cat) {
			$categoryIds[] = $cat->term_id;
		}

		$relatedQuery = new WP_Query(array(
			'category__in' => $categoryIds,
			'post__not_in' => array($post->ID),
			'posts_per_page' => 2,
			'tax_query' => array(array(
				'taxonomy' => 'post_format',
				'field' => 'slug',
				'terms' => array('post-format-link'),
				'operator' => 'NOT IN',
			)),
		));

		if ($relatedQuery->have_posts()) {
			echo '<div class="related-posts"><h4>' . __('Previous Posts', 'thinkovery') . '</h4><ul  class="animateOnScroll">';
			while( $relatedQuery->have_posts() ) : $relatedQuery->the_post(); ?>
				<li>
					<a href='<?php the_permalink(); ?>'>
						<?php if( has_post_thumbnail() ){ ?>
							<div class='related-thumbnail' style='background-image: url(<?php the_post_thumbnail_url(); ?>)'></div>
						<?php } ?>
						<span class='title'><?php echo think_title_length(get_the_title()); ?></span>
						<svg class='icon icon-arrow'><use xlink:href='#icon-arrow-right'/></svg>
						<i></i>
					</a>
				</li>
			<?php endwhile;
			echo '</ul></div>';
		}
	}

	$post = $currentPost;
	wp_reset_query();
?>
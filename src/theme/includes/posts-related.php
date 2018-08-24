<?php
	//global $post;
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
			'posts_per_page' => 3,
			'tax_query' => array(array(
				'taxonomy' => 'post_format',
				'field' => 'slug',
				'terms' => array('post-format-link'),
				'operator' => 'NOT IN',
			)),
		));

		if ($relatedQuery->have_posts()) {
			echo '<div class="related-posts">';
				echo '<h4>' . __('Related Posts', 'thinkovery') . '</h4>';
				echo '<div class="grid">';
					while( $relatedQuery->have_posts() ) :  $relatedQuery->the_post();
						echo "<div class='related-post post-ratio-m'>";
							require 'post.php';
						echo "</div>";
					endwhile;
				echo '</div>';
			echo '</div>';
		}
		wp_reset_query();
	}

	$post = $currentPost;
	
?>
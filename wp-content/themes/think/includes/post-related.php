<?php
	global $post;
	$currentPost = $post;
	$tags = get_the_tags();
	$terms = get_the_terms($post, 'sector');
	$tagsIds = array();
	$termsIds = array();

	$args = array(
		'tax_query' => array(
			'relation' => 'OR',
		),
		'post__not_in' => array($post->ID),
		'posts_per_page' => 2
	);

	if( $tags ){
		foreach( $tags as $tag ){
			$tagsIds[] = $tag->term_id;
		}
		$args['tax_query'][] = array(
			'taxonomy' => 'post_tag',
			'field'    => 'term_id',
			'terms'    => $tagsIds,
		);
	}

	if( $terms ){
		foreach( $terms as $term ){
			$termsIds[] = $term->term_id;
		}
		$args['tax_query'][] = array(
			'taxonomy' => 'sector',
			'field'    => 'term_id',
			'terms'    => $termsIds,
		);
	}

	$relatedQuery = new WP_Query($args);

	if( $relatedQuery->have_posts() ) :
		echo '<div class="related-posts"><h2>' . __('Related Posts', 'think') . '</h2><div>';
		while( $relatedQuery->have_posts() ) : $relatedQuery->the_post(); ?>
			<div class='post simple'>
				<div class='cats'>
					<?php $cats = get_the_category(); if( $cats ){
						$count = 0;
						foreach( $cats as $cat ){
							$count ++;
							if( $count > 1 ) echo ' - ';
							echo '<a href="' . get_category_link( $cat->term_id ) . '">' . $cat->cat_name . '</a>';
						}
					} ?>
				</div>
				<h3><a href='<?php the_permalink(); ?>'><?php echo get_the_title(); ?></a></h3>
				<p>
					<a href='<?php the_permalink(); ?>'>
						<?php
							$content = get_the_content();
							echo wp_trim_words( $content , '30' );
						?>
					</a>
				</p>
				<div class='tags'>
					<?php $tags = get_the_tags(); if( $tags ){
						$count = 0;
						foreach( $tags as $tag ){
							$count ++;
							if( $count > 1 ) echo ' - ';
							echo '<a href="' . get_tag_link( $tag->term_id ) . '">' . $tag->name . '</a>';
						}
					} ?>
				</div>
			</div>
		<?php endwhile;
		echo '</div></div>';
	endif;

	$post = $currentPost;
	wp_reset_query();
?>
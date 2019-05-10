<?php
	global $post;
	$currentPost = $post;
	$tags = get_the_tags($post->ID, 'category');

	if ($tags) {

		$tagsIds = array();
		foreach ($tags as $tag) {
			$tagsIds[] = $tag->term_id;
		}

		$relatedQuery = new WP_Query(array(
			'tag__in' => $tagsIds,
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
			echo '<div class="related-posts"><h2>' . __('Related Posts', 'thinkovery') . '</h2>';
			while( $relatedQuery->have_posts() ) : $relatedQuery->the_post(); ?>
				<div class='post'>
                    <div>
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
			echo '</div>';
		}
	}

	$post = $currentPost;
	wp_reset_query();
?>
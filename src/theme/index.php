<?php get_header(); ?>

<?php
	$paged = ( get_query_var('paged') ) ? get_query_var('paged') : 1;

	if( $paged <= 1 ):
		// Get 2 last posts
		$postsLastQuery = wp_get_recent_posts( array(
			'numberposts' => 2,
			'post_status' => 'publish',
			'meta_key' => '_thumbnail_id'
		) );
		$postsLast = [ json_decode(json_encode($postsLastQuery[0]), FALSE), json_decode(json_encode($postsLastQuery[1]), FALSE)];
		$postsLastIds = [ $postsLast[0]->ID, $postsLast[1]->ID ];

		// Get all featured posts
		$postsFeaturedIDs   = get_field('blogPosts_featured', 'options');
		$postsFeaturedQuery = new WP_Query( array(
			'post__in' => $postsFeaturedIDs
		) );
		$postsFeatured = $postsFeaturedQuery->posts;
		wp_reset_postdata();
	endif;

	// Get posts list
	$postsQuery = new WP_Query( array(
		'post_type' => 'post',
		'post__not_in' => array_merge($postsLastIds, $postsFeaturedIDs),
		'posts_per_page' => 6,
		'paged' => $paged,
		'meta_key' => '_thumbnail_id'
	) );
	$posts = $postsQuery->posts;
	wp_reset_postdata();
?>

	<div class='container'>
		
		<div class='grid blog-header'>
			<div class='col-3 search-params'>
				<h1>
					<?php the_field('blogTitle', 'options'); ?>
				</h1>
				<?php get_search_form(); ?>
			</div>
			<?php if( $paged <= 1 ): ?>
				<div class='col-8 container-small posts-pushes'>
					<div class='col-4 posts-push post-ratio-m'>
						<?php
							$post = $postsLast[0];
							require 'includes/post-featured.php';
						?>
					</div>
					<div class='col-4 posts-push post-ratio-m'>
						<?php
							$post = $postsLast[1];
							require 'includes/post-featured.php';
						?>
					</div>
				</div>
			<?php else: ?>
				<div class='col-8 container-small'>
					<?php require 'includes/mod-newsletter-blog-home.php'; ?>
				</div>
			<?php endif; ?>
		</div>
		

		<?php if( $paged <= 1 ): ?>
			<p class='h2 h2-themed'><?php _e('Notre sélection', 'thinkovery'); ?></p>
			<div class='grid posts-select'>
				<div class='col-6 col-left'>
					<div class='post-ratio-newsletter-mod'>
						<?php
							$post = $postsFeatured[0];
							require 'includes/post-featured.php';
						?>
					</div>
					<div class='grid container-tiny posts-s'>
						<div class='col-3 post-ratio-s'>
							<?php
								$post = $postsFeatured[1];
								require 'includes/post-featured.php';
							?>
						</div>
						<div class='col-3 post-ratio-s'>
							<?php
								$post = $postsFeatured[2];
								require 'includes/post-featured.php';
							?>
						</div>
					</div>
				</div>

				<div class='col-5 col-right'>
					<?php require 'includes/mod-newsletter-blog-home.php'; ?>
					<div class='post-ratio-l'>
						<?php
							$post = $postsFeatured[3];
							require 'includes/post-featured.php';
						?>
					</div>
				</div>
			</div>
	<?php endif; ?>

		<section class='posts-list'>
			<?php if( $paged <= 1 ): ?>
				<p class='h3 h3-themed'><?php _e('Nos derniers articles', 'thinkovery'); ?></p>
			<?php endif; ?>
			<?php
				if( $postsQuery->have_posts() ){
					echo "<div class='grid'>";
						while ( $postsQuery->have_posts() ) {
							$postsQuery->the_post();
							echo "<div class='col-4 post-ratio-m'>";
								require 'includes/post.php';
							echo "</div>";
						}
					echo "</div>";
					echo "<div class='pagination'>";
					echo paginate_links( array(
						'total' => $postsQuery->max_num_pages,
						'prev_text' => __('Previous page', 'thinkovery') . "<svg class='icon'><use xlink:href='#icon-arrow-left'/></svg>", 
						'next_text'  => __('Next page', 'thinkovery') . "<svg class='icon'><use xlink:href='#icon-arrow-right'/></svg>", 
						//'end_size' => 2, 
						//'mid_size' => 0 
					) );
					echo "</div>";
				} else {
					echo "<p><?php _e('No posts yet!', 'thinkovery'); ?></p>";
				}
			?>
		</section>
	</div>

<?php get_footer(); ?>

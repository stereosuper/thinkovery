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
		<?php if( $paged <= 1 ): ?>
			<div class='grid blog-header'>
				<div class='col-3 search-params'>
					<h1>
						<?php the_field('blogTitle', 'options'); ?>
					</h1>
					<?php get_search_form(); ?>
				</div>
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
			</div>
		<?php endif; ?>

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
					<div class='stay-connected-mod'>
						<div class='blog-newsletter-mod'>
							<h3 class='h5'><?php _e('Inscrivez-vous à notre newsletter', 'thinkovery'); ?></h3>
							<?php echo do_shortcode('[mc4wp_form id="8558"]'); ?>
						</div>
						<div class='networks-links'>
							<h3 class='h5'><?php _e('Suivez-nous !', 'thinkovery'); ?></h3>
							<?php if( have_rows('social', 'options') ): ?>
								<ul class=''>
									<?php while ( have_rows('social', 'options') ) : the_row(); ?><li>
										<a href='<?php the_sub_field('networkLink'); ?>' target='_blank' rel='noreferrer noopener' title='<?php the_sub_field('networkLinkTxt'); ?>'>
											<?php the_sub_field('networkLinkTxt'); ?>
											<svg class='icon icon-<?php the_sub_field('networkSlug'); ?>'><use xlink:href='#icon-<?php the_sub_field('networkSlug'); ?>'/></svg><i></i>
										</a>
									</li><?php endwhile; ?>
								</ul>
							<?php endif; ?>
						</div>
					</div>
					<div class='post-ratio-l'>
						<?php
							$post = $postsFeatured[3];
							require 'includes/post-featured.php';
						?>
					</div>
				</div>
			</div>
	<?php endif; ?>
		<!--<div class='grid posts-select posts-select-second'>
			<div class='grid col-6 container-tiny posts-s'>
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
			<div class='col-5 post-ratio-l'>
				<?php
					$post = $postsFeatured[3];
					require 'includes/post-featured.php';
				?>
			</div>
		</div>-->

		<section class='posts-list'>
			<p class='h3 h3-themed'><?php _e('Nos derniers articles', 'thinkovery'); ?></p>
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

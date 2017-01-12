<?php get_header(); ?>

	<?php if ( have_posts() ) : ?>

		<?php while ( have_posts() ) : the_post(); ?>
			<?php if( has_post_thumbnail() ){ ?>
				<div class='bloc-top-img' style='background-image: url(<?php the_post_thumbnail_url(); ?>)'></div>
			<?php } ?>
			<article class='container <?php if( has_post_thumbnail() ){ ?>has-post-img<?php } ?>'>

				<div class='container-small'>
					<time datetime='<?php echo get_the_date('Y-m-d'); ?>' class='post-date'><?php echo get_the_date(); ?></time>

					<h1><?php the_title(); ?></h1>

					<?php if(get_field('intro')){ ?>
					    <div class='intro animateOnScroll'><?php the_field('intro'); ?></div>
					<?php } ?>

					<div class='single-content'><?php the_content(); ?></div>

					<div class='wrapper-share-related'>
						<div class='share-post'>
							<h4><?php _e('Share this post', 'thinkovery'); ?></h4>
							<ul class='animateOnScroll'>
								<li>
									<a href='http://twitter.com/share?url=<?php the_permalink(); ?>&text=<?php the_title(); ?>&via=<?php bloginfo("name"); ?>' rel='nofollow' target='_blank'><?php _e('Share on Twitter', 'thinkovery'); ?><svg class='icon icon-twitter'><use xlink:href='#icon-twitter'/></svg><i></i></a>
								</li>
								<li>
									<a href='http://www.linkedin.com/shareArticle?mini=true&url=<?php the_permalink(); ?>&title=<?php the_title(); ?>' rel='nofollow' target='_blank'><?php _e('Share on Linkedin', 'thinkovery'); ?><svg class='icon icon-linkedin'><use xlink:href='#icon-linkedin'/></svg><i></i></a>
								</li>
								<li>
									<a href='http://www.facebook.com/sharer.php?u=<?php the_permalink(); ?>&t=<?php the_title(); ?>' rel='nofollow' target='blank'><?php _e('Share on Facebook', 'thinkovery'); ?><svg class='icon icon-facebook'><use xlink:href='#icon-facebook'/></svg><i></i></a>
								</li>
							</ul>
						</div>
						<?php
							$currentPost = $post;
							global $post;

							$categories = get_the_category($post->ID);
							if($categories){
								$categoryIds = array();
								foreach($categories as $cat){
									$categoryIds[] = $cat->term_id;
								}

								$relatedQuery = new WP_Query( array(
									'category__in' => $categoryIds,
									'post__not_in' => array($post->ID),
									'posts_per_page'=> 2,
							        'tax_query' => array( array(
							            'taxonomy' => 'post_format',
							            'field' => 'slug',
							            'terms' => array('post-format-link'),
							            'operator' => 'NOT IN'
							        ) )
								) );

								if( $relatedQuery->have_posts() ){
									echo '<div class="related-posts"><h4>' . __('Related Posts', 'thinkovery') . '</h4><ul  class="animateOnScroll">';
									while( $relatedQuery->have_posts() ){ $relatedQuery->the_post(); ?>
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
									<? }
									echo '</ul></div>';
								}
							}

							$post = $currentPost;
							wp_reset_query();
						?>
					</div>

					<div class='comments'><?php comments_template(); ?></div>

				</div>

			</article>

		<?php endwhile; ?>


	<?php else : ?>
		<article class='container'>

			<div class='container-small'>
				<h1>404</h1>
			</div>
		</article>

	<?php endif; ?>

<?php get_footer(); ?>

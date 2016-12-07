<?php get_header(); ?>

	<article class='container'>

		<?php if ( have_posts() ) : ?>

			<?php while ( have_posts() ) : the_post(); ?>

				<h1><?php the_title(); ?></h1>
				<time datetime='<?php echo get_the_date('Y-m-d'); ?>'><?php echo get_the_date(); ?></time>

				<?php if(get_field('intro')){ ?>
				    <p class='intro'><?php the_field('intro'); ?></p>
				<?php } ?>

				<?php the_content(); ?>

				<div>
					<p><?php _e('Share on', 'thinkovery'); ?></p>
					<ul>
						<li>
							<a href='http://twitter.com/share?url=<?php the_permalink(); ?>&text=<?php the_title(); ?>&via=<?php bloginfo("name"); ?>' rel='nofollow' target='_blank'><?php _e('Share on Twitter', 'thinkovery'); ?></a>
						</li>
						<li>
							<a href='http://www.linkedin.com/shareArticle?mini=true&url=<?php the_permalink(); ?>&title=<?php the_title(); ?>' rel='nofollow' target='_blank'><?php _e('Share on Linkedin', 'thinkovery'); ?></a>
						</li>
						<li>
							<a href='http://www.facebook.com/sharer.php?u=<?php the_permalink(); ?>&t=<?php the_title(); ?>' rel='nofollow' target='blank'><?php _e('Share on Facebook', 'thinkovery'); ?></a>
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
							'caller_get_posts'=>1
						) );

						if( $relatedQuery->have_posts() ){
							echo '<div><h3>' . __('Related Posts', 'thinkovery') . '</h3><ul>';
							while( $relatedQuery->have_posts() ){ $relatedQuery->the_post(); ?>
								<li>
									<a href='<?php the_permalink(); ?>'>
										<?php the_post_thumbnail(); ?>
										<h3><?php the_title(); ?></h3>
										<time datetime='<?php echo get_the_date('Y-m-d'); ?>'><?php echo get_the_date(); ?></time>
										<span>
											<?php $cats = get_the_category(); if($cats){
												$countCats = count($cats);
												$i = 0;
												foreach($cats as $cat){
													$i ++;
													echo $cat->cat_name;
													if($i < $countCats){
														echo ', ';
													}
												}
											} ?>
										</span>
									</a>
								</li>
							<? }
							echo '</ul></div>';
						}
					}

					$post = $currentPost;
					wp_reset_query();
				?>

				<?php comments_template(); ?>

			<?php endwhile; ?>


		<?php else : ?>

			<h1>404</h1>

		<?php endif; ?>

	</article>

<?php get_footer(); ?>

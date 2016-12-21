<?php get_header(); ?>

	<?php if ( have_posts() ) : ?>

		<?php while ( have_posts() ) : the_post(); ?>
			<?php if( has_post_thumbnail() ){ ?>
				<div class='bloc-top-img' style='background-image: url(<?php the_post_thumbnail_url(); ?>)'></div>
			<?php } ?>
			<article class='container <?php if( has_post_thumbnail() ){ ?>has-post-img<?php } ?>'>

				<div class='container-small'>
					<?php if(has_post_thumbnail()){ ?>
						<time datetime='<?php echo get_the_date('Y-m-d'); ?>'><?php echo get_the_date(); ?></time>
					<?php } ?>

					<h1><?php the_title(); ?></h1>

					<?php if(!has_post_thumbnail()){ ?>
						<time datetime='<?php echo get_the_date('Y-m-d'); ?>'><?php echo get_the_date(); ?></time>
					<?php } ?>

					<?php if(get_field('intro')){ ?>
					    <div class='intro'><?php the_field('intro'); ?></div>
					<?php } ?>

					<?php the_content(); ?>

					<div>
						<p><?php _e('Share this post', 'thinkovery'); ?></p>
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
								'caller_get_posts'=>1,
						        'tax_query' => array( array(
						            'taxonomy' => 'post_format',
						            'field' => 'slug',
						            'terms' => array('post-format-link'),
						            'operator' => 'NOT IN'
						        ) )
							) );

							if( $relatedQuery->have_posts() ){
								echo '<div><p>' . __('Related Posts', 'thinkovery') . '</p><ul>';
								while( $relatedQuery->have_posts() ){ $relatedQuery->the_post(); ?>
									<li>
										<a href='<?php the_permalink(); ?>'>
											<?php the_post_thumbnail(); ?>
											<?php the_title(); ?>
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

<?php get_header(); ?>

<div class='container'>

	<h1 class='blog-title'><?php single_post_title(); ?></h1>

	<div class='blog-nav' id='blog-nav'>
		<div class='blog-cats' id='blog-cats'>
			<ul>
				<li class='current-cat'><?php _e('All posts', 'think'); ?></li>
				<?php wp_list_categories( array('title_li' => '') ); ?>
			</ul>
			<svg class="icon"><use href="#icon-down"/></svg>
		</div>
		<?php get_search_form(); ?>
	</div>

	<?php if ( have_posts() ) : $countPosts = 0; ?>

		<div class='blog-list'>

			<?php while ( have_posts() ) : the_post(); $countPosts ++; ?>

				<?php if( $countPosts == 10) : ?>
					<?php $news = get_field('newsletter', 'options'); if( $news['newsletterTitle'] ):  ?>
						<div class='newsletter newsletter-post' id='newsletter-post'>
							<p class='newsletter-title'><?php echo $news['newsletterTitle']; ?></p>
							<p><?php echo $news['newsletterSubtitle']; ?></p>

							<?php echo do_shortcode('[mc4wp_form id="2057048" element_id="newsletter-post-form"]'); ?>
						</div>
					<?php endif; ?>
				<?php endif; ?>
				
				<div class='post'>
					<div class='post-cats'>
						<span class='post-duration'>
							<svg class="icon"><use href="#icon-clock"/></svg>
							<?php echo estimated_time_to_read_post(get_the_content(), true); ?>
						</span>
						<?php
							$sectors = get_the_terms($post, 'sector');
							if( $sectors && $countPosts > 1 ) : ?>
								<div class='icons'>
									<?php foreach( $sectors as $sector ) :
										switch( $sector->slug ){
											case 'communication':
												echo '<svg class="icon"><use href="#icon-rectangle"/></svg>';
												break;
											case 'conseil':
												echo '<svg class="icon"><use href="#icon-drop"/></svg>';
												break;
											case 'conception':
												echo '<svg class="icon"><use href="#icon-square"/></svg>';
												break;
											case 'evaluation':
												echo '<svg class="icon"><use href="#icon-circle"/></svg>';
												break;
											case 'realisation':
												echo '<svg class="icon"><use href="#icon-triangle"/></svg>';
												break;
										}
									endforeach; ?>
								</div>
							<?php endif;
						?>
					</div>

					<h2><a href='<?php the_permalink(); ?>'><?php the_title(); ?></a></h2>

					<p>
						<a href='<?php the_permalink(); ?>'>
							<?php
								$excerpt = get_the_excerpt();
								$content = !ctype_space($excerpt) && $excerpt !== '' ? $excerpt : get_the_content();
								echo wp_trim_words( $content , '30' );
							?>
						</a>
					</p>

					<div class='tags'>
						<?php $tags = get_the_tags(); if( $tags ){
							$count = 0;
							foreach( $tags as $tag ){
								$count ++;
								echo '<a href="' . get_tag_link( $tag->term_id ) . '">' . $tag->name . '</a>';
							}
						} ?>
					</div>
				</div>
			
			<?php endwhile; ?>

		</div>

		<?php
			$moreText = __('Load more posts', 'think');
			echo do_shortcode('[ajax_load_more container_type="div" post_type="post" pause="true" scroll="false" posts_per_page="15" offset="17" button_label="' . $moreText . '"]');
		?>
	
	<?php else : ?>
				
		<p><?php _e('No posts yet'); ?></p>

	<?php endif; ?>

</div>

<?php get_footer(); ?>
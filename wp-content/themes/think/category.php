<?php get_header(); ?>

<div class='container'>
<?php 
$single_cat_title = single_cat_title('', false);
$post_count = 0;
$terms = get_the_terms(get_the_ID(), 'category');

if ($terms) {
	foreach ($terms as $term){
		if ($single_cat_title === $term->name) {
			$post_count = $term->count;
		}
	}
}
?>

	<h1 class='blog-title'><?php echo $single_cat_title; ?></h1>
	<p class="section-results"><?php echo $post_count .' '. ($post_count === 1 ? __('post in this category', 'think') : __('posts in this category', 'think')) ?></p>

	<div class='blog-nav' id='blog-nav'>
		<div class='blog-cats' id='blog-cats'>
			<ul>
				<li><a href='<?php echo get_permalink( get_option( 'page_for_posts' ) ); ?>'><?php _e('All posts', 'think'); ?></a></li>
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
						<div id="newsletter-post" class="newsletter newsletter-post" data-io="revealNewsletter">
							<p class='newsletter-title'><?php echo $news['newsletterTitle']; ?></p>
							<p><?php echo $news['newsletterSubtitle']; ?></p>

							<?php echo do_shortcode('[mc4wp_form id="2057048" element_id="newsletter-post-form"]'); ?>
							<div class="newsletter-borders">
								<span class="border first"></span>
								<span class="border second"></span>
								<span class="border third"></span>
							</div>
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
								echo '<a href="' . get_tag_link( $tag->term_id ) . '">' . $tag->name . '</a>';
							}
						} ?>
					</div>
				</div>
			
			<?php endwhile; ?>

		</div>

		<?php
			if( $countPosts > 17) :
				$moreText = __('Load more posts', 'think');
				echo do_shortcode('[ajax_load_more container_type="div" post_type="post" pause="true" scroll="false" posts_per_page="15" offset="17" button_label="' . $moreText . '" taxonomy_operator="IN" taxonomy="'.get_queried_object()->taxonomy.'" taxonomy_terms="'.get_queried_object()->slug.'"]');
			endif;
		?>
	
	<?php else : ?>
				
		<p><?php _e('No posts yet'); ?></p>

	<?php endif; ?>

</div>

<?php get_footer(); ?>
<?php get_header(); ?>

<div class='container'>
<?php 
$single_cat_title = single_cat_title('', false);
$post_count = 0;
foreach (get_the_terms(get_the_ID(), 'category') as $term){
	if ($single_cat_title === $term->name) {
		$post_count = $term->count;
	}
}
?>

	<h1 class='blog-title'><?php echo $single_cat_title; ?></h1>
	<p><?php echo $post_count .' '. __('articles dans cette rubrique', 'think') ?></p>

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
						<div class='newsletter newsletter-post' id='newsletter-post'>
							<p class='newsletter-title'><?php echo $news['newsletterTitle']; ?></p>
							<p><?php echo $news['newsletterSubtitle']; ?></p>

							<?php echo do_shortcode('[mc4wp_form id="2057048" element_id="newsletter-post-form"]'); ?>
						</div>
					<?php endif; ?>
				<?php endif; ?>
				
				<div class='post'>
					<div class='post-cats'>
						<div class='cats'>
							<?php $cats = get_the_category(); if( $cats ){
								$count = 0;
								foreach( $cats as $cat ){
									$count ++;
									if( $count > 1 ) echo ' <br>';
									echo '<a href="' . get_category_link( $cat->term_id ) . '">' . $cat->cat_name . '</a>';
								}
							} ?>
						</div>
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

					<?php if( get_field('duration') ){ ?>
					<span class='post-duration'>
						<svg class="icon"><use href="#icon-clock"/></svg>
						<?php the_field('duration'); ?>
					</span>
					<?php } ?>

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
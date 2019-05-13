<?php get_header(); ?>

<article class='container article'>

	<?php if ( have_posts() ) : the_post(); ?>

		<div class='wrapper-collant' id='article'>

			<div class='share sidebar' id='share'>
				<ul class='share-list'>
					<li>
						<a href='https://www.facebook.com/sharer.php?u=<?php the_permalink(); ?>&t=<?php the_title(); ?>' rel='nofollow' target='blank' title='Share on Facebook'><svg class="icon"><use xlink:href="#icon-facebook"/></svg></a>
					</li>
					<li>
						<a href='https://twitter.com/share?url=<?php the_permalink(); ?>&text=<?php the_title(); ?>&via=<?php bloginfo("name"); ?>' rel='nofollow' target='_blank' title='Share on Twitter'><svg class="icon"><use xlink:href="#icon-twitter"/></svg></a>
					</li>
					<li>
						<a href='https://www.linkedin.com/shareArticle?mini=true&url=<?php the_permalink(); ?>&title=<?php the_title(); ?>' rel='nofollow' target='_blank' title='Share on Linkedin'><svg class="icon"><use xlink:href="#icon-linkedin"/></svg></a>
					</li>
				</ul>
			</div>

			<div class='col-3-desk'>
				<div>
					<?php echo get_the_date(); $cats = get_the_category(); if( $cats ){
						foreach( $cats as $cat ){
							echo ' - <a href="' . get_category_link( $cat->term_id ) . '">' . $cat->cat_name . '</a>';
						}
					} ?>
				</div>

				<h1><?php the_title(); ?></h1>
				
				<div class='editor'>
					<?php the_content(); ?>
				</div>

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
		
		</div>

		<?php get_template_part('includes/post-related'); ?>
		
		<div class='col-3-desk'>
			<h4 class='author-title'><?php _e('About the author', 'think'); ?></h4>
			<div class='author-wrapper'>
				<div class='author-img'><?php echo get_avatar(get_the_author_meta('user_email'), '100'); ?></div>
				<div>
					<p class='author-name'><?php esc_html(the_author_meta('display_name')); ?></p>
					<?php if (get_the_author_meta('description')) : ?>
						<p class='author-desc'><?php esc_textarea(the_author_meta('description')); ?></p>
					<?php endif; ?>
				</div>
			</div>

			<?php $news = get_field('newsletter', 'options'); if( $news['newsletterTitle'] ):  ?>
				<div class='newsletter newsletter-post' id='newsletter-post'>
					<p class='newsletter-title'><?php echo $news['newsletterTitle']; ?></p>
					<p><?php echo $news['newsletterSubtitle']; ?></p>
								
					<?php echo do_shortcode('[mc4wp_form id="2057048" element_id="newsletter-post-form"]'); ?>
				</div>
			<?php endif; ?>
			
			<div class='comments'><?php comments_template(); ?></div>
		</div>
	
	<?php endif; ?>

</article>

<?php get_footer(); ?>
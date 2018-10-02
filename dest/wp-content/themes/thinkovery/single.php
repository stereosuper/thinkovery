<?php get_header(); ?>

	<?php if ( have_posts() ) : ?>

		<?php while ( have_posts() ) : the_post(); ?>

			<?php if( has_post_thumbnail() ){ ?>
				<div class='bloc-top-img'><?php the_post_thumbnail( 'full' ); ?></div>
			<?php } ?>
			<article class='container <?php if( has_post_thumbnail() ){ ?>has-post-img<?php } ?>'>

				<div class='container-small'>
					<div class='single-header'>
						<p>
							<a href="<?php echo get_permalink( get_option( 'page_for_posts' ) ); ?>" title='<?php _e('Blog ', 'thinkovery'); ?>'><?php _e('Blog ', 'thinkovery'); ?></a>
							<span class='breadcrumb-separator'> > </span>
							<?php the_terms( $post->ID, 'category' ); ?>
						</p>
						<p><?php _e('Publié le ', 'thinkovery'); ?>
						<time datetime='<?php echo get_the_date('Y-m-d'); ?>' class='post-date'><?php echo get_the_date(); ?></time>
						<?php if( get_the_modified_date() !== get_the_date() ): ?>
							<?php _e(', mis à jour le ', 'thinkovery'); ?>
							<time datetime='<?php echo get_the_modified_date('Y-m-d'); ?>' class='post-date'><?php echo get_the_modified_date(); ?></time>
						<?php endif; ?>
						<?php _e('par ', 'thinkovery'); ?>
						<span><?php the_author(); ?></span></p>
					</div>

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
						<?php include 'includes/posts-related.php'; ?>
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

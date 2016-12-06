<?php get_header(); ?>

	<article class='container'>

		<?php if ( have_posts() ) : ?>

			<?php while ( have_posts() ) : the_post(); ?>

				<h1><?php the_title(); ?></h1>
				<time datetime='<?php echo get_the_date('Y-m-d'); ?>'><?php echo get_the_date(); ?></time>

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

				<?php comments_template(); ?>

			<?php endwhile; ?>


		<?php else : ?>

			<h1>404</h1>

		<?php endif; ?>

	</article>

<?php get_footer(); ?>

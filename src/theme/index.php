<?php get_header(); ?>

	<div class='container'>
		<h1><?php the_field('blogTitle', 'options'); ?></h1>

		<?php if ( have_posts() ) : ?>

			<?php while ( have_posts() ) : the_post(); ?>
				<?php $formatLink = get_post_format() === 'link' ? true : false; ?>

				<div class='post <?php if($formatLink) echo "post-network"; ?>'>

					<?php if(!$formatLink){ ?>

						<h2 class='h3'><a href='<?php the_permalink(); ?>'><?php the_title(); ?></a></h2>
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
						<?php $nbComments = get_comments_number(); ?>

						<?php if($nbComments > 0){ ?>
							<a href='<?php the_permalink(); ?>#comments'>
								<?php echo sprintf( _n('%s comment', '%s comments', $nbComments, 'thinkovery'), number_format_i18n( $nbComments ) ); ?>
							</a>
						<?php }else{ ?>
								<a href='<?php the_permalink(); ?>#leave-comment'><?php _e('Leave a comment', 'thinkovery'); ?>
						<?php } ?>

						<a href='<?php the_permalink(); ?>'>
							<?php if( has_post_thumbnail() ){ the_post_thumbnail(); } ?>
						</a>

						<?php the_excerpt(); ?>

					<?php }else{ ?>

						<a href='<?php the_field('link'); ?>' target='_blank'>
							<?php if( has_post_thumbnail() ){ the_post_thumbnail(); } ?>
						</a>

						<?php the_excerpt(); ?>

						<a href='<?php the_field('link'); ?>' target='_blank'>
							<?php echo __('Find us on', 'thinkovery') . ' ' . get_field('network'); ?>
						</a>

					<?php } ?>

				</div>
			<?php endwhile; ?>

			<div class='pagination'>
				<?php echo paginate_links( array( 'prev_text' => __('Previous page', 'thinkovery'), 'next_text'  => __('Next page', 'thinkovery') ) ); ?>
			</div>

		<?php else : ?>

			<p><?php _e('No posts yet!', 'thinkovery'); ?></p>

		<?php endif; ?>
	</div>

<?php get_footer(); ?>

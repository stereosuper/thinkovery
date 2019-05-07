<?php get_header(); ?>

<div class='container'>

	<h1><?php single_post_title(); ?></h1>

	<?php wp_list_categories( array('title_li' => '') ); ?> 

	<?php if ( have_posts() ) : ?>

		<?php while ( have_posts() ) : the_post(); ?>
			
			<div>

				<span><?php echo get_the_date(); ?></span>
				<h2><?php the_title(); ?></h2>
				<?php if( has_post_thumbnail() ){ the_post_thumbnail(); } ?>
				<span>
					<?php if( get_the_category() ){
						foreach( get_the_category() as $cat ){
							echo '<a href="' . get_category_link( $cat->term_id ) . '">' . $cat->cat_name . '</a>' . ' - ';
						}
					} ?>
				</span>
				<?php the_excerpt(); ?>
				<a href='<?php the_permalink(); ?>'><?php _e('Read more'); ?></a>

			</div>
		
		<?php endwhile; ?>

		<?php previous_posts_link('Articles suivants'); ?>
		<?php next_posts_link('Articles précédents'); ?>

		<div class='pagination'>
			<?php echo paginate_links( array( 'prev_text' => '<b>‹</b> <span>' . 'Précédent' . '</span>', 'next_text'  => '<span>' . 'Suivant' . '</span> <b>›</b>' ) ); ?>
		</div>
	
	<?php else : ?>
				
		<p><?php _e('No posts yet'); ?></p>

	<?php endif; ?>

</div>

<?php get_footer(); ?>
<?php get_header(); ?>

	<div class='container'>
		<h1>Blog</h1>

		<?php if ( have_posts() ) : ?>

			<?php while ( have_posts() ) : the_post(); ?>

				<span><?php echo get_the_date(); ?></span>
				<h2><?php the_title(); ?></h2>
				<?php if ( has_post_thumbnail() ) { the_post_thumbnail(); } ?>
				<span><?php if(get_the_category()){ foreach((get_the_category()) as $cat) { echo $cat->cat_name . ' - '; } } ?></span>
				<?php the_excerpt(); ?>
				<a href="<?php the_permalink(); ?>">lire la suite</a>

			<?php endwhile; ?>

			<?php previous_posts_link('Articles suivants'); ?>
			<?php next_posts_link('Articles précédents'); ?>

			<div class='pagination'>
				<?php echo paginate_links( array( 'prev_text' => '<b>‹</b> <span>' . 'Précédent' . '</span>', 'next_text'  => '<span>' . 'Suivant' . '</span> <b>›</b>' ) ); ?>
			</div>

		<?php else : ?>

			<p>Pas d'articles</p>

		<?php endif; ?>
	</div>

<?php get_footer(); ?>

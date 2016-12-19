<?php get_header(); ?>

	<div class='container'>

		<?php if ( have_posts() ) : ?>

			<?php
				global $wp_query;
				$results = $wp_query->found_posts;
				$displayResults = $results > 1 ? $results . ' ' . __('results for', 'thinkovery') : '1 ' . __('result for', 'thinkovery');
			?>

			<p><?php echo $displayResults; ?> ...</p>
			<h1><?php echo '«&nbsp;' . get_search_query() . '&nbsp;»'; ?></h1>
			<?php get_search_form(); ?>

			<?php
				while ( have_posts() ) :
					the_post();
					get_template_part('includes/post');
				endwhile;
			?>

			<div class='pagination'>
				<?php echo paginate_links( array( 'prev_text' => __('Previous page', 'thinkovery'), 'next_text'  => __('Next page', 'thinkovery') ) ); ?>
			</div>

		<?php else : ?>

			<h1><?php echo __('The search for', 'thinkovery') . ' «&nbsp;' . get_search_query() . '&nbsp;» '. __("didn't return any results", 'thinkovery'); ?></h1>

			<?php get_search_form(); ?>

		<?php endif; ?>
	</div>

<?php get_footer(); ?>

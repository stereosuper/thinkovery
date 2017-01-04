<?php get_header(); ?>

	<div class='container'>

		<?php if ( have_posts() ) : ?>

			<?php
				global $wp_query;
				$results = $wp_query->found_posts;
				$displayResults = $results > 1 ? $results . ' ' . __('results for', 'thinkovery') : '1 ' . __('result for', 'thinkovery');
			?>

			<div class='container-small'>
				<p class='subtitle'><?php echo $displayResults; ?> ...</p>
				<h1><?php echo '«&nbsp;' . get_search_query() . '&nbsp;»'; ?></h1>
				<?php get_search_form(); ?>
			</div>

			<section class='posts-list'>
				<?php
					global $countPost, $formatLink;
					$countPost = 0;
					while ( have_posts() ) :
						the_post();
						$formatLink = get_post_format() === 'link' ? true : false;
						get_template_part('includes/post');
						if(!$formatLink){
							$countPost ++;
						}
					endwhile;
				?>

				<div class='pagination'>
					<?php echo paginate_links( array( 'prev_text' => __('Previous page', 'thinkovery') . "<svg class='icon'><use xlink:href='#icon-arrow-left'/></svg>", 'next_text'  => __('Next page', 'thinkovery') . "<svg class='icon'><use xlink:href='#icon-arrow-right'/></svg>", 'end_size' => 2, 'mid_size' => 0 ) ); ?>
				</div>
			</section>

		<?php else : ?>

			<div class='container-small'>
				<p class='subtitle'><?php _e('No results for', 'thinkovery'); ?> ...</p>
				<h1><?php echo '«&nbsp;' . get_search_query() . '&nbsp;»'; ?></h1>
				<?php get_search_form(); ?>
			</div>

		<?php endif; ?>
	</div>

<?php get_footer(); ?>

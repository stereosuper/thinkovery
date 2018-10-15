<?php get_header(); ?>

<?php
	// Create notification result
	if( !empty( get_search_query() ) ):
		$search = '«&nbsp;' . get_search_query();
		$search .= !empty( $_GET['category'] ) ? '<span>' . __(' in the category ', "thinkovery") . '</span>' . $_GET['category'] : '';
		$search .= !empty( $_GET['topic'] ) ? '<span>' . __(' in the topic ', "thinkovery") . '</span>' . $_GET['topic'] : '';
		$search .= '&nbsp;»';
	elseif( !empty( $_GET['category'] ) && !empty( $_GET['topic'] ) ):
		$search = '«&nbsp;';
		$search .= '<span>' . __(' the topic ', "thinkovery") . '</span>' . $_GET['topic'] . '<span>' . __(' in the category ', "thinkovery") . '</span>' . $_GET['category'] ;
		$search .= '&nbsp;»';
	else:
		$search = '«&nbsp;';
		$search .= !empty( $_GET['category'] ) ? '<span>' . __(' the category ', "thinkovery") . '</span>' . $_GET['category'] : '';
		$search .= !empty( $_GET['topic'] ) ? '<span>' . __(' the topic ', "thinkovery") . '</span>' . $_GET['topic'] : '';
		$search .= empty( $_GET['category'] ) && empty( $_GET['topic'] ) ? __(' All posts ', "thinkovery") : '';
		$search .= '&nbsp;»';
	endif;
?>

	<div class='container'>
	
	<?php if ( have_posts() ) : ?>
	
	<?php
		global $wp_query;
		$results = $wp_query->found_posts;
		$displayResults = $results > 1 ? $results . ' ' . __('results for', 'thinkovery') : '1 ' . __('result for', 'thinkovery');
	?>
	
	<div class='grid search-header'>
		<div class='col-3 search-params'>
			<a href='<?php echo get_permalink( get_option( 'page_for_posts' ) ); ?>' title='<?php the_field('blogTitle', 'options'); ?>' class='h1 back-link-blog'><?php the_field('blogTitle', 'options'); ?></a>
			<?php get_search_form(); ?>
		</div>
		<div class='col-8 container-small'>
			<p class='h1 search-params-title'><?php echo $displayResults; ?> ...</p>
			<p><?php echo $search;?></p>
		</div>
	</div>
	
	<section class='posts-list'>
		<div class='grid'>
			<?php
				global $countPost, $formatLink;
				$countPost = 0;
				while ( have_posts() ) :
					the_post();
					$formatLink = get_post_format() === 'link' ? true : false;
					echo "<div class='col-4 post-ratio-m'>";
					get_template_part('includes/post');
					echo "</div>";
					if(!$formatLink){
						$countPost ++;
					}
				endwhile;
			?>
		</div>
		<div class='pagination'>
			<?php echo paginate_links( array( 'prev_text' => __('Previous page', 'thinkovery') . "<svg class='icon'><use xlink:href='#icon-arrow-left'/></svg>", 'next_text'  => __('Next page', 'thinkovery') . "<svg class='icon'><use xlink:href='#icon-arrow-right'/></svg>", 'end_size' => 2, 'mid_size' => 0 ) ); ?>
		</div>
	</section>
	
	<?php else : ?>
	
	<div class='grid search-header'>
		<div class='col-3 search-params'>
			<?php get_search_form(); ?>
		</div>
		<div class='col-8 container-small'>
			<p class='h1 subtitle'><?php echo __('No results for', 'thinkovery'); ?> ...</p>
			<h1 class='h5'><?php echo $search; ?></h1>
		</div>
	</div>
	
	<?php endif; ?>
	</div>
	
	<?php get_footer(); ?>
	
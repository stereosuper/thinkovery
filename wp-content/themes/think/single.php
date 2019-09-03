<?php get_header(); ?>

<article class="container article">

	<?php if ( have_posts() ) : the_post(); ?>

		<div class="wrapper-collant" id="article">

			<div class="share sidebar" id="share">
				<span>Partager cet article :</span>
				<ul class="share-list">
					<li>
						<a href="https://twitter.com/share?url=<?php the_permalink(); ?>&text=<?php the_title(); ?>&via=<?php bloginfo("name"); ?>" rel="nofollow noreferrer noopener" target="_blank" title="Share on Twitter"><svg class="icon"><use xlink:href="#icon-twitter"/></svg></a>
					</li>
					<li>
						<a href='https://www.linkedin.com/shareArticle?mini=true&url=<?php the_permalink(); ?>&title=<?php the_title(); ?>' rel='nofollow noreferrer noopener' target='_blank' title='Share on Linkedin'><svg class="icon"><use xlink:href="#icon-linkedin"/></svg></a>
					</li>
					<li>
						<a href='https://www.facebook.com/sharer.php?u=<?php the_permalink(); ?>&t=<?php the_title(); ?>' rel='nofollow noreferrer noopener' target='_blank' title='Share on Facebook'><svg class="icon"><use xlink:href="#icon-facebook"/></svg></a>
					</li>
				</ul>
			</div>

			<div class='col-3-desk'>
				<div class='single-meta'>
					<div class="single-info">
						<span><?php echo get_the_date(); ?></span>
						<?php 
						$cats = get_the_category(); 
						if($cats):
							foreach($cats as $cat):
								echo '&nbsp;-&nbsp;<a href="' . get_category_link( $cat->term_id ) . '">' . $cat->cat_name . '</a>';
							endforeach;
						endif; ?>
					</div>
					<?php
						$sectors = get_the_terms($post, 'sector');
						$sorting_keys = array('conseil', 'conception', 'realisation', 'communication', 'evaluation');
						
						$sorted_sectors = [];
						if ($sectors) {
							$sorted_sectors = sort_sectors($sorting_keys, $sectors);
						}
						if( $sorted_sectors ) : ?>
							<div class='icons'>
								<?php foreach( $sorted_sectors as $sector ) : ?>
									<div class="icon-wrapper">
									<?php 
									switch( $sector->slug ) :
										case 'communication':
											?>
											<svg class="icon"><use href="#icon-rectangle"/></svg>
											<?php 
											break;
										case 'conseil':
											?>
											<svg class="icon"><use href="#icon-drop"/></svg>
											<?php 
											break;
										case 'conception':
											?>
											<svg class="icon"><use href="#icon-square"/></svg>
											<?php 
											break;
										case 'evaluation':
											?>
											<svg class="icon"><use href="#icon-circle"/></svg>
											<?php 
											break;
										case 'realisation':
											?>
											<svg class="icon"><use href="#icon-triangle"/></svg>
											<?php 
											break;
									endswitch;
									?>
									<span class="icon-name"><?php echo $sector->name ?></span>
									</div>
									<?php 
								endforeach; ?>
							</div>
						<?php endif;
					?>
				</div>

				<h1 class="blog-title"><?php the_title(); ?></h1>
				
				<div class='editor'>
					<?php the_content(); ?>
				</div>

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
		
		</div>

		<?php 
		$is_white_paper = get_field('is_white_paper');

		if ($is_white_paper):
			?>
			<div class="white-paper">
				<?php if ($has_image = get_field('white_paper_has_image') && $image = get_field('white_paper_image')): ?>
					<?php echo wp_get_attachment_image($image['ID'], 'full', false, array('class' => 'media')); ?>
				<?php endif; ?>
				<div class="content">
					<div class="white-paper-title">
						<?php if ($title_first_part = get_field('white_paper_title_first_part')): ?>
							<p class="first-part"><?php echo $title_first_part ?></p>
						<?php endif; ?>
						<?php if ($title_second_part = get_field('white_paper_title_second_part')): ?>
							<p class="second-part"><?php echo $title_second_part ?></p>
						<?php endif; ?>
					</div>
					<?php if ($pdf = get_field('white_paper_pdf')): ?>
						<a class="btn" href="<?php echo $pdf['url'] ?>" download><?php _e('Download this white paper', 'think') ?></a>
					<?php endif; ?>
				</div>
			</div>
			<?php
		endif;
		
		get_template_part('includes/post-related');
		
		?>
		
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
			
			<?php 
			if (!$is_white_paper && $newsletter_shortcode = get_field('newsletter_shortcode')) {
				echo do_shortcode($newsletter_shortcode);
			}
			?>
			
			<div class='comments'><?php comments_template(); ?></div>
		</div>
	
	<?php endif; ?>

</article>

<?php get_footer(); ?>
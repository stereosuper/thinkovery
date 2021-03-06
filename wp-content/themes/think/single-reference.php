<?php
get_header(); 

$ref_id = get_the_ID();
?>

<article class='container'>

	<?php if ( have_posts() ) : the_post(); ?>

		<div class='ref-cover'>
			<?php the_post_thumbnail(); ?>
			<div class='ref-logo'>
				<?php echo wp_get_attachment_image(get_field('logo'), 'full'); ?>
			</div>
		</div>

		<div class="ref-info">
			<div class='tags ref-tags'>
				<?php
					$tags = wp_get_object_terms($ref_id, 'reference_tag');
					foreach( $tags as $tag ){
						echo '<span>' . $tag->name . '</span>';
					}
				?>
			</div>
			<?php
				$categories = get_the_terms($ref_id, 'reference_cat');
				$sorting_keys = array('conseil', 'conception', 'realisation', 'communication', 'evaluation');
				
				$sorted_categories = [];
				if ($categories) {
					$sorted_categories = sort_sectors($sorting_keys, $categories);
				}
				if( $sorted_categories ) : ?>
				<div class="ref-categories">
					<div class='icons'>
						<?php foreach( $sorted_categories as $category ) : ?>
							<div class="icon-wrapper">
							<?php 
							switch( $category->slug ) :
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
							<span class="icon-name"><?php echo $category->name ?></span>
							</div>
							<?php 
						endforeach; ?>
					</div>
				</div>
			<?php endif; ?>
		</div>


		<h1 class='ref-title'><?php the_title(); ?></h1>

		<div class='editor'>
			<?php the_content(); ?>
		</div>
		
		<div class='ref-share'>
			<p class='ref-share-title'><?php _e('Share this post', 'think'); ?></p>
			<ul class='ref-share-list'>
				<li>
					<a href='https://www.facebook.com/sharer.php?u=<?php the_permalink(); ?>&t=<?php the_title(); ?>' rel='nofollow noreferrer noopener' target='_blank' title='Share on Facebook'><svg class="icon"><use xlink:href="#icon-facebook"/></svg></a>
				</li>
				<li>
					<a href='https://twitter.com/share?url=<?php the_permalink(); ?>&text=<?php the_title(); ?>&via=<?php bloginfo("name"); ?>' rel='nofollow noreferrer noopener' target='_blank' title='Share on Twitter'><svg class="icon"><use xlink:href="#icon-twitter"/></svg></a>
				</li>
				<li>
					<a href='https://www.linkedin.com/shareArticle?mini=true&url=<?php the_permalink(); ?>&title=<?php the_title(); ?>' rel='nofollow noreferrer noopener' target='_blank' title='Share on Linkedin'><svg class="icon"><use xlink:href="#icon-linkedin"/></svg></a>
				</li>
			</ul>
		</div>

		<?php $similars = get_field('similars'); if( $similars ) : ?>
			
			<div class='ref-similar'>
				<p class='h3'><?php _e('Similar study cases', 'think') ?></p>

				<?php foreach( $similars as $post ) : setup_postdata($post); ?>
					<a href='<?php the_permalink(); ?>' title='<?php the_title(); ?>'>
						<?php echo wp_get_attachment_image(get_field('logo'), 'full'); ?>
					</a>
				<?php endforeach; ?>
			</div>

		<?php wp_reset_postdata(); endif; ?>

		<?php /* if( have_rows('modules') ):
			while (have_rows('modules')):
				the_row();
				if (get_row_layout() == 'image_gallery_module'):
					$title = get_sub_field('image_gallery_title');
					$text = get_sub_field('image_gallery_text');
					?>
					<section class="module image-gallery-module">
						<h2 class="title"><?php echo $title ?></h2>
						<p><?php echo $text ?></p>
						<?php
						if( have_rows('image_gallery_images') ): ?>
						<ul class="gallery">
						<?php 
							while ( have_rows('image_gallery_images') ) : the_row();
							$image = get_sub_field('image');
							?>
							<li class="item"><?php echo wp_get_attachment_image($image['ID'], 'full'); ?></li>
							<?php endwhile; ?>
						</ul>
						<?php
						endif;
						?>
					</section>
				<?php
				elseif (get_row_layout() == 'text_image_gallery_module'):
					$title = get_sub_field('text_image_gallery_title');
					$text = get_sub_field('text_image_gallery_text');
					?>
					<section class="module text-image-gallery-module">
						<h2 class="title"><?php echo $title ?></h2>
						<p><?php echo $text ?></p>
						<?php
						if( have_rows('text_image_gallery_layouts') ): ?>
						<div class="gallery">
						<?php 
							while ( have_rows('text_image_gallery_layouts') ) : the_row();
								if (get_row_layout() == 'image_left_layout'):
									$image = get_sub_field('left_image');
									$text = get_sub_field('left_text');
									?>
									<div class="gallery-item image-left">
										<?php echo wp_get_attachment_image($image['ID'], 'full'); ?>
										<div class="gallery-item-text">
											<?php echo $text ?>
										</div>
									</div>
									<?php
								elseif (get_row_layout() == 'image_right_layout'):
									$image = get_sub_field('right_image');
									$text = get_sub_field('right_text');
									?>
									<div class="gallery-item image-right">
										<?php echo wp_get_attachment_image($image['ID'], 'full'); ?>
										<div class="gallery-item-text">
											<?php echo $text ?>
										</div>
									</div>
									<?php
								elseif (get_row_layout() == 'image_center_layout'):
									$image = get_sub_field('center_image');
									$text = get_sub_field('center_text');
									?>
									<div class="gallery-item image-center">
										<?php echo wp_get_attachment_image($image['ID'], 'full'); ?>
										<div class="gallery-item-text">
											<?php echo $text ?>
										</div>
									</div>
									<?php
								elseif (get_row_layout() == 'fifty_fifty_layout'):
									$first_image = get_sub_field('first_image');
									$first_text = get_sub_field('first_text');
									$second_image = get_sub_field('second_image');
									$second_text = get_sub_field('second_text');
									?>
									<div class="gallery-item fifty-fifty">
										<div class="first-fifty">
											<?php echo wp_get_attachment_image($first_image['ID'], 'full'); ?>
											<div class="gallery-item-text">
												<?php echo $first_text ?>
											</div>
										</div>
										<div class="last-fifty">
											<?php echo wp_get_attachment_image($second_image['ID'], 'full'); ?>
											<div class="gallery-item-text">
												<?php echo $second_text ?>
											</div>
										</div>
									</div>
									<?php 
								endif;
							endwhile;
						?>
						</div>
						<?php
						endif; ?>
					</section>
				<?php
				elseif (get_row_layout() == 'accordion_module'):
					$title = get_sub_field('accordion_title');
					$text = get_sub_field('accordion_text');
					$accordion_question_answer_list = get_sub_field('question_answer');
					?>
					<section class="module accordion-module js-accordion-module">
						<h2 class="title"><?php echo $title ?></h2>
						<p><?php echo $text ?></p>
						<?php
						if( have_rows('accordion_question_answer') ): ?>
						<ul>
						<?php 
							while ( have_rows('accordion_question_answer') ) : the_row();
							$question = get_sub_field('question');
							$answer = get_sub_field('answer');
							?>
							<li>
								<h3><?php echo $question ?><span class="indicator"></span></h3>
								<div class="answer js-answer"><?php echo $answer ?></div>
							</li>
							<?php endwhile; ?>
						</ul>
						<?php
						endif;
						?>
					</section>
					<?php 
				elseif (get_row_layout() == 'catch_phrase_module'):
					$catch_phrase = get_sub_field('catch_phrase');
					$catch_phrase_text = get_sub_field('catch_phrase_text');
					?>
					<section class="module catch-phrase-module">
						<h2 class="title"><?php echo $catch_phrase ?></h2>
						<p><?php echo $catch_phrase_text ?></p>
					</section>
					<?php
				elseif (get_row_layout() == 'quote_module'):
					$quote = get_sub_field('quote');
					$source_name = get_sub_field('quote_source_name');
					$source_position = get_sub_field('quote_source_position');
					?>
					<section class="module quote-module">
						<svg class="icon"><use href="#icon-quote"/></svg>
						<blockquote class="quote">
							<p><?php echo $quote ?></p>
						</blockquote>
						<cite class="source-name"><?php echo $source_name ?></cite>
						<p class="source-position"><?php echo $source_position ?></p>
					</section>
					<?php
				elseif (get_row_layout() == 'process_module'):
					$title = get_sub_field('process_title');
					$steps = get_sub_field('process_title');
					?>
					<section class="module process-module">
						<h2 class="title"><?php echo $title ?></h2>
						<?php
						if( have_rows('process_steps') ): ?>
						<ul class="process-list">
						<?php 
							while ( have_rows('process_steps') ) : the_row();
							$type = get_sub_field('step_type');
							switch ($type) {
								case 'conseil':
									$icon_name = 'drop';
									break;
								case 'conception':
									$icon_name = 'square';
									break;
								case 'realisation':
									$icon_name = 'triangle';
									break;
								case 'communication':
									$icon_name = 'rectangle';
									break;
								case 'evaluation':
									$icon_name = 'circle';
									break;
								default:
									break;
							}

							$title = get_sub_field('step_title');
							$text = get_sub_field('step_text');
							?>
							<li class="process-step">
								<svg class="icon <?php echo $icon_name ?>"><use href="#icon-<?php echo $icon_name ?>"/></svg>
								<h3 class="step-title"><?php echo $title ?></h3>
								<div class="step-text"><?php echo $text ?></div>
							</li>
							<?php endwhile; ?>
						</ul>
						<?php
						endif;
						?>
					</section>
					<?php
				elseif (get_row_layout() == 'checklist_module'):
					$title = get_sub_field('checklist_title');
					?>
					<section class="module checklist-module">
						<h2 class="title"><?php echo $title ?></h2>
						<?php
						if (have_rows('checklist_list')): ?>
						<ul>
						<?php 
							while (have_rows('checklist_list')): the_row();
							$item = get_sub_field('item');
							?>
							<li>
								<svg class="icon"><use href="#icon-checkmark"/></svg>
								<?php echo $item ?>
							</li>
							<?php
							endwhile; ?>
						</ul>
					</section>
					<?php 
					endif;
				endif;
			endwhile;
		endif; */ ?>
	<?php endif; ?>

</article>

<?php get_footer(); ?>

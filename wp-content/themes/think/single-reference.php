<?php get_header(); ?>

<article class='container'>

	<?php if ( have_posts() ) : the_post(); ?>

		<?php the_post_thumbnail(); ?>	

		<?php echo wp_get_attachment_image(get_field('logo'), 'full'); ?>

		<h1><?php the_title(); ?></h1>

		<?php the_content(); ?>

		<?php 
		if( have_rows('modules') ):
			while (have_rows('modules')):
				the_row();
				if (get_row_layout() == 'image_gallery_module'):

				elseif (get_row_layout() == 'text_image_gallery_module'):
					
				elseif (get_row_layout() == 'accordion_module'):
					$accordion_title = get_sub_field('title');
					$accordion_text = get_sub_field('text');
					$accordion_question_answer_list = get_sub_field('question_answer');
					?>
					<section class="accordion-module js-accordion-module">
						<h2><?php echo $accordion_title ?></h2>
						<p><?php echo $accordion_text ?></p>
						<?php
						if( have_rows('question_answer') ): ?>
						<ul>
						<?php 
							while ( have_rows('question_answer') ) : the_row();
							$question = get_sub_field('question');
							$answer = get_sub_field('answer');
							?>
							<li>
								<h3><?php echo $question ?><span class="indicator"></span></h3>
								<div class="answer js-answer"><?php echo $answer ?></div>
							</li>
							<?php
							endwhile; ?>
						</ul>
					</section>
					<?php 
					endif;
				elseif (get_row_layout() == 'catch_phrase_module'):
					$catch_phrase = get_sub_field('catch_phrase');
					$catch_phrase_text = get_sub_field('text');
					?>
					<section class="catch-phrase-module">
						<h2><?php echo $catch_phrase ?></h2>
						<p><?php echo $catch_phrase_text ?></p>
					</section>
					<?php
				elseif (get_row_layout() == 'quote_module'):
					$quote = get_sub_field('quote');
					$source_name = get_sub_field('source_name');
					$source_position = get_sub_field('source_position');
					?>
					<section class="quote-module">
						<blockquote>
							<p><?php echo $quote ?></p>
						</blockquote>
						<cite><?php echo $source_name ?></cite>
						<p><?php echo $source_position ?></p>
					</section>
					<?php
				elseif (get_row_layout() == 'checklist_module'):
					$title = get_sub_field('title');
					?>
					<section class="checklist-module">
						<h2><?php echo $title ?></h2>
						<?php
						if (have_rows('list')): ?>
						<ul>
						<?php 
							while (have_rows('list')): the_row();
							$item = get_sub_field('item');
							?>
							<li><?php echo $item ?></li>
							<?php
							endwhile; ?>
						</ul>
					</section>
					<?php 
					endif;
				endif;
			endwhile;
		endif;
		?>
	<?php else : ?>
				
		<h1>404</h1>

	<?php endif; ?>

</article>

<?php get_footer(); ?>

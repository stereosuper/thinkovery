<?php get_header(); ?>

<article class='container signle-post'>

	<?php if ( have_posts() ) : the_post(); ?>

		<div class='col-3-desk'>
			<div class='share'>
				<ul class='share-list'>
					<li>
						<a href='https://www.facebook.com/sharer.php?u=<?php the_permalink(); ?>&t=<?php the_title(); ?>' rel='nofollow' target='blank' title='Share on Facebook'><svg class="icon"><use xlink:href="#icon-facebook"/></svg></arti>
					</li>
					<li>
						<a href='https://twitter.com/share?url=<?php the_permalink(); ?>&text=<?php the_title(); ?>&via=<?php bloginfo("name"); ?>' rel='nofollow' target='_blank' title='Share on Twitter'><svg class="icon"><use xlink:href="#icon-twitter"/></svg></a>
					</li>
					<li>
						<a href='https://www.linkedin.com/shareArticle?mini=true&url=<?php the_permalink(); ?>&title=<?php the_title(); ?>' rel='nofollow' target='_blank' title='Share on Linkedin'><svg class="icon"><use xlink:href="#icon-linkedin"/></svg></a>
					</li>
				</ul>
			</div>

			<div>
				<?php echo get_the_date(); $cats = get_the_category(); if( $cats ){
					foreach( $cats as $cat ){
						echo ' - <a href="' . get_category_link( $cat->term_id ) . '">' . $cat->cat_name . '</a>';
					}
				} ?>
			</div>

			<h1><?php the_title(); ?></h1>
			
			<div class='editor'>
				<?php the_content(); ?>
			</div>

			<div class='tags'>
				<?php $tags = get_the_tags(); if( $tags ){
					$count = 0;
					foreach( $tags as $tag ){
						$count ++;
						if( $count > 1 ) echo ' - ';
						echo '<a href="' . get_tag_link( $tag->term_id ) . '">' . $tag->name . '</a>';
					}
				} ?>
			</div>
		</div>

		<?php get_template_part('includes/post-related'); ?>
		
		<div class='col-3-desk'>
			<div class='comments'><?php comments_template(); ?></div>
		</div>
	
	<?php endif; ?>

</article>

<?php get_footer(); ?>
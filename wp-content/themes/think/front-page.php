<?php get_header(); ?>
<div class='container'>
	<?php if ( have_posts() ) : the_post(); ?>
		<div class='col-3-desk'>
            <section id="home-intro" class="js-home-section home-section home-section-1" data-io="updateBorder">
                <h1><?php the_title(); ?></h1>
                <?php the_content(); ?>
            </section>
            <section id="home-learning-experience" class="js-home-section home-section home-section-2" data-io="updateBorder">
            </section>
            <section id="home-offers" class="js-home-section home-section home-section-3" data-io="updateBorder">
            </section>
            <section id="home-about-us" class="js-home-section home-section home-section-4" data-io="updateBorder">
            </section>
            <section id="home-experiences" class="js-home-section home-section home-section-5" data-io="updateBorder">
            </section>
		</div>
	<?php endif; ?>
</div>
<?php get_footer(); ?>
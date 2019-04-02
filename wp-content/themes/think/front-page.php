<?php get_header(); ?>

<div class='container'>

	<?php if ( have_posts() ) : the_post(); ?>

		<div class='col-3-desk'>
			<h1><?php the_title(); ?></h1>
            <?php the_content(); ?>
            <section id="home-intro" class="border-test border-test-1" data-io="updateBorder"></section>
            <section id="home-learning-experience" class="border-test border-test-2" data-io="updateBorder"></section>
            <section id="home-offers" class="border-test border-test-3" data-io="updateBorder"></section>
            <section id="home-about-us" class="border-test border-test-4" data-io="updateBorder"></section>
            <section id="home-experiences" class="border-test border-test-5" data-io="updateBorder"></section>
		</div>
	<?php endif; ?>

</div>

<?php get_footer(); ?>
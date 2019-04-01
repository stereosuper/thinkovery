<?php get_header(); ?>

<div class='container'>

	<?php if ( have_posts() ) : the_post(); ?>

		<div class='col-3-desk'>
			<h1><?php the_title(); ?></h1>
            <?php the_content(); ?>
            <section id="test-1" class="border-test border-test-1" data-io="updateBorder"></section>
            <section id="test-2" class="border-test border-test-2" data-io="updateBorder"></section>
            <section id="test-3" class="border-test border-test-3" data-io="updateBorder"></section>
            <section id="test-4" class="border-test border-test-4" data-io="updateBorder"></section>
            <section id="test-5" class="border-test border-test-5" data-io="updateBorder"></section>
		</div>
	<?php endif; ?>

</div>

<?php get_footer(); ?>
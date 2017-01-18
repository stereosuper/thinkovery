<?php get_header(); ?>

    <img src='<?php echo get_template_directory_uri(); ?>/layoutImg/404.jpg' alt="<?php _e("404 error - We wish Trump have watched MOOCs...", 'thinkovery'); ?>">
    <p class='h2'>
        <?php the_field('404', 'options'); ?>
    </p>

<?php get_footer(); ?>

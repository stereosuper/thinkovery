<?php 
/*
Template Name: References
*/

get_header();

$references_index = 0;
$references_query_args = array(
    'post_type' => 'reference',
    'posts_per_page' => -1
);
$references_query = new WP_Query($references_query_args);

$quote = get_field('references_quote');
$source_name = get_field('references_source_name');
$source_position = get_field('references_source_position');
$source_company = get_field('references_source_company');
?>

<div class='container clearfix'>
	<?php if (have_posts()): the_post(); ?>
        <h1><?php the_title(); ?></h1>
        <div class='col-2-desk'><?php the_content(); ?></div>
        <?php if ( $references_query->have_posts() ): ?>
            <ul class='references-list'>
                <?php while ($references_query->have_posts()): $references_query->the_post(); ?>
                    <li class='references-item'>
                        <a href='<?php the_permalink(); ?>' title='<?php the_title(); ?>'>
                            <?php echo wp_get_attachment_image(get_field('logo'), 'full'); ?>
                            <?php
                                $cats = get_the_terms($post, 'reference_cat');
                                if( $cats ) : ?>
                                    <div class='icons'>
                                    <?php foreach( $cats as $cat ) :
                                        switch( $cat->slug ){
                                            case 'communication':
                                                echo '<svg class="icon"><use href="#icon-rectangle"/></svg>';
                                                break;
                                            case 'conseil':
                                                echo '<svg class="icon"><use href="#icon-drop"/></svg>';
                                                break;
                                            case 'conception':
                                                echo '<svg class="icon"><use href="#icon-square"/></svg>';
                                                break;
                                            case 'evaluation':
                                                echo '<svg class="icon"><use href="#icon-circle"/></svg>';
                                                break;
                                            case 'realisation':
                                                echo '<svg class="icon"><use href="#icon-triangle"/></svg>';
                                                break;
                                        }
                                    endforeach; ?>
                                    </div>
                                <?php endif;
                            ?>
                            <div class='top'></div><div class='bot'></div><div class='left'></div>
                        </a>
                    </li>
                    <?php if ($references_index === 7 && $quote): ?>
                        <li class='references-quote'>
                            <div class="quote-content-wrapper">
                                <div class="quote-content">
                                    <svg class="icon"><use href="#icon-quote"/></svg>
                                    <blockquote class="quote">
                                        <p><?php echo $quote ?></p>
                                    </blockquote>
                                    <?php if ($source_name): ?>
                                        <cite class="source-name"><?php echo $source_name ?></cite>
                                    <?php endif; ?>
                                    <?php if ($source_position): ?>
                                        <p class="source-position"><?php echo $source_position ?></p>
                                    <?php endif; ?>
                                    <?php if ($source_company): ?>
                                        <p class="source-company"><?php echo $source_company ?></p>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </li>
                <?php
                        endif;
                    $references_index += 1;
                    endwhile;
                ?>
            </ul>
            <?php wp_reset_postdata(); ?>
        <?php endif; ?>
	<?php endif; ?>
</div>

<?php get_footer(); ?>

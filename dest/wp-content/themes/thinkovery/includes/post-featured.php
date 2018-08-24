<?php
    setup_postdata( $post );
    global $formatLink, $countPost;
?>

<div class='post <?php if($formatLink){ echo 'post-network'; if(get_field('video') && get_field('cover')){ echo ' post-video'; } }else{ if($countPost % 2 !== 0){ echo 'post-odd'; } } if( !has_post_thumbnail() ){ echo ' no-img'; } ?>'>
    <?php if(!$formatLink){ ?>
        <?php if( has_post_thumbnail() ){ ?>
            <a href='<?php the_permalink(); ?>' class='wrapper-post-img'>
                <?php if( has_post_thumbnail() ){ the_post_thumbnail('large'); } ?>
            </a>
        <?php } ?>

        <div class='wrapper-post-content'>
            <h2><a href='<?php the_permalink(); ?>'><?php the_title(); ?></a></h2>
            <footer class='footer-post'>
                <?php $cats = get_the_category(); if($cats){
                    $countCats = count($cats);
                    $i = 0;
                    foreach($cats as $cat){
                        $i ++;
                        echo '<a href="' . get_category_link($cat->term_id) . '">' . $cat->cat_name . '</a>';
                        if($i < $countCats){
                            echo ', ';
                        }
                    }
                } ?>
            </footer>
        </div>

    <?php }else{ ?>

        <?php if(get_field('video') && get_field('cover')){ ?>
            <div class='wrapper-video' data-id='<?php the_field('video'); ?>'>
                <div>
                    <div class='iframe'></div>
                    <div class='cover-video' style='background-image:url(<?php echo wp_get_attachment_url(get_field('cover')); ?>)'>
                        <svg class='icon hoop' style='fill:url(<?php echo $currentUrl; ?>#gradient-hoop)'><use xlink:href='#icon-hoop-thin'/></svg>
                    </div>
                </div>
            </div>
        <?php }else if( has_post_thumbnail() ){ ?>
            <a href='<?php the_field('link'); ?>' target='_blank' class='wrapper-post-img' style='background-image: url(<?php the_post_thumbnail_url('large'); ?>)'>
            </a>
        <?php } ?>

        <div class='wrapper-post-content <?php if(!has_post_thumbnail() ){ ?>no-img<?php } ?>'>
            <a href='<?php the_field('link'); ?>' target='_blank' class='btn-small'>
                <?php echo __('Find us on', 'thinkovery') . ' ' . get_field('network'); ?><svg class='icon'><use xlink:href='#icon-arrow-right'/></svg>
            </a>
        </div>

    <?php } ?>

</div>

<?php
    wp_reset_postdata();
?>

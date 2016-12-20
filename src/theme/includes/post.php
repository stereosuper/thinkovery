<?php global $formatLink, $countPost; ?>

<div class='post <?php if($formatLink){ echo 'post-network'; }else{ if($countPost % 2 !== 0){ echo 'post-odd'; } } ?>'>

    <?php if(!$formatLink){ ?>

        <time datetime='<?php echo get_the_date('Y-m-d'); ?>'><?php echo get_the_date(); ?></time>
        <i><?php _e('in', 'thinkovery'); ?></i>
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
        <h2><a href='<?php the_permalink(); ?>'><?php the_title(); ?></a></h2>

        <a href='<?php the_permalink(); ?>'>
            <?php if( has_post_thumbnail() ){ the_post_thumbnail(); } ?>
        </a>

        <?php if(get_field('intro')){ ?>
            <?php the_field('intro'); ?>
        <?php }else{
            the_excerpt();
        } ?>

    <?php }else{ ?>

        <a href='<?php the_field('link'); ?>' target='_blank'>
            <?php if( has_post_thumbnail() ){ the_post_thumbnail(); } ?>
        </a>

        <?php the_excerpt(); ?>

        <a href='<?php the_field('link'); ?>' target='_blank'>
            <?php echo __('Find us on', 'thinkovery') . ' ' . get_field('network'); ?>
        </a>

    <?php } ?>

</div>

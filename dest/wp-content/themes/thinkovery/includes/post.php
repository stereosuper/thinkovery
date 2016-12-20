<?php $formatLink = get_post_format() === 'link' ? true : false; ?>

<div class='post <?php if($formatLink) echo "post-network"; ?>'>
    <?php if(!$formatLink){ ?>
        <a href='<?php the_permalink(); ?>' class='wrapper-post-img'>
            <?php if( has_post_thumbnail() ){ the_post_thumbnail(); } ?>
        </a>
        <div class='wrapper-post-content'>
            <header class='header-post'>
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
            </header>

            <h2><a href='<?php the_permalink(); ?>'><?php the_title(); ?></a></h2>
            <?php if(get_field('intro')){ ?>
                <?php the_field('intro'); ?>
            <?php }else{
                the_excerpt();
            } ?>
        </div>
    <?php }else{ ?>
        <?php if( has_post_thumbnail() ){ ?>
            <a href='<?php the_field('link'); ?>' target='_blank' class='wrapper-post-img'>
                 <?php the_post_thumbnail(); ?>
            </a>
        <?php } ?>
        <div class='wrapper-post-content <?php if(!has_post_thumbnail() ){ ?>no-img<?php } ?>'>
            <?php the_excerpt(); ?>
            <a href='<?php the_field('link'); ?>' target='_blank'>
                <?php echo __('Find us on', 'thinkovery') . ' ' . get_field('network'); ?>
            </a>
        </div>
    <?php } ?>

</div>

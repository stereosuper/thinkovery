	</main>

    <footer role='contentinfo' id='footer'>
        <div class='container'>
            <p><?php the_field('ctaTxt', 'options') ?></p>
            <a href='<?php the_field('ctaLink', 'options') ?>'><?php the_field('ctaLinkTxt', 'options') ?></a>

            <span class='footer-title'><?php the_field('blogTitleFooter', 'options'); ?></span>
            <?php
                $blogFooter = new WP_Query(
                    array('posts_per_page' => 2,
                        'tax_query' => array(
                            array(
                                'taxonomy' => 'post_format',
                                'field'    => 'slug',
                                'terms'    => array( 'post-format-link' ),
                                'operator' => 'NOT IN'
                            ),
                        ),
                    )
                );
                if( $blogFooter->have_posts() ){ ?>
                    <ul>
                        <?php while( $blogFooter->have_posts() ){ $blogFooter->the_post(); ?>
                            <li><a href='<?php the_permalink(); ?>'><?php the_title(); ?></a></li>
                        <?php } ?>
                    </ul>
                <?php }
                wp_reset_query();
            ?>
            <a href='<?php the_field('blogLink', 'options'); ?>' class='btn'>
                <?php the_field('blogLinkTxt', 'options'); ?>
            </a>

            <span class='footer-title'><?php the_field('alsoTitle', 'options'); ?></span>
            <?php wp_nav_menu( array( 'theme_location' => 'secondary', 'container' => false, 'menu_class' => 'menu-footer' ) ); ?>
            <?php if( have_rows('social', 'options') ): ?>
                <ul>
                    <?php while ( have_rows('social', 'options') ) : the_row(); ?>
                        <li>
                            <a href='<?php the_sub_field('networkLink'); ?>'>
                                <?php the_sub_field('networkLinkTxt'); ?>
                            </a>
                        </li>
                    <?php endwhile; ?>
                </ul>
            <?php endif; ?>

            <a href='<?php the_field('legalLink', 'options'); ?>'>
                <?php the_field('legalLinkText', 'options'); ?>
            </a>

            <a href='mailto:<?php the_field('email', 'options'); ?>'>
                <?php the_field('email', 'options'); ?>
            </a>
            <a href='tel:<?php the_field('phone', 'options'); ?>'>
                <?php the_field('phoneDisplay', 'options'); ?>
            </a>
        </div>
	</footer>

	<?php wp_footer(); ?>

	</body>
</html>

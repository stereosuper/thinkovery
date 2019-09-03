        </main>

        <footer role='contentinfo' class='main-footer js-load-hidden' data-io="updateBorder" data-section-name="home-footer">
            <div class='newsletter-container'>
                <div class='container'>
                    <?php $news = get_field('newsletter', 'options'); if( $news['newsletterTitle'] ):  ?>
                        <div class='newsletter newsletter-footer' id='newsletter'>
                            <p class='newsletter-title'><?php echo $news['newsletterTitle']; ?></p>
                            <p><?php echo $news['newsletterSubtitle']; ?></p>
                            
                            <?php echo do_shortcode('[mc4wp_form id="2057048" element_id="newsletter-form"]'); ?>
                        </div>
                    <?php endif; ?>
                
                    <?php $contact = get_field('contact', 'options'); if( $contact['text'] ): ?>
                        <div class='footer-contact'>
                            <p><?php echo $contact['text'] ?></p>
                            <?php if( $contact['btn'] ) : ?>
                                <a href='<?php echo $contact['btn']['url']; ?>' class='btn'>
                                    <?php echo $contact['btn']['title']; ?>
                                </a>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>
                </div>
            </div>

            <div class='main-footer-container'>
                <div class='container'>
                    <div class='main-footer-top'>
                        <div class='footer-logo'>
                            <svg width="193" height="43" viewBox="0 0 155 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M147.229 33.3568C143 33.3568 139.772 31.2715 139.417 27.0675H143.291C143.807 29.0232 145.163 29.7071 147.133 29.7071C149.102 29.7071 151.103 28.1433 151.103 25.2756V22.8313C149.554 24.7541 147.907 25.2427 145.68 25.2427C141.903 25.2427 139.094 22.3098 139.094 17.3568V8.91719H143.033V17.3246C143.033 19.7682 144.356 21.6259 146.874 21.6259C149.328 21.6259 150.942 19.5729 150.942 17.1286V8.91719H154.848V25.3735C154.848 30.848 151.103 33.3568 147.229 33.3568ZM134.811 12.5256C131.993 12.5256 130.839 15.0619 130.839 19.3119V24.9667H126.696V8.9608H130.839V12.7311C131.654 9.81796 133.521 8.61793 135.321 8.61793C136.327 8.61793 137.113 8.81266 137.73 9.09997V12.9689C136.745 12.5256 135.218 12.5256 134.811 12.5256ZM112.401 18.352C112.672 20.4766 114.438 21.7794 116.781 21.7794C118.377 21.7794 120.006 21.0937 120.754 19.7228C121.738 20.2712 122.893 20.8882 123.911 21.4365C122.485 24.1783 119.429 25.3096 116.509 25.3096C111.993 25.3096 108.292 21.9508 108.292 16.9124C108.292 11.874 111.993 8.61793 116.509 8.61793C121.025 8.61793 124.556 11.874 124.556 16.9124C124.556 17.324 124.522 17.975 124.488 18.352H112.401ZM116.543 12.1141C114.37 12.1141 112.672 13.3482 112.367 15.5069H120.516C120.21 13.3135 118.581 12.1141 116.543 12.1141ZM98.7727 24.9667L92.1173 8.9608H96.5315L100.606 19.6201L104.68 8.9608H109.128L102.44 24.9667C98.7727 24.9667 98.7727 24.9667 98.7727 24.9667ZM67.3396 24.9667L61.3639 18.1118V24.9667H57.2555V0.255371H61.3639V13.7591L65.7441 8.9608H71.1087L64.4539 15.9871L72.5345 24.9667H67.3396ZM50.501 16.2613C50.501 13.9305 49.2789 12.6971 47.4791 12.6971C45.6113 12.6971 44.0158 13.6564 44.0158 16.4327V24.9667H39.8734V8.9608H44.0158V11.3256C44.8987 9.61188 46.9021 8.61793 48.7353 8.61793C52.4363 8.61793 54.6434 10.9833 54.6434 15.5069V24.9667C53.9643 24.9667 51.1461 24.9667 50.501 24.9667V16.2613ZM34.7662 6.06974C33.3064 6.06974 32.0842 4.97305 32.0842 3.53349C32.0842 2.12799 33.3064 1.0313 34.7662 1.0313C36.1926 1.0313 37.3807 2.12799 37.3807 3.53349C37.3807 4.97305 36.1926 6.06974 34.7662 6.06974ZM25.6845 16.2613C25.6845 13.9646 24.0203 12.6971 22.3227 12.6971C20.5911 12.6971 18.5202 13.6564 18.5202 16.4327V24.9667H14.3777V0.255371H18.5202V11.4283C19.2668 9.47509 21.8813 8.61793 23.4433 8.61793C27.5517 8.61793 29.8263 11.3603 29.8263 16.0558V24.9667C29.1478 24.9667 26.3631 24.9667 25.6845 24.9667V16.2613ZM3.32122 18.5234V12.3196H0.947449V8.9608H3.32122V4.34287L7.49712 4.29986V8.9608H11.3033V12.3196H7.49712V18.5921C7.46367 19.9629 7.837 21.1283 9.84043 21.1283L11.3684 20.8697V24.9667H9.22937C4.81513 24.9667 3.32122 22.6706 3.32122 18.5234ZM36.8037 24.9667H32.6953V8.9608H36.8037V24.9667Z" fill="#fff"/>
                                <path d="M81.8273 27.289C75.7247 27.289 70.7771 22.3412 70.7771 16.2385C70.7771 10.1353 75.7247 5.18799 81.8273 5.18799C87.9305 5.18799 92.8781 10.1353 92.8781 16.2385C92.8781 22.3412 87.9305 27.289 81.8273 27.289ZM81.948 8.66978C77.758 8.66978 74.3611 12.1042 74.3611 16.3408C74.3611 20.5774 77.758 24.0124 81.948 24.0124C86.138 24.0124 89.5343 20.5774 89.5343 16.3408C89.5343 12.1042 86.138 8.66978 81.948 8.66978Z" fill="#F7F2EA"/>
                            </svg>
                        </div>
                        <strong class='main-footer-baseline'><?php echo get_bloginfo('description'); ?></strong>
                        <div class='footer-shapes'>
                            <svg class='icon'><use xlink:href='#icon-drop'/></svg>
                            <svg class='icon'><use xlink:href='#icon-square'/></svg>
                            <svg class='icon'><use xlink:href='#icon-triangle'/></svg>
                            <svg class='icon'><use xlink:href='#icon-rectangle'/></svg>
                            <svg class='icon'><use xlink:href='#icon-circle'/></svg>
                        </div>
                    </div>


                    <?php $menus = get_field('menus', 'options'); ?>

                    <?php if( have_rows('menus', 'options') ): ?>
                        <?php while ( have_rows('menus', 'options') ): the_row(); ?>

                            <div class='main-footer-middle'>
                                <?php if( have_rows('footerMenu1', 'options') ): ?>
                                    <div class='footer-col-small'>
                                        <span><?php echo $menus['footerMenu1Title']; ?></span>
                                        <ul>
                                            <?php while ( have_rows('footerMenu1', 'options') ) : the_row(); ?>
                                                <?php if ($link = get_sub_field('link')) : ?>
                                                    <li><a href='<?php echo $link['url'] ?>'><?php echo $link['title'] ?></a></li>
                                                <?php endif; ?>
                                            <?php endwhile; ?>
                                        </ul>
                                    </div>
                                <?php endif; ?>

                                <?php if( have_rows('footerMenu2', 'options') ): ?>
                                    <div class='footer-col-small'>
                                        <span><?php echo $menus['footerMenu2Title']; ?></span>
                                        <ul>
                                            <?php while ( have_rows('footerMenu2', 'options') ) : the_row(); ?>
                                                <?php if ($link = get_sub_field('link')) : ?>
                                                    <li><a href='<?php echo $link['url'] ?>'><?php echo $link['title'] ?></a></li>
                                                <?php endif; ?>
                                            <?php endwhile; ?>
                                        </ul>
                                    </div>
                                <?php endif; ?>

                                <?php $blogFooter = new WP_Query(
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
                                        <div class='footer-col-big'>
                                            <span><?php echo $menus['footerBlogTitle']; ?></span>
                                            <ul>
                                                <?php while( $blogFooter->have_posts() ){ $blogFooter->the_post(); ?>
                                                    <li><a href='<?php the_permalink(); ?>'><?php the_title(); ?></a></li>
                                                <?php } ?>
                                            </ul>
                                        </div>
                                <?php } wp_reset_query(); ?>
                            </div>

                        <?php endwhile; ?>
                   <?php endif; ?>
                    
                    <div class='main-footer-bottom'>
                        <?php if( have_rows('social', 'options') ): ?>
                            <div class='container-social'>
                                <span><?php echo $menus['footerSocialTitle']; ?></span>
                                <ul class='social'>
                                    <?php while ( have_rows('social', 'options') ) : the_row(); ?>
                                        <li>
                                            <a href='<?php the_sub_field('link'); ?>' target='_blank' title='<?php the_sub_field('network'); ?>' rel="noreferrer noopener nofollow">
                                                <svg class='icon'><use xlink:href='#icon-<?php the_sub_field('icon'); ?>'/></svg>
                                            </a>
                                        </li>
                                    <?php endwhile; ?>
                                </ul>
                            </div>
                        <?php endif; ?>
                        
                        <?php
                            $phone = get_field('tel', 'options');
                            if( $phone['num'] ):
                        ?>
                            <a href='tel:<?php echo $phone['num']; ?>' rel="nofollow">
                                <?php echo $phone['displayNum'] ? $phone['displayNum'] : $phone['num']; ?>
                            </a>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </footer>


        <?php get_template_part('includes/icons'); ?>
        
        <script>
            <?php echo file_get_contents(get_template_directory_uri() . '/js/loading-script.js'); ?>
        </script>

        <?php wp_footer(); ?>

        <!-- Start of HubSpot Embed Code -->
        <script id='hs-script-loader' async defer src='//js.hs-scripts.com/4019924.js'></script>
        <!-- End of HubSpot Embed Code -->
        </body>
    </html>

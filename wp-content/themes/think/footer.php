        </main>

        <footer role='contentinfo' class='main-footer'>
            <div class='newsletter-container'>
                <div class='container'>
                    <?php if( have_rows('newsletter', 'options') ): $news = get_field('newsletter', 'options'); ?>
                        <div class='newsletter-footer' id='newsletter'>
                            <p class='newsletter-title'><?php echo $news['newsletterTitle']; ?></p>
                            <p><?php echo $news['newsletterSubtitle']; ?></p>
                            
                            <?php echo do_shortcode('[mc4wp_form id="2057048" element_id="newsletter-form"]'); ?>
                        </div>
                    <?php endif; ?>
                
                    <?php $contact = get_field('contact', 'options'); if( $contact ): ?>
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
                        <strong class='main-footer-baseline'><?php echo get_bloginfo('description'); ?></strong>
                    </div>


                    <?php $menus = get_field('menus', 'options'); ?>

                    <?php if( have_rows('menus', 'options') ): ?>
                        <?php while ( have_rows('menus', 'options') ): the_row(); ?>

                            <div class='main-footer-middle'>
                                <?php if( have_rows('footerMenu1', 'options') ): ?>
                                    <div class='col-1'>
                                        <span><?php echo $menus['footerMenu1Title']; ?></span>
                                        <ul>
                                            <?php while ( have_rows('footerMenu1', 'options') ) : the_row(); ?>
                                                <?php $link = get_sub_field('link'); ?>
                                                <li><a href='<?php echo $link['url'] ?>'><?php echo $link['title'] ?></a></li>
                                            <?php endwhile; ?>
                                        </ul>
                                    </div>
                                <?php endif; ?>

                                <?php if( have_rows('footerMenu2', 'options') ): ?>
                                    <div class='col-1'>
                                        <span><?php echo $menus['footerMenu2Title']; ?></span>
                                        <ul>
                                            <?php while ( have_rows('footerMenu2', 'options') ) : the_row(); ?>
                                                <?php $link = get_sub_field('link'); ?>
                                                <li><a href='<?php echo $link['url'] ?>'><?php echo $link['title'] ?></a></li>
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
                                        <div class='col-2'>
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
                            <div class='col-1'>
                                <span><?php echo $menus['footerSocialTitle']; ?></span>
                                <ul class='social'>
                                    <?php while ( have_rows('social', 'options') ) : the_row(); ?>
                                        <li>
                                            <a href='<?php the_sub_field('link'); ?>' target='_blank' title='<?php the_sub_field('network'); ?>'>
                                                <svg class='icon'><use xlink:href='#icon-<?php the_sub_field('icon'); ?>'/></svg>
                                            </a>
                                        </li>
                                    <?php endwhile; ?>
                                </ul>
                            </div>
                        <?php endif; ?>
                        
                        <?php
                            $phone = get_field('tel', 'options');
                            if( have_rows('tel', 'options') ):
                        ?>
                            <a href='tel:<?php echo $phone['num']; ?>'>
                                <?php echo $phone['displayNum'] ? $phone['displayNum'] : $phone['num']; ?>
                            </a>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </footer>

        <svg aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <symbol id='icon-youtube' viewBox='0 0 46 32'>
                    <title>YouTube</title>
                    <path d='M18.074 21.892l12.292-6.349-12.292-6.425zM22.773 0c2.844 0 5.592 0.038 8.241 0.114s4.593 0.157 5.829 0.241l1.854 0.102c0.017 0 0.161 0.013 0.432 0.038s0.466 0.051 0.584 0.076c0.119 0.025 0.317 0.064 0.597 0.114s0.521 0.119 0.724 0.203c0.203 0.085 0.44 0.195 0.711 0.33s0.533 0.301 0.787 0.495c0.254 0.195 0.499 0.419 0.736 0.673 0.102 0.102 0.233 0.258 0.394 0.47s0.406 0.707 0.736 1.486c0.33 0.779 0.554 1.634 0.673 2.565 0.135 1.084 0.241 2.239 0.317 3.467s0.123 2.188 0.14 2.883v4.47c0.017 2.455-0.135 4.91-0.457 7.365-0.119 0.931-0.33 1.774-0.635 2.527s-0.576 1.274-0.813 1.562l-0.356 0.432c-0.237 0.254-0.483 0.478-0.736 0.673s-0.516 0.356-0.787 0.483c-0.271 0.127-0.508 0.233-0.711 0.317s-0.444 0.152-0.724 0.203c-0.279 0.051-0.483 0.089-0.61 0.114s-0.322 0.051-0.584 0.076c-0.262 0.025-0.402 0.038-0.419 0.038-4.25 0.322-9.558 0.483-15.924 0.483-3.505-0.034-6.548-0.089-9.13-0.165s-4.279-0.14-5.092-0.19l-1.244-0.102-0.914-0.102c-0.61-0.085-1.071-0.169-1.384-0.254s-0.745-0.262-1.295-0.533c-0.55-0.271-1.029-0.618-1.435-1.041-0.102-0.102-0.233-0.258-0.394-0.47s-0.406-0.707-0.737-1.486c-0.33-0.779-0.554-1.634-0.673-2.565-0.135-1.084-0.241-2.239-0.317-3.467s-0.123-2.188-0.14-2.883v-4.47c-0.017-2.455 0.135-4.91 0.457-7.365 0.119-0.931 0.33-1.774 0.635-2.527s0.576-1.274 0.813-1.562l0.356-0.432c0.237-0.254 0.483-0.478 0.736-0.673s0.516-0.36 0.787-0.495c0.271-0.135 0.508-0.246 0.711-0.33s0.444-0.152 0.724-0.203c0.279-0.051 0.478-0.089 0.597-0.114s0.313-0.051 0.584-0.076c0.271-0.025 0.415-0.038 0.432-0.038 4.25-0.305 9.558-0.457 15.924-0.457z'/>
                </symbol>
                <symbol id='icon-twitter' viewBox='0 0 30 32'>
                    <title>Twitter</title>
                    <path d='M28.929 7.286c-0.786 1.143-1.768 2.161-2.893 2.982 0.018 0.25 0.018 0.5 0.018 0.75 0 7.625-5.804 16.411-16.411 16.411-3.268 0-6.304-0.946-8.857-2.589 0.464 0.054 0.911 0.071 1.393 0.071 2.696 0 5.179-0.911 7.161-2.464-2.536-0.054-4.661-1.714-5.393-4 0.357 0.054 0.714 0.089 1.089 0.089 0.518 0 1.036-0.071 1.518-0.196-2.643-0.536-4.625-2.857-4.625-5.661v-0.071c0.768 0.429 1.661 0.696 2.607 0.732-1.554-1.036-2.571-2.804-2.571-4.804 0-1.071 0.286-2.054 0.786-2.911 2.839 3.5 7.107 5.786 11.893 6.036-0.089-0.429-0.143-0.875-0.143-1.321 0-3.179 2.571-5.768 5.768-5.768 1.661 0 3.161 0.696 4.214 1.821 1.304-0.25 2.554-0.732 3.661-1.393-0.429 1.339-1.339 2.464-2.536 3.179 1.161-0.125 2.286-0.446 3.321-0.893z'/>
                </symbol>
                <symbol id='icon-linkedin' viewBox='0 0 27 32'>
                    <title>LinkedIn</title>
                    <path d='M6.232 11.161v17.696h-5.893v-17.696h5.893zM6.607 5.696c0.018 1.696-1.268 3.054-3.321 3.054v0h-0.036c-1.982 0-3.25-1.357-3.25-3.054 0-1.732 1.321-3.054 3.321-3.054 2.018 0 3.268 1.321 3.286 3.054zM27.429 18.714v10.143h-5.875v-9.464c0-2.375-0.857-4-2.982-4-1.625 0-2.589 1.089-3.018 2.143-0.143 0.393-0.196 0.911-0.196 1.446v9.875h-5.875c0.071-16.036 0-17.696 0-17.696h5.875v2.571h-0.036c0.768-1.214 2.161-2.982 5.339-2.982 3.875 0 6.768 2.536 6.768 7.964z'/>
                </symbol>
            </defs>
        </svg>

        <?php wp_footer(); ?>

        <!-- Start of HubSpot Embed Code -->
        <script id='hs-script-loader' async defer src='//js.hs-scripts.com/4019924.js'></script>
        <!-- End of HubSpot Embed Code -->

        </body>
    </html>

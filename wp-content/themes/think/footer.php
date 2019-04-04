        </main>

        <footer role='contentinfo' class='main-footer'>
            <div class='newsletter-container'>
                <div class='container'>
                    <?php $news = get_field('newsletter', 'options'); if( $news['newsletterTitle'] ):  ?>
                        <div class='newsletter-footer' id='newsletter'>
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
                                                <?php $link = get_sub_field('link'); ?>
                                                <li><a href='<?php echo $link['url'] ?>'><?php echo $link['title'] ?></a></li>
                                            <?php endwhile; ?>
                                        </ul>
                                    </div>
                                <?php endif; ?>

                                <?php if( have_rows('footerMenu2', 'options') ): ?>
                                    <div class='footer-col-small'>
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
                            if( $phone['num'] ):
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
                <symbol id="icon-arrow" viewBox="0 0 48 32">
                    <path fill="none" stroke-linejoin="miter" stroke-linecap="butt" stroke-miterlimit="4" stroke-width="4.8" d="M27.808 28.707l15.133-13.202-15.133-13.202"/>
                    <path fill="none" stroke-linejoin="miter" stroke-linecap="butt" stroke-miterlimit="4" stroke-width="4.8" d="M42.941 15.397h-41.93"/>
                </symbol>
            </defs>
        </svg>

        <?php wp_footer(); ?>

        <!-- Start of HubSpot Embed Code -->
        <script id='hs-script-loader' async defer src='//js.hs-scripts.com/4019924.js'></script>
        <!-- End of HubSpot Embed Code -->

        </body>
    </html>

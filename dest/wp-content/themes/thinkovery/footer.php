	</main>

    <footer role='contentinfo' id='footer' <?php if(is_page_template('contact.php')){ echo "class='footer-contact'";} ?>>
        <?php if(!is_page_template('contact.php')){ ?>
            <div class='footer-top'>
                <div class='container'>
                    <div class='container-medium'>
                        <p><?php the_field('ctaTxt', 'options'); ?></p>
                        <a href='<?php the_field('ctaLink', 'options'); ?>' class='btn'>
                            <?php the_field('ctaLinkTxt', 'options'); ?><svg class='icon'><use xlink:href='#icon-arrow-right'/></svg><i></i>
                        </a>
                    </div>
                </div>
            </div>
        <?php } ?>
        <div class='container'>
            <div class='container-medium'>
                <div class='grid'>
                    <div class='col-7'>
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
                        <a href='<?php the_field('blogLink', 'options'); ?>' class='btn-small'>
                            <?php the_field('blogLinkTxt', 'options'); ?>
                            <svg class='icon'><use xlink:href='#icon-arrow-right'/></svg>
                        </a>
                    </div>
                    <div class='col-2'>
                        <span class='footer-title'><?php the_field('alsoTitle', 'options'); ?></span>
                        <?php wp_nav_menu( array( 'theme_location' => 'secondary', 'container' => false, 'menu_class' => 'menu-footer', 'walker' => new rc_scm_walker ) ); ?>
                        <?php if( have_rows('social', 'options') ): ?>
                            <ul class='social'>
                                <?php while ( have_rows('social', 'options') ) : the_row(); ?><li>
                                    <a href='<?php the_sub_field('networkLink'); ?>' target='_blank'>
                                        <?php the_sub_field('networkLinkTxt'); ?>
                                        <svg class='icon'><use xlink:href='#icon-<?php the_sub_field('networkSlug'); ?>'/></svg>
                                    </a>
                                </li><?php endwhile; ?>
                            </ul>
                        <?php endif; ?>
                    </div>
                </div>

                <a href='<?php the_field('legalLink', 'options'); ?>' class='link-small'>
                    <?php the_field('legalLinkText', 'options'); ?>
                </a>

                <div class='contact-footer'>
                    <a href='mailto:<?php the_field('email', 'options'); ?>'>
                        <?php the_field('email', 'options'); ?>
                    </a>
                    <div class='tel-footer'>
                        <a href='tel:<?php the_field('phone', 'options'); ?>'>
                            <?php the_field('phoneDisplay', 'options'); ?>
                        </a>
                    </div>
                </div>
            </div>
        </div>
	</footer>

    <?php global $themeColors, $declis, $currentDecli; ?>

    <svg style='position:absolute;width:0;height:0;overflow:hidden'>
        <defs>
            <radialGradient id='gradient-hoop' cx='85%' cy='85%' fx='85%' fy='85%'>
                <stop offset='0%' stop-color='<?php echo $themeColors[$declis[$currentDecli]['mainColor']][1]; ?>' data-theme-second=''/>
                <stop offset='100%' stop-color='<?php echo $themeColors[$declis[$currentDecli]['mainColor']][0]; ?>' data-theme-main=''/>
            </radialGradient>
            <symbol id='icon-search' viewBox='0 0 32 32'>
                <title>Search</title>
                <path d='M0.32 11.456c-0.032 6.24 4.992 11.328 11.2 11.36 2.368 0.032 4.672-0.704 6.624-2.080l10.72 10.848c0.288 0.288 0.704 0.448 1.088 0.448 0.448 0 0.864-0.16 1.184-0.448 0.64-0.544 0.704-1.504 0.16-2.112-0.064-0.064-0.096-0.128-0.16-0.16l-10.688-10.88c1.568-2.016 2.432-4.48 2.4-7.040 0.032-3.008-1.152-5.888-3.328-8-2.080-2.176-4.96-3.392-7.968-3.36-2.976-0.032-5.856 1.184-7.936 3.36-2.144 2.144-3.328 5.056-3.296 8.064zM3.2 11.456c-0.032-2.24 0.832-4.416 2.464-6.016 3.168-3.264 8.416-3.296 11.68-0.096l0.096 0.096c3.264 3.328 3.264 8.672 0 12-3.2 3.264-8.448 3.328-11.712 0.096l-0.096-0.096c-1.6-1.568-2.464-3.744-2.432-5.984zM9.344 6.048c0.576-0.32 1.28-0.096 1.6 0.448l0.096 0.192c0.32 0.576 0.096 1.312-0.48 1.632-0.032 0.032-0.064 0.032-0.096 0.064-0.224 0.064-0.416 0.16-0.608 0.288-0.384 0.256-0.736 0.608-0.992 1.024-0.32 0.448-0.448 1.024-0.416 1.568 0.16 0.608-0.192 1.248-0.8 1.408-0.064 0.032-0.16 0.032-0.224 0.032h-0.192c-0.608 0.064-1.184-0.384-1.248-1.024v-0.096c-0.384-2.4 0.736-4.256 3.36-5.536zM9.6 13.952c0.384 0 0.768 0.16 1.056 0.448 0.32 0.224 0.48 0.608 0.448 0.992 0 0.384-0.16 0.768-0.448 1.056-0.288 0.256-0.672 0.416-1.056 0.384-0.352 0-0.736-0.128-0.992-0.384-0.288-0.256-0.48-0.64-0.448-1.056-0.032-0.384 0.16-0.736 0.448-0.992 0.256-0.288 0.608-0.48 0.992-0.448z'/>
            </symbol>
            <symbol id='icon-chat' viewBox='0 0 32 32'>
                <title>Chat</title>
                <path d='M30.592 8h-13.504v-3.2c0-0.576-0.736-1.312-1.344-1.312h-14.592c-0.576 0-1.056 0.736-1.056 1.312v8.864c0 0.576 0.48 1.248 1.056 1.248h2.112l2.784 3.008c0.192 0.224 0.48 0.288 0.8 0.288 0.128 0 0.192-0.064 0.288-0.096 0.416-0.16 0.608-0.576 0.608-0.992v-2.208h2.080v6.432c0 0.768 0.8 1.536 1.568 1.536h9.536v4.224c0 0.576 0.288 1.088 0.8 1.28 0.16 0.064 0.32 0.096 0.48 0.096 0.384 0 0.736-0.064 0.992-0.352l5.184-5.248h2.208c0.768 0 1.408-0.768 1.408-1.536v-11.648c0-0.768-0.64-1.696-1.408-1.696zM6.816 12.832c-0.576 0-1.152 0.256-1.152 0.832v0.704l-1.184-1.28c-0.192-0.224-0.416-0.256-0.736-0.256h-1.568v-7.264h12.48v2.432h-3.296c-0.768 0-1.568 0.928-1.568 1.696v3.136h-2.976zM29.216 20.128h-1.44c-0.384 0-0.704 0.064-0.96 0.352l-3.136 3.2v-2.304c0-0.768-0.704-1.248-1.504-1.248h-9.6v-9.376h16.64v9.376zM14.592 13.888c0-0.576 0.48-1.056 1.056-1.056h6.624c0.576 0 1.056 0.448 1.056 1.056s-0.48 1.024-1.056 1.024h-6.624c-0.576 0-1.056-0.448-1.056-1.024zM24.672 14.592c-0.192-0.192-0.32-0.48-0.32-0.736 0-0.288 0.128-0.544 0.32-0.736 0.384-0.384 1.088-0.384 1.472 0 0.192 0.192 0.32 0.448 0.32 0.736s-0.128 0.544-0.32 0.736c-0.192 0.192-0.48 0.32-0.736 0.32s-0.544-0.128-0.736-0.32z'/>
            </symbol>
            <symbol id='icon-diamond' viewBox='0 0 32 32'>
                <title>Diamond</title>
                <path d='M31.616 10.848l-5.888-6.24c-0.256-0.288-0.64-0.448-1.024-0.448h-17.44c-0.384 0-0.736 0.16-1.024 0.448l-5.856 6.24c-0.512 0.544-0.512 1.408 0.032 1.952l14.592 14.624c0.256 0.256 0.608 0.416 0.992 0.416s0.736-0.16 0.992-0.416l14.592-14.624c0.544-0.544 0.544-1.408 0.032-1.952zM9.536 12.864l2.56 7.52-7.52-7.52h4.96zM17.184 6.944l2.24 3.488h-6.848l2.24-3.488h2.368zM16 24.48v-0.096l-3.904-11.52h7.808l-3.904 11.52v0.096zM22.464 12.864h4.96l-7.52 7.52 2.56-7.52zM27.552 10.432h-5.28l-2.24-3.488h4.096l3.424 3.488zM7.872 6.944h4.096l-2.24 3.488h-5.28l3.424-3.488z'/>
            </symbol>
            <symbol id='icon-heart' viewBox='0 0 32 32'>
                <title>Heart</title>
                <path d='M31.168 7.072c-1.536-3.392-4.736-5.568-8.192-5.568s-5.664 1.504-6.976 3.168c-1.312-1.632-3.552-3.168-6.976-3.168-3.456 0-6.656 2.176-8.16 5.568-1.568 3.52-0.896 7.456 1.824 10.496 6.496 7.328 12.256 12.512 12.32 12.576 0.288 0.256 0.64 0.384 0.992 0.384s0.704-0.128 0.992-0.384c0.064-0.064 5.824-5.248 12.352-12.544 2.72-3.072 3.392-7.008 1.824-10.528zM27.104 15.584c-4.8 5.408-9.216 9.632-11.104 11.424-1.888-1.76-6.304-5.984-11.104-11.392-1.952-2.176-2.432-4.864-1.344-7.328 1.024-2.272 3.2-3.808 5.44-3.808 4.448 0 5.44 3.328 5.536 3.712 0.16 0.672 0.768 1.12 1.44 1.12s1.28-0.48 1.44-1.12c0.128-0.384 1.12-3.712 5.568-3.712 2.24 0 4.416 1.536 5.44 3.808 1.12 2.464 0.64 5.12-1.312 7.296zM26.752 11.296c0.032 0.704-0.48 1.344-1.216 1.376h-0.096c-0.672 0-1.248-0.544-1.312-1.216-0.128-2.112-1.504-2.464-1.792-2.496-0.704-0.096-1.216-0.768-1.088-1.472 0.096-0.704 0.768-1.216 1.472-1.12 1.312 0.192 3.808 1.44 4.032 4.928zM24.96 13.44c0.288 0.288 0.448 0.672 0.448 1.056s-0.16 0.768-0.448 1.056c-0.288 0.288-0.672 0.448-1.056 0.448s-0.768-0.16-1.056-0.448c-0.288-0.288-0.448-0.672-0.448-1.056s0.16-0.768 0.448-1.056c0.288-0.288 0.672-0.448 1.056-0.448 0.384 0.032 0.768 0.192 1.056 0.448z'/>
            </symbol>
            <symbol id='icon-thumb' viewBox='0 0 32 32'>
                <title>Thumb Up</title>
                <path d='M20.832 32c-4.32 0-11.104-1.44-12.768-2.624-0.384-0.256-0.576-0.672-0.576-1.12v-13.6c0-0.416 0.192-0.832 0.544-1.088 0.096-0.096 2.56-1.984 5.088-3.392 3.168-1.728 5.344-4.192 5.856-5.696 0.64-1.92 1.504-4.48 4.352-4.48 1.344 0 2.464 0.768 3.040 2.112 1.184 2.688-0.064 6.464-2.144 9.408 1.408 0.32 3.136 0.768 4.16 1.088 1.888 0.608 3.168 1.952 3.424 3.68 0.256 1.76-0.64 3.488-2.464 4.864-1.344 3.648-3.68 9.44-5.376 10.368-0.608 0.32-1.76 0.48-3.136 0.48zM10.272 27.424c2.656 1.12 10.784 2.272 12.32 1.664 0.8-0.736 2.848-5.376 4.288-9.312 0.096-0.288 0.288-0.512 0.544-0.672 1.152-0.768 1.76-1.664 1.632-2.432-0.096-0.608-0.64-1.152-1.504-1.408-1.76-0.544-6.080-1.504-6.112-1.504-0.48-0.096-0.896-0.48-1.024-0.96-0.16-0.48-0.032-0.992 0.32-1.376 3.136-3.36 3.712-6.848 3.104-8.224-0.192-0.416-0.384-0.416-0.48-0.416-0.704 0-1.024 0.48-1.728 2.56-0.832 2.432-3.712 5.344-7.168 7.264-1.664 0.928-3.36 2.112-4.192 2.72v12.096zM4.768 28.352v-13.856c0-1.248-1.024-2.272-2.272-2.272s-2.272 1.024-2.272 2.272v13.888c0 1.248 1.024 2.272 2.272 2.272 1.248-0.032 2.272-1.056 2.272-2.304z'/>
            </symbol>
            <symbol id='icon-map' viewBox='0 0 23 32'>
                <title>Map</title>
                <path d='M19.104 2.752c-1.984-1.76-4.736-2.752-7.744-2.752s-5.76 0.992-7.744 2.752c-2.368 2.144-3.616 5.408-3.616 9.408 0 8.736 9.952 18.976 10.4 19.424 0.256 0.256 0.608 0.416 0.992 0.416 0.352 0 0.704-0.16 0.992-0.416 0.384-0.416 10.336-10.688 10.336-19.424 0-4-1.248-7.264-3.616-9.408zM11.36 28.576c-0.928-1.056-2.4-2.784-3.872-4.896-3.104-4.448-4.736-8.416-4.736-11.52 0-8.704 6.592-9.376 8.608-9.376 8 0 8.608 7.168 8.608 9.376 0 6.144-6.176 13.664-8.608 16.416zM11.36 6.016c-3.008 0-5.472 2.528-5.472 5.632s2.464 5.632 5.472 5.632c3.008 0 5.472-2.528 5.472-5.632s-2.432-5.632-5.472-5.632zM11.36 14.816c-1.696 0-3.072-1.44-3.072-3.2s1.376-3.2 3.072-3.2 3.072 1.44 3.072 3.2-1.376 3.2-3.072 3.2z'/>
            </symbol>
            <symbol id='icon-phone' viewBox='0 0 32 32'>
                <title>Phone</title>
                <path d='M31.104 4.096l-0.064-0.064-3.84-3.328c-0.512-0.512-1.28-0.736-2.048-0.672-0.704 0.064-1.376 0.384-1.856 0.832-0.032 0.032-0.064 0.064-0.096 0.128l-3.744 4.736c-0.992 1.056-0.96 2.72 0.064 3.744 0.064 0.064 0.128 0.128 0.224 0.192l1.92 1.28c-0.16 0.672-1.152 2.592-4.672 6.112s-5.44 4.512-6.112 4.672l-1.28-1.92c-0.064-0.064-0.128-0.16-0.192-0.224-1.024-1.024-2.688-1.056-3.744-0.064l-4.672 3.712c-0.032 0.032-0.096 0.064-0.128 0.096-1.088 1.088-1.152 2.848-0.16 3.872l3.328 3.84c0.032 0.032 0.032 0.064 0.064 0.064 0.672 0.672 1.632 0.896 2.72 0.896 1.952 0 4.192-0.768 5.376-1.248 2.272-0.896 6.72-3.040 11.136-7.456 3.264-3.264 5.92-7.232 7.456-11.136 0.704-1.792 2.176-6.24 0.32-8.064zM21.312 21.312c-6.592 6.56-13.984 8.352-15.232 7.744l-3.232-3.68 4.64-3.68 1.248 1.888c0.032 0.032 0.064 0.064 0.064 0.096 0.416 0.512 1.056 0.832 1.76 0.864s2.784 0.16 8.448-5.504c1.408-1.408 5.664-5.664 5.504-8.448-0.032-0.704-0.352-1.344-0.864-1.76-0.032-0.032-0.064-0.064-0.096-0.064l-1.888-1.248 3.68-4.672 3.712 3.232c0.608 1.248-1.152 8.64-7.744 15.232z'/>
            </symbol>
            <symbol id='icon-hoop-very-thin' viewBox='0 0 32 32'>
                <title>Hoop very thin</title>
                <path d='M16 32.001c-0.001 0-0.001 0-0.002 0-8.837 0-16-7.164-16-16s7.164-16 16-16c8.837 0 16 7.164 16 16 0 0 0 0 0 0s0 0 0 0.001c0 8.836-7.163 15.999-15.999 15.999zM16.001 2.391c-0.001 0-0.002 0-0.003 0-7.517 0-13.61 6.093-13.61 13.61s6.093 13.61 13.61 13.61c7.517 0 13.61-6.093 13.61-13.61 0-0 0-0.001 0-0.001 0-7.515-6.092-13.608-13.607-13.609z'/>
            </symbol>
            <symbol id='icon-hoop-thin' viewBox='0 0 32 32'>
                <title>Hoop thin</title>
                <path d='M16 31.999c-8.836-0.001-15.998-7.164-15.998-16s7.163-16 16-16 16 7.163 16 16c0 8.837-7.163 16-16 16-0.001 0-0.001 0-0.002 0zM16.008 3.014c-0 0-0 0-0 0-7.174 0-12.99 5.816-12.99 12.99s5.816 12.99 12.99 12.99c7.174 0 12.99-5.816 12.99-12.99 0-0 0-0 0-0 0-7.174-5.816-12.99-12.99-12.991z'/>
            </symbol>
            <symbol id='icon-star' viewBox='0 0 32 32'>
                <title>Star</title>
                <path d='M31.714 12.122c-0.23-0.27-0.538-0.468-0.889-0.56-0.246-0.070-0.516-0.112-0.794-0.118l-9.025-0c-0.163-0.008-0.311-0.063-0.434-0.151-0.131-0.093-0.228-0.231-0.271-0.39l-2.591-9.332c-0.108-0.316-0.24-0.589-0.401-0.843-0.255-0.433-0.735-0.729-1.285-0.729s-1.030 0.296-1.29 0.738c-0.162 0.244-0.285 0.52-0.354 0.817l-2.631 9.344c-0.044 0.165-0.141 0.302-0.272 0.395-0.123 0.088-0.271 0.142-0.432 0.15l-9.023 0c-0.007-0-0.014-0-0.022-0-0.374 0-0.73 0.073-1.057 0.205-0.228 0.113-0.436 0.274-0.606 0.47-0.197 0.256-0.315 0.579-0.316 0.928 0.169 0.496 0.493 0.901 0.914 1.169 0.022 0.177 0.071 0.335 0.148 0.474l7.254 4.773c0.193 0.155 0.315 0.39 0.315 0.654 0 0.014-0 0.028-0.001 0.042l0 0.163-2.825 9.211c-0.090 0.244-0.15 0.526-0.165 0.82-0.001 0.022-0.001 0.039-0.001 0.056 0 0.361 0.118 0.695 0.318 0.964 0.259 0.359 0.681 0.592 1.157 0.592 0.019 0 0.039-0 0.058-0.001 0.547-0.022 1.041-0.244 1.41-0.596l7.1-6.002c0.075-0.083 0.183-0.135 0.304-0.135 0.017 0 0.034 0.001 0.051 0.003 0.014-0.002 0.032-0.003 0.050-0.003 0.132 0 0.252 0.051 0.34 0.135l7.453 6.052c0.375 0.338 0.866 0.553 1.407 0.579l0.045 0c0.483-0.021 0.906-0.262 1.173-0.624 0.176-0.263 0.278-0.581 0.278-0.923 0-0.020-0-0.040-0.001-0.060 0-0.003 0-0.009 0-0.016 0-0.315-0.061-0.615-0.171-0.89l-3.171-9.245v-0.149c-0-0.004-0-0.010-0-0.015 0-0.267 0.122-0.505 0.313-0.662l7.218-4.731c0.239-0.158 0.446-0.338 0.625-0.542 0.243-0.299 0.39-0.68 0.395-1.094 0.002-0.027 0.003-0.057 0.003-0.088 0-0.32-0.113-0.613-0.302-0.842z'/>
            </symbol>
            <symbol id='icon-profile' viewBox='0 0 27 32'>
                <title>Profile</title>
                <path d='M0 32l0.073-1.47c0-6.731 3.988-10.271 9.468-12.142-1.378-1.222-2.287-2.947-2.437-4.885-0.015-0.025-0.027-0.008-0.040-0.008-1.119-0.272-1.936-1.265-1.936-2.449 0-0.138 0.011-0.273 0.032-0.405-0.002-1.272-0.146-2.357 0.641-2.691l-0.094-0.852c0-3.925 4.125-7.098 7.634-7.098s7.791 3.173 7.791 7.098l-0.094 0.852c0.787 0.334 0.643 1.42 0.643 2.706 0.019 0.117 0.030 0.252 0.030 0.39 0 1.184-0.817 2.177-1.919 2.445-0.031 0.004-0.042-0.013-0.056-0.013-0.151 1.963-1.060 3.688-2.431 4.904 5.471 1.877 9.46 5.418 9.46 12.149l-0.047 1.47h-26.722z'/>
            </symbol>
            <symbol id='icon-hoop' viewBox='0 0 32 32'>
                <title>Hoop</title>
                <path d='M16 4.48c6.362 0 11.52 5.158 11.52 11.52s-5.158 11.52-11.52 11.52c-6.362 0-11.52-5.158-11.52-11.52s5.158-11.52 11.52-11.52zM16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16z'/>
            </symbol>
            <symbol id='icon-envelope' viewBox='0 0 43 32'>
                <title>Envelope</title>
                <path d='M40 26.667c0 0.16 0 0.267-0.053 0.373s-0.053 0.267-0.107 0.373l-11.84-12.747 12-9.333v21.333zM4.747 29.227l12.053-12.8 4.533 3.413 4.373-3.467 12.213 12.853c-0.053 0.053-1.813 0.053-5.227 0.053s-7.2 0-11.307 0-7.893 0-11.307 0-5.28 0-5.333-0.053zM2.667 26.667v-21.333l12 9.333-11.893 12.747c-0.053-0.107-0.053-0.213-0.107-0.373s0-0.213 0-0.373zM38.667 2.667l-17.333 13.333-17.333-13.333h34.667zM37.333 0h-32c-1.493 0-2.72 0.533-3.787 1.547-1.013 1.067-1.547 2.293-1.547 3.787v21.333c0 1.493 0.533 2.72 1.547 3.787 1.067 1.067 2.293 1.547 3.787 1.547h32c1.493 0 2.72-0.533 3.787-1.547 1.067-1.067 1.547-2.293 1.547-3.787v-21.333c0-1.493-0.533-2.72-1.547-3.787-1.067-1.013-2.293-1.547-3.787-1.547z'/>
            </symbol>
            <symbol id='icon-twitter' viewBox='0 0 30 32'>
                <title>Twitter</title>
                <path d='M28.929 7.286c-0.786 1.143-1.768 2.161-2.893 2.982 0.018 0.25 0.018 0.5 0.018 0.75 0 7.625-5.804 16.411-16.411 16.411-3.268 0-6.304-0.946-8.857-2.589 0.464 0.054 0.911 0.071 1.393 0.071 2.696 0 5.179-0.911 7.161-2.464-2.536-0.054-4.661-1.714-5.393-4 0.357 0.054 0.714 0.089 1.089 0.089 0.518 0 1.036-0.071 1.518-0.196-2.643-0.536-4.625-2.857-4.625-5.661v-0.071c0.768 0.429 1.661 0.696 2.607 0.732-1.554-1.036-2.571-2.804-2.571-4.804 0-1.071 0.286-2.054 0.786-2.911 2.839 3.5 7.107 5.786 11.893 6.036-0.089-0.429-0.143-0.875-0.143-1.321 0-3.179 2.571-5.768 5.768-5.768 1.661 0 3.161 0.696 4.214 1.821 1.304-0.25 2.554-0.732 3.661-1.393-0.429 1.339-1.339 2.464-2.536 3.179 1.161-0.125 2.286-0.446 3.321-0.893z'/>
            </symbol>
            <symbol id='icon-facebook' viewBox='0 0 19 32'>
                <title>Facebook</title>
                <path d='M17.125 0.214v4.714h-2.804c-2.196 0-2.607 1.054-2.607 2.571v3.375h5.232l-0.696 5.286h-4.536v13.554h-5.464v-13.554h-4.554v-5.286h4.554v-3.893c0-4.518 2.768-6.982 6.804-6.982 1.929 0 3.589 0.143 4.071 0.214z'/>
            </symbol>
            <symbol id='icon-linkedin' viewBox='0 0 27 32'>
                <title>LinkedIn</title>
                <path d='M6.232 11.161v17.696h-5.893v-17.696h5.893zM6.607 5.696c0.018 1.696-1.268 3.054-3.321 3.054v0h-0.036c-1.982 0-3.25-1.357-3.25-3.054 0-1.732 1.321-3.054 3.321-3.054 2.018 0 3.268 1.321 3.286 3.054zM27.429 18.714v10.143h-5.875v-9.464c0-2.375-0.857-4-2.982-4-1.625 0-2.589 1.089-3.018 2.143-0.143 0.393-0.196 0.911-0.196 1.446v9.875h-5.875c0.071-16.036 0-17.696 0-17.696h5.875v2.571h-0.036c0.768-1.214 2.161-2.982 5.339-2.982 3.875 0 6.768 2.536 6.768 7.964z'/>
            </symbol>
            <symbol id='icon-arrow-bottom' viewBox='0 0 21 32'>
                <title>Down</title>
                <path d='M20.025 23.832l-7.934 7.495c-0.426 0.418-1.011 0.676-1.655 0.676-0.029 0-0.058-0.001-0.087-0.002-0.010 0-0.026 0.001-0.043 0.001-0.632 0-1.204-0.258-1.616-0.675l-8.009-7.495c-0.419-0.409-0.679-0.98-0.679-1.611s0.26-1.202 0.679-1.611q0.68-0.675 1.738-0.675t1.738 0.674l3.778 3.598v-21.885c-0-0.010-0-0.022-0-0.034 0-0.64 0.277-1.216 0.717-1.614 0.445-0.419 1.044-0.676 1.702-0.676s1.257 0.257 1.702 0.676c0.44 0.399 0.717 0.975 0.717 1.615 0 0.011-0 0.023-0 0.034l0 21.884 3.778-3.673c0.426-0.418 1.011-0.676 1.655-0.676 0.029 0 0.058 0.001 0.086 0.002q1.055-0 1.735 0.674c0.42 0.423 0.68 1.005 0.68 1.649s-0.26 1.226-0.68 1.649z'/>
            </symbol>
            <symbol id='icon-arrow-top' viewBox='0 0 21 32'>
                <title>Up</title>
                <path d='M0.68 8.168l7.934-7.495c0.426-0.418 1.011-0.676 1.655-0.676 0.029 0 0.058 0.001 0.087 0.002 0.010-0 0.026-0.001 0.043-0.001 0.632 0 1.204 0.258 1.616 0.675l8.010 7.495c0.419 0.409 0.68 0.98 0.68 1.611s-0.26 1.202-0.679 1.611q-0.68 0.675-1.738 0.675t-1.738-0.675l-3.778-3.598v21.885c0 0.010 0 0.022 0 0.034 0 0.64-0.277 1.216-0.717 1.614-0.445 0.419-1.044 0.676-1.702 0.676s-1.257-0.257-1.702-0.676c-0.44-0.399-0.717-0.975-0.717-1.615 0-0.012 0-0.023 0-0.035l-0-21.883-3.778 3.673c-0.426 0.418-1.011 0.676-1.655 0.676-0.029 0-0.058-0.001-0.086-0.002q-1.055 0-1.735-0.674c-0.42-0.423-0.68-1.006-0.68-1.649s0.26-1.226 0.68-1.649z'/>
            </symbol>
            <symbol id='icon-arrow-left' viewBox='0 0 49 32'>
                <title>Back</title>
                <path d='M12.623 30.948l-11.583-12.262c-0.646-0.659-1.045-1.562-1.045-2.558 0-0.045 0.001-0.090 0.002-0.135-0.001-0.015-0.001-0.040-0.001-0.066 0-0.977 0.399-1.861 1.043-2.498l11.583-12.379c0.632-0.648 1.514-1.050 2.49-1.050s1.858 0.402 2.49 1.049q1.043 1.052 1.043 2.687t-1.042 2.686l-5.56 5.839h33.823c0.015-0 0.034-0 0.052-0 0.989 0 1.879 0.427 2.494 1.107 0.648 0.687 1.045 1.613 1.045 2.631s-0.397 1.943-1.044 2.63c-0.617 0.681-1.506 1.108-2.496 1.108-0.018 0-0.036-0-0.053-0l-33.82 0 5.676 5.839c0.646 0.659 1.045 1.562 1.045 2.558 0 0.045-0.001 0.089-0.002 0.133q0 1.63-1.042 2.681c-0.653 0.649-1.554 1.051-2.548 1.051s-1.895-0.402-2.549-1.051z'/>
            </symbol>
            <symbol id='icon-arrow-right' viewBox='0 0 49 32'>
                <title>Go</title>
                <path d='M36.852 1.052l11.589 12.262c0.646 0.659 1.045 1.562 1.045 2.559 0 0.044-0.001 0.089-0.002 0.133 0.001 0.015 0.001 0.041 0.001 0.066 0 0.977-0.399 1.861-1.043 2.498l-11.59 12.379c-0.633 0.648-1.515 1.050-2.492 1.050s-1.859-0.402-2.491-1.049q-1.044-1.052-1.044-2.687t1.043-2.686l5.563-5.839h-33.842c-0.016 0-0.034 0-0.053 0-0.989 0-1.879-0.427-2.494-1.107-0.648-0.687-1.046-1.613-1.046-2.631s0.397-1.943 1.045-2.63c0.617-0.68 1.507-1.107 2.497-1.107 0.018 0 0.036 0 0.054 0l33.84-0-5.68-5.838c-0.646-0.659-1.045-1.562-1.045-2.558 0-0.045 0.001-0.089 0.002-0.133q-0-1.629 1.043-2.681c0.654-0.649 1.555-1.051 2.55-1.051s1.896 0.401 2.55 1.051z'/>
            </symbol>
            <symbol id='icon-logo-thinkovery' viewBox='0 0 592 123'>
                <title>Thinkovery</title>
                <path d='M29.4 66.2c0 8.2 4 11.8 10 11.8 3.1 0 4.4-.3 7.8-2v17.6c-3.1 1.2-5.1 1.3-9 1.3-16.1 0-27.8-8.5-27.8-27.3V49.8H0V34.1h10.4V14.3h19V34h17.9v15.7H29.4v16.5z'/>
                <path d='M75.8 62.5C75.8 53.2 82.2 50 88 50c5.5 0 11.3 4.2 11.3 12.2V95h18.3V61.6c0-18.6-8.4-29.4-24.6-29.4-5.8 0-14.7 3.3-17.2 10.9V0H57.5v94.9h18.3V62.5z'/>
                <path d='M144.5 33.5h-18.1V95h18.1V33.5z'/>
                <path d='M172.3 62.5c0-9.3 4.9-12.5 11.3-12.5 6.2 0 10.6 4.1 10.6 12.2V95h18.3V58.3c0-17.5-8.7-26.1-22.5-26.1-7.2 0-14.4 4.1-17.7 10.3v-9h-18.2V95h18.3l-.1-32.5z'/>
                <path d='M269.9 81.6c1.9 4.9 4.6 9.4 8 13.4h-18.5l-20.5-24.4V95h-18.1V.1h18.1v50.2l13.8-16.9h21.6l-23 27.1 18.6 21.1z'/>
                <path class='theme-color' d='M124 10.7c0 6.1 5.3 10.8 11.4 10.8 6.2 0 11.2-4.7 11.2-10.8 0-6.1-5-10.7-11.2-10.7-6.1.1-11.4 4.7-11.4 10.7z'/>
                <path d='M391.5 95h-15.6l-12.5-29.8v-1.6c0-11.4-3.9-21.8-10.4-30.1h16.4l14.3 38.2 14.2-38.2h19.6l-26 61.5z'/>
                <path d='M461.5 74.7c-3 3.9-8.4 5.8-13.4 5.8-6.4 0-14.2-3.2-15.1-10.3h44.9c.1-1.6.3-4.1.3-5.7 0-19.4-13.9-32.4-31.4-32.4-17.6 0-32.1 12.5-32.1 31.9s14.4 32.3 32.1 32.3c10.4 0 21.8-3.3 28-12.5l-13.3-9.1zm-28.3-15.9c1.6-7.8 8.5-10.5 13.7-10.5 5.1 0 12 3 12.9 10.5h-26.6z'/>
                <path d='M525.1 49.8s-4 .1-5.9.1c-10.5 0-15.7 9.9-15.7 26.1v19h-18.3V33.5h18.3v14.9c4.5-16.5 21.6-15.1 21.6-15.1v16.5z'/>
                <path d='M546.3 96.9c-2.4 5.8-4.1 9.9-10.2 9.9-1.8 0-1.7 0-6.9-.9v15.6c4.4 1.5 7.6 1.5 8.5 1.5 13 0 18.8-5.7 24.7-19.3L592 33h-19l-13.2 33.8L546.6 33h-18.9l22.6 54.9-4 9z'/>
                <path class='theme-color logo-o' id='logo-o1' d='M315 17.5c-25.3 0-45.9 20.7-45.9 46.1s20.5 46.1 45.9 46.1c25.3 0 45.9-20.7 45.9-46.1S340.3 17.5 315 17.5zm.8 73.4c-15.3 0-27.7-12.6-27.7-28.2s12.4-28.2 27.7-28.2 27.7 12.6 27.7 28.2-12.4 28.2-27.7 28.2z'/>
            </symbol>
        </defs>
    </svg>

	<?php wp_footer(); ?>

	</body>
</html>

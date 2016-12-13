	</main>

    <footer role='contentinfo' id='footer'>
        <div class='footer-top'>
            <div class='container'>
                <div class='container-medium'>
                    <p><?php the_field('ctaTxt', 'options') ?></p>
                    <a href='<?php the_field('ctaLink', 'options'); ?>' class='btn big'><?php the_field('ctaLinkTxt', 'options'); ?><svg class='icon'><use xlink:href='#icon-arrow-right'/></svg></a>
                </div>
            </div>
        </div>
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
                        </a>
                    </div>
                    <div class='col-2'>
                        <span class='footer-title'><?php the_field('alsoTitle', 'options'); ?></span>
                        <?php wp_nav_menu( array( 'theme_location' => 'secondary', 'container' => false, 'menu_class' => 'menu-footer' ) ); ?>
                        <?php if( have_rows('social', 'options') ): ?>
                            <ul class='social'>
                                <?php while ( have_rows('social', 'options') ) : the_row(); ?>
                                    <li>
                                        <a href='<?php the_sub_field('networkLink'); ?>'>
                                            <?php the_sub_field('networkLinkTxt'); ?>
                                        </a>
                                    </li>
                                <?php endwhile; ?>
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

    <?php global $themeColors; global $currentDecli; ?>

    <svg style='position:absolute;width:0;height:0;overflow:hidden'>
        <defs>
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
            <radialGradient id='gradient-hoop' cx='80%' cy='90%' fx='80%' fy='90%'>
                <stop offset='0%' stop-color='<?php echo $themeColors[$currentDecli['mainColor']][1]; ?>'/>
                <stop offset='100%' stop-color='<?php echo $themeColors[$currentDecli['mainColor']][0]; ?>'/>
            </radialGradient>
        </defs>
    </svg>

	<?php wp_footer(); ?>

	</body>
</html>

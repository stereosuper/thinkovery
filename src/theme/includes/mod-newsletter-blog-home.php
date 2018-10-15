<?php

?><div class='stay-connected-mod'>
						<div class='blog-newsletter-mod'>
							<h3 class='h5'><?php _e('Inscrivez-vous à notre newsletter', 'thinkovery'); ?></h3>
							<?php echo do_shortcode('[mc4wp_form id="8558"]'); ?>
						</div>
						<div class='networks-links'>
							<h3 class='h5'><?php _e('Suivez-nous !', 'thinkovery'); ?></h3>
							<?php if( have_rows('social', 'options') ): ?>
								<ul class=''>
									<?php while ( have_rows('social', 'options') ) : the_row(); ?><li>
										<a href='<?php the_sub_field('networkLink'); ?>' target='_blank' rel='noreferrer noopener' title='<?php the_sub_field('networkLinkTxt'); ?>'>
											<?php the_sub_field('networkLinkTxt'); ?>
											<svg class='icon icon-<?php the_sub_field('networkSlug'); ?>'><use xlink:href='#icon-<?php the_sub_field('networkSlug'); ?>'/></svg><i></i>
										</a>
									</li><?php endwhile; ?>
								</ul>
							<?php endif; ?>
						</div>
</div>
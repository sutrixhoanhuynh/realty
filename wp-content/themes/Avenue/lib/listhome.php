
<?php include(TEMPLATEPATH . '/lib/slider.php'); ?>
<?php include(TEMPLATEPATH . '/lib/listing.php'); ?>
<div class="property-lisitings-block">
	<div class="container">
		<div class="rows">
			<div class="col-sm-12">
				<h2 class="section-title"><span> Property Listings </span></h2>
				<ul class="row list-unstyled">
				<?php
				$temp = $wp_query;
				$wp_query= null;
				$wp_query = new WP_Query();
				$wp_query->query('post_type=listings'.'&paged='.$paged);
				?>
				<?php while ($wp_query->have_posts()) : $wp_query->the_post(); ?>
					<li class="col-lg-4 col-md-6">
						<div class="property-item">
							<div class="property-title <?php $type=get_the_term_list($post->ID, 'type', '', ' ', '' ); echo(strip_tags($type)); ?>">
								<h3 class="title"><?php the_title(); ?></h3>
								<h4 class="address">
									<?php  $location=get_post_meta($post->ID, 'wtf_location', true); echo $location; ?>
								</h4>
							</div>
							<figure class="property-thumbnail">
								<?php
									if (has_post_thumbnail()) { ?>
										<img src="<?php bloginfo('stylesheet_directory'); ?>/timthumb.php?src=<?php get_image_url(); ?>&amp;h=300&amp;w=600&amp;zc=1" />
									<?php } else { ?>
										<img src="<?php bloginfo('template_directory'); ?>/images/dummy.jpg" />
								<?php } ?>
								<div class="property-status">
									<?php $area=get_the_term_list( $post->ID, 'type', '', ' ', '' ); echo(strip_tags($area)); ?>
								</div>
								<figcaption>
									<div class="property-excerpt">
										<div class="subtitle">
											<span class="type"><?php echo get_the_term_list( $post->ID, 'property', '', ' ', '' ); ?></span>
											<span class="link-icon"><i class="fa fa-star" aria-hidden="true"></i></span>
											<span><a href="javascript:;"><?php $type=get_the_term_list( $post->ID, 'type', '', ' ', '' ); echo(strip_tags($type)); ?></a></span>
										</div>
										<p>
											<?php wpe_excerpt('wpe_excerptlength_archive', ''); ?>
										</p>
									</div>
								</figcaption>
							</figure>
							<div class="property-content">
								<div class="property-meta">
									<ul>
										<li>
											<i class="fa fa-expand"></i>
											<span> <?php $area=get_the_term_list( $post->ID, 'area', '', ' ', '' ); echo(strip_tags($area)); ?></span>
										</li>
										<li>
											<i class="fa fa-building-o"></i>
											<span>8 Rooms</span>
										</li>
										<li>
											<i class="fa fa-bed"></i>
											<span><?php $bedrooms=get_the_term_list( $post->ID, 'bedrooms', '', ' ', '' ); echo(strip_tags($bedrooms)); ?> Bedroom </span>
										</li>
										<li>
											<i class="fa fa-tint"></i>
											<span><?php $bath=get_post_meta($post->ID, 'wtf_bath', true); echo $bath; ?> Bathroom</span>
										</li>
									</ul>
								</div>
								<div class="property-price">
									<div class="utilities-tag">
										<ul>
											<li>
												<i class="fa fa-share-alt" data-toggle="collapse" data-target="#collapse-<?php echo $post->ID; ?>"></i>
												<ul class="share-unit" id="collapse-<?php echo $post->ID; ?>">
													<li>
														<a class="social-facebook" target="_blank" href="http://www.facebook.com/sharer.php?u=<?php echo get_permalink($post->ID); ?>&t=<?php the_title(); ?>">
															<i class="fa fa-facebook" aria-hidden="true"></i>
														</a>
													</li>
													<li>
														<a class="social-twitter" target="_blank" href="http://twitter.com/home?status=<?php the_title(); ?>+<?php echo get_permalink($post->ID); ?>">
															<i class="fa fa-twitter" aria-hidden="true"></i>
														</a>
													</li>
													<li>
														<a class="social-google" target="_blank" href="https://plus.google.com/share?url=<?php echo get_permalink($post->ID); ?>">
															<i class="fa fa-google-plus" aria-hidden="true"></i>
														</a>
													</li>
													<li>
														<a class="social-pinterest" target="_blank" href="http://pinterest.com/pin/create/button/?url=<?php echo get_permalink($post->ID); ?>">
															<i class="fa fa-pinterest-p" aria-hidden="true"></i>
														</a>
													</li>
												</ul>
											</li>
											<li>
												<i class="fa fa-heart-o " data-toggle="tooltip" data-original-title="Add To Favorites"></i>
											</li>
											<?php if (has_post_video($post->ID)) { ?>
											<li>
												<i class="fa fa-video-camera" data-toggle="tooltip" data-original-title="Watch Trailer" data-popup data-type="video" data-href=".modal" data-content="<iframe class='embed-responsive-item' src='<?php echo get_the_post_video_url($post->ID); ?>' allowfullscreen='true'></iframe>'"></i>
											</li>
											<?php } ?>
										</ul>
									</div>
									<div class="price-tag">
										<?php $price=get_post_meta($post->ID, 'wtf_price', true); echo $price; ?>
									</div>
								</div>
							</div>
						</div>
					</li>
				<?php endwhile; ?>
				</ul>
			</div>
		</div>
		<?php getpagenavi(); ?>

<?php $wp_query = null; $wp_query = $temp;?>
  </div>
</div>


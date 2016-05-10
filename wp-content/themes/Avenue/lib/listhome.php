
<?php include (TEMPLATEPATH . '/lib/slider.php'); ?>	
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
							<!--<a href="<?php the_permalink() ?>">-->
								<div class="property-title">
									<h3 class="title"><?php the_title(); ?></h3>
									<h4 class="address"><?php $address=get_the_term_list( $post->ID, 'location', '', ' ', '' ); echo strip_tags($address); ?></h4>
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
									<figcaption class="hidden">
										<div class="property-excerpt">
											<div class="subtitle">
												<span class="type"><?php echo get_the_term_list( $post->ID, 'property', '', ' ', '' ); ?></span>
											</div>
											<p>
												<?php wpe_excerpt('wpe_excerptlength_archive', ''); ?>
											</p>
										</div>
									</figcaption>
								</figure>
							<!--</a>-->
							<div class="property-content">
								<div class="property-meta">
									<ul>
										<li>
											<i class="fa fa-expand"></i>
											<span> <?php $area=get_the_term_list( $post->ID, 'area', '', ' ', '' ); echo(strip_tags($area)); ?></span>
										</li>
										<li>
											<i class="fa fa-building-o"></i>
											<span>8 Phòng</span>
										</li>
										<li>
											<i class="fa fa-bed"></i>
											<span><?php $bedrooms=get_the_term_list( $post->ID, 'bedrooms', '', ' ', '' ); echo(strip_tags($bedrooms)); ?> Phòng ngủ</span>
										</li>
										<li>
											<i class="fa fa-tint"></i>
											<span><?php $bath=get_post_meta($post->ID, 'wtf_bath', true); echo $bath; ?> Phòng tắm</span>
										</li>
									</ul>							
								</div>
								<div class="property-price">
									<div class="utilities-tag">
										<ul>
											<li>
												<i class="fa fa-share-alt" data-toggle="tooltip" data-original-title="Share"></i>
											</li>
											<li>
												<i class="fa fa-heart-o" data-toggle="tooltip" data-original-title="Add To Favorites"></i>
											</li>
											<li>
												<i class="fa fa-video-camera" data-toggle="tooltip" data-original-title="Watch Trailer"></i>
											</li>
											<li>
												<i class="fa fa-plus" data-toggle="tooltip" data-original-title="Compare"></i>
											</li>
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


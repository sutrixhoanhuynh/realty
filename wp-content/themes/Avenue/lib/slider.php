<div class="carousel-block">
	<?php $slide_count = get_option('aven_slide_count'); ?>
	<?php $slide_cat = 'featured';?>
	<?php $slide_type = 'listings';?>

	<ul data-carousel="">
		<?php
			$query = new WP_Query('post_type='.$slide_type.'&type='.$slide_cat.'&showposts='.$slide_count.'');
			while ($query->have_posts()) : $query->the_post();
		?>
		<li>
			<figure>
				<img src="<?php the_post_thumbnail_url(); ?>"/>
				<figcaption>
					<div class="inner">
						<h3 class="title">
							<a href="<?php the_permalink() ?>"> <?php the_title(); ?>
								<!-- <i class="fa fa-angle-right" aria-hidden="true"></i> -->
							</a>
						</h3>
						<div class="description">
							<?php wpe_excerpt('wpe_excerptlength_archive', 'custom_excerpt_more'); ?>
							<div class="property-data">
								<div class="property-details">
									<ul>
										<li>
											<i class="fa fa-bed"></i>
											<span><?php $bedrooms=get_the_term_list( $post->ID, 'bedrooms', '', ' ', '' ); echo(strip_tags($bedrooms)); ?></span>
										</li>
										<li>
											<i class="fa fa-tint"></i>
										  <span><?php $bath=get_post_meta($post->ID, 'wtf_bath', true); echo $bath; ?></span>
										</li>
										<li>
											<i class="fa fa-expand"></i>
										  <span><?php $area=get_the_term_list( $post->ID, 'area', '', ' ', '' ); echo(strip_tags($area)); ?></span>
										</li>
									</ul>
								</div>
								<div class="property-price">
									<span><?php $price=get_post_meta($post->ID, 'wtf_price', true); echo $price; ?></span>
								</div>
							</div>
						</div>
					</div>
				</figcaption>
			</figure>
		</li>
	  <?php endwhile; ?>
	</ul>

</div>

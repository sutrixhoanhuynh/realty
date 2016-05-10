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
			<div class="slide">
				<img src="<?php bloginfo('stylesheet_directory'); ?>/timthumb.php?src=<?php echo get_image_url()?>&amp;h=600&amp;w=1600amp;zc=1"/>
				<div class="inner">
					<h3 class="title">
						<?php the_title(); ?>
					</h3>
					<div class="description">
						<?php wpe_excerpt('wpe_excerptlength_archive', 'custom_excerpt_more'); ?>
						<div class="property-data">
							<div class="property-price">
								<span><?php $price=get_post_meta($post->ID, 'wtf_price', true); echo $price; ?></span>
							</div>
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
						</div>						
					</div>
				</div>	
			</div>		
		</li>		
	  <?php endwhile; ?>
	</ul>

</div> 
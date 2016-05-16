<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<title>
		<?php wp_title(''); ?><?php if(wp_title('', false)) { echo ' :'; } ?> <?php bloginfo('name'); ?>
	</title>
	<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui" />
	<link rel="shortcut icon" href="<?php bloginfo('template_directory'); ?>/favicon.png">
  <link rel="stylesheet" type="text/css" href="<?php bloginfo('template_directory'); ?>/css/bootstrap.css" />
  <link rel="stylesheet" type="text/css" href="<?php bloginfo('template_directory'); ?>/css/font-awesome.css" />
  <link rel="stylesheet" type="text/css" href="<?php bloginfo('template_directory'); ?>/css/slick.css" />
  <link rel="stylesheet" type="text/css" href="<?php bloginfo('stylesheet_url'); ?>" />
  <link rel="stylesheet" type="text/css" href="<?php bloginfo('template_directory'); ?>/listing.css" />
  <script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/js/modernizr.js"></script>
</head>
<body>

<main>
	<!--<div id="masthead">

		<div id="head">

		<div id="top" class="clearfix">
			<div id="blogname">

			<?php if (get_theme_mod(FT_scope::tool()->optionsName . '_logo', '') != '') { ?>
						<h1 class="site-title logo"><a class="mylogo" rel="home" href="<?php bloginfo('siteurl');?>/" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>"><img relWidth="<?php echo intval(get_theme_mod(FT_scope::tool()->optionsName . '_maxWidth', 0)); ?>" relHeight="<?php echo intval(get_theme_mod(FT_scope::tool()->optionsName . '_maxHeight', 0)); ?>" id="ft_logo" src="<?php echo get_theme_mod(FT_scope::tool()->optionsName . '_logo', ''); ?>" alt="" /></a></h1>
			<?php } else { ?>
						<h1 class="site-title logo"><a id="blogname" rel="home" href="<?php bloginfo('siteurl');?>/" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>"><?php bloginfo( 'name' ); ?></a></h1>
			<?php } ?>

			</div>

			<div id="contactlist">
				<div class="rphone">
				<span>Call us</span><br/>
				<p><?php $my_phone =get_option('aven_my_phone'); echo $my_phone ?></p>
				</div>
				<div class="rmail">
				<span>Mail us</span><br/>
				<p><?php $my_mail =get_option('aven_my_email'); echo $my_mail ?></p>
				</div>
			</div>

		</div>

		<div id="botmenu">
			<?php wp_nav_menu( array( 'container_id' => 'submenu', 'theme_location' => 'primary','menu_class'=>'sfmenu','fallback_cb'=> 'fallbackmenu' ) ); ?>
			<?php include (TEMPLATEPATH . '/searchform.php'); ?>
		</div>

	</div>

	</div>-->

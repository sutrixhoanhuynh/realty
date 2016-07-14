<!DOCTYPE html>
<html <?php language_attributes();?>>
<head>
	<title>
		<?php wp_title(''); ?>
		<?php if(wp_title('', false)) { echo ' :'; } ?>
		<?php bloginfo('name'); ?>
	</title>
	<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui" />
	<link rel="shortcut icon" href="<?php bloginfo('template_directory'); ?>/favicon.png">
  <link rel="stylesheet" type="text/css" href="<?php bloginfo('template_directory'); ?>/css/bootstrap.css" />
  <link rel="stylesheet" type="text/css" href="<?php bloginfo('template_directory'); ?>/css/font-awesome.css" />
  <link rel="stylesheet" type="text/css" href="<?php bloginfo('template_directory'); ?>/css/slick.css" />
  <link rel="stylesheet" type="text/css" href="<?php bloginfo('stylesheet_url'); ?>" />
  <link rel="stylesheet" type="text/css" href='https://fonts.googleapis.com/css?family=Montserrat' />
  <link rel='stylesheet' type='text/css' href='https://fonts.googleapis.com/css?family=Open+Sans:300,700,400,600' />
  <script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/js/modernizr.js"></script>
</head>
<body>

<main>
	<header class="navbar navbar-default navbar-static-top">
		<div class="top-navbar hidden-xs">
			<div class="container">
				<ul class="contact-links list-inline pull-left">
					<li>
						<?php $phone_number = get_option('aven_my_phone'); ?>
						<a href="tel:<?php echo $phone_number; ?>" title="<?php echo $phone_number; ?>">
							<i class="fa fa-phone"></i>
							<?php echo $phone_number; ?>
						</a>
					</li>
					<li>
						<?php $email = get_option('aven_my_email'); ?>
						<a href="mailto:<?php echo $email; ?>" title="<?php echo $email; ?>">
							<i class="fa fa-envelope-o"></i>
							<?php echo $email; ?>
						</a>
					</li>
				</ul>
				<ul class="list-inline pull-right">
					<?php if (is_user_logged_in()) { $current_user = wp_get_current_user(); ?>				
					<li class="dropdown-user">						
						<a href="javascrip:;" data-toggle="dropdown">
							<?php
								echo '<span>'.$current_user->user_login.'</span>';
								echo get_avatar($current_user->user_email, 32);
							?>
						</a>
						<ul class="dropdown-menu dropdown-menu-right">
							<li>
								<a href="javascript:;">
									<span class="demo-pli-male icon-lg icon-fw"></span> Profile
								</a>
							</li>
							<li>
								<a href="javascript:;">
									<span class="demo-pli-gear icon-lg icon-fw"></span> Settings
								</a>
							</li>
							<li>
								<a href="javascript:;">
									<span class="demo-pli-information icon-lg icon-fw"></span> Help
								</a>
							</li>
							<li>
								<a href="<?php echo wp_logout_url(home_url()); ?>">
									<span class="demo-pli-unlock icon-lg icon-fw"></span> Logout
								</a>
							</li>
						</ul>						
					</li>
					<?php } else { ?>
					<li class="login-link">	
							<a href="<?php echo get_site_url(); ?>/login" title="login"> login </a> /
							<a href="<?php echo get_site_url(); ?>/register" title="register"> register </a>
					</li>
					<?php } ?>
					<li class="social-links clearfix">
						<?php echo do_shortcode('[social-links-widget]'); ?>
					</li>
				</ul>
			</div>
		</div>
		<div class="main-navbar">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
					aria-controls="navbar" aria-expanded="false">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="javascript:;">
						<img src="<?php bloginfo('template_directory'); ?>/images/logo.gif" alt="logo" />
					</a>
				</div>
				<nav id="navbar" class="collapse navbar-collapse">
					<?php wp_nav_menu(array('container' => '', 'theme_location' => 'primary', 'menu_class'=>'nav navbar-nav', 'menu_id'=> 'main-menu', 'fallback_cb'=> 'fallbackmenu')); ?>
				</nav>
			</div>
		</div>
	</header>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<title><?php wp_title(''); ?><?php if(wp_title('', false)) { echo ' :'; } ?><?php bloginfo('name'); ?></title>
	<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui" />
	<link rel="shortcut icon" href="<?php bloginfo('template_directory'); ?>/favicon.png">
  <link rel="stylesheet" type="text/css" href="<?php bloginfo('template_directory'); ?>/css/bootstrap.css" />
  <link rel="stylesheet" type="text/css" href="<?php bloginfo('template_directory'); ?>/css/font-awesome.css" />
  <link rel="stylesheet" type="text/css" href="<?php bloginfo('template_directory'); ?>/css/slick.css" />
  <link rel="stylesheet" type="text/css" href="<?php bloginfo('stylesheet_url'); ?>" />
  <link rel="stylesheet" type="text/css" href='https://fonts.googleapis.com/css?family=Montserrat' />
  <script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/js/modernizr.js"></script>
</head>
<body>

<main>
	<header class="navbar navbar-default navbar-static-top">
		<div class="top-navbar hidden-xs">
			<div class="container">
				<ul class="contact-links list-inline pull-left">
					<li>
						<a href="tel:<?php $phone=get_option('aven_my_phone'); echo $phone ?>">
							<i class="fa fa-phone"></i>
							<?php $phone=get_option('aven_my_phone'); echo $phone ?>
						</a>						
					</li>
					<li>
						<a href="mailto:<?php $email=get_option('aven_my_email'); echo $email ?>">
							<i class="fa fa-envelope-o"></i>
							<?php $email=get_option('aven_my_email'); echo $email ?>
						</a>
					</li>
				</ul>
				<?php echo do_shortcode('[social-links-widget]'); ?>
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

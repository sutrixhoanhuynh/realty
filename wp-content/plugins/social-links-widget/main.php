<?php
/*
Plugin Name: Social Links Widget
Description: Display social links.
Tags: display social links, social links, social, facebook, twitter, youtube, google plus, linked in
Author URI: http://www.bodylab.dk/
Author: Kjeld Hansen
Text Domain: social_links_widget
Requires at least: 4.0
Tested up to: 4.4.2
Version: 1.0
*/

if (!shortcode_exists('social-links-widget')) {
	add_shortcode('social-links-widget', 'social_links_widget_social_links_widget');
}

/*
* Main function to Display Social Links tool.
*/
function social_links_widget_social_links_widget(){
	?>
    <div class="social_links_widget_op">
        <ul class="socials-links list-inline pull-right">
            <?php 
			if(get_option( 'social_links_widget_options' )){ 
			$social_data_option = get_option( 'social_links_widget_options' ); $ordarr = array();
            foreach($social_data_option[sosurl] as $id=>$url){ if($url!=''):  $ordarr[$id] = $social_data_option[soscord][$id]; endif; } asort($ordarr);
            foreach($ordarr as $id=>$val): ?>
            	<li> 
            		<a class="<?php echo $id; ?>" href="<?php echo $social_data_option[sosurl][$id]; ?>">
            			<?php
            				switch($id) {
            					case 'fb':
            						$class = 'fa fa-facebook';
            					break;
            					case 'tw':
            						$class = 'fa fa-twitter';
            					break;
            					case 'li':
            						$class= 'fa fa-linkedin';
            					break;
            					case 'rss':
            						$class = 'fa fa-rss';
            					break;
            				}
            			?>
            			<i class="<?php echo $class; ?>"></i>
            		</a> 
            	</li>				
			<?php endforeach;
			}
			else{ echo '<li> Please check Social Links Widget settings. </li>'; }
            ?>
        </ul>    </div>
    <?php
}
/*
* Load css in head
*/
add_action('admin_head', 'social_links_widget_load_css');
function social_links_widget_load_css(){
	$social_links_widget_cssop = '<link href="'. plugin_dir_url( __FILE__ ) . 'social-styles.css'.'" rel="stylesheet" type="text/css" media="all">';
	echo $social_links_widget_cssop;
}

function social_links_widget_scripts() {
    wp_register_style( 'social-link-styles',  plugin_dir_url( __FILE__ ) . 'social-styles.css' );
    wp_enqueue_style( 'social-link-styles' );
}
add_action( 'wp_enqueue_scripts', 'social_links_widget_scripts' );

/*
	Social Links Settings
*/
add_action('admin_menu', 'social_links_widget_admin_menu');
function social_links_widget_admin_menu() { 
    add_menu_page(
		"Social Links Widget",
		"Social links",
		8,
		__FILE__,
		"social_links_widget_admin_menu_list",
		'dashicons-share' , 50
	); 
}

function social_links_widget_admin_menu_list(){
	include 'social-admin.php';
}


/*******************************************************************************************************************
Widget
********************************************************************************************************************/

/**
 * Adds social_links_widget widget.
 */
class social_links_widget_Widget extends WP_Widget {

	/**
	 * Register widget with WordPress.
	 */
	function __construct() {
		parent::__construct(
			'social_links_widget_widget', // Base ID
			__( 'Display Social Links', 'text_domain' ), // Name
			array( 'description' => __( 'A Display Social Links Widget', 'text_domain' ), ) // Args
		);
	}

	/**
	 * Front-end display of widget.
	 *
	 * @see WP_Widget::widget()
	 *
	 * @param array $args     Widget arguments.
	 * @param array $instance Saved values from database.
	 */
	public function widget( $args, $instance ) {
		echo $args['before_widget'];
		if ( ! empty( $instance['title'] ) ) {
			echo $args['before_title'] . apply_filters( 'widget_title', $instance['title'] ). $args['after_title'];
		}
		/*
		** Call function to Display Social Links display tool
		*/
		
		if ( function_exists(social_links_widget_social_links_widget)){  social_links_widget_social_links_widget(); }
		echo $args['after_widget'];
	}

	/**
	 * Back-end widget form.
	 *
	 * @see WP_Widget::form()
	 *
	 * @param array $instance Previously saved values from database.
	 */
	public function form( $instance ) {
		$title = ! empty( $instance['title'] ) ? $instance['title'] : __( 'Social', 'text_domain' );
		?>
		<p>
		<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?></label> 
		<input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>">
		</p>
        <p><a href="admin.php?page=social-links-widget/main.php">Manage Social Links</a></p>
		<?php 
	}

	/**
	 * Sanitize widget form values as they are saved.
	 *
	 * @see WP_Widget::update()
	 *
	 * @param array $new_instance Values just sent to be saved.
	 * @param array $old_instance Previously saved values from database.
	 *
	 * @return array Updated safe values to be saved.
	 */
	public function update( $new_instance, $old_instance ) {
		$instance = array();
		$instance['title'] = ( ! empty( $new_instance['title'] ) ) ? strip_tags( $new_instance['title'] ) : '';

		return $instance;
	}

} // class social_links_widget

function register_social_links_widget_widget() {
    register_widget( 'social_links_widget_Widget' );
}
add_action( 'widgets_init', 'register_social_links_widget_widget' );
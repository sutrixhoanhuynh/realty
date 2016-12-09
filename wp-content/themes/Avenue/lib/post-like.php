<?php

add_action( 'wp_ajax_nopriv_process_simple_like', 'process_simple_like' );
add_action( 'wp_ajax_process_simple_like', 'process_simple_like' );
add_action( 'init', 'process_simple_like' );

function process_simple_like() {

  $disabled = ( isset( $_REQUEST['disabled'] ) && $_REQUEST['disabled'] == true ) ? true : false;
  // Test if this is a comment
  $is_comment = ( isset( $_REQUEST['is_comment'] ) && $_REQUEST['is_comment'] == 1 ) ? 1 : 0;
  // Base variables
  $post_id = ( isset( $_REQUEST['post_id'] ) && is_numeric( $_REQUEST['post_id'] ) ) ? $_REQUEST['post_id'] : '';
  $result = array();
  $post_users = NULL;
  $like_count = 0;
  // Get plugin options
  if ( $post_id != '' ) {
    $count = ( $is_comment == 1 ) ? get_comment_meta( $post_id, "_comment_like_count", true ) : get_post_meta( $post_id, "_post_like_count", true ); // like count
    $count = ( isset( $count ) && is_numeric( $count ) ) ? $count : 0;
    if ( !already_liked( $post_id, $is_comment ) ) { // Like the post
      if ( is_user_logged_in() ) { // user is logged in
        $user_id = get_current_user_id();
        $post_users = post_user_likes( $user_id, $post_id, $is_comment );
        if ( $is_comment == 1 ) {
          // Update User & Comment
          $user_like_count = get_user_option( "_comment_like_count", $user_id );
          $user_like_count =  ( isset( $user_like_count ) && is_numeric( $user_like_count ) ) ? $user_like_count : 0;
          update_user_option( $user_id, "_comment_like_count", ++$user_like_count );
          if ( $post_users ) {
            update_comment_meta( $post_id, "_user_comment_liked", $post_users );
          }
        } else {
          // Update User & Post
          $user_like_count = get_user_option( "_user_like_count", $user_id );
          $user_like_count =  ( isset( $user_like_count ) && is_numeric( $user_like_count ) ) ? $user_like_count : 0;
          update_user_option( $user_id, "_user_like_count", ++$user_like_count );
          if ( $post_users ) {
            update_post_meta( $post_id, "_user_liked", $post_users );
          }
        }
      } else { // user is anonymous
        $user_ip = sl_get_ip();
        $post_users = post_ip_likes( $user_ip, $post_id, $is_comment );
        // Update Post
        if ( $post_users ) {
          if ( $is_comment == 1 ) {
            update_comment_meta( $post_id, "_user_comment_IP", $post_users );
          } else {
            update_post_meta( $post_id, "_user_IP", $post_users );
          }
        }
      }
      $like_count = ++$count;
      $response['status'] = "liked";
    } else { // Unlike the post
      if ( is_user_logged_in() ) { // user is logged in
        $user_id = get_current_user_id();
        $post_users = post_user_likes( $user_id, $post_id, $is_comment );
        // Update User
        if ( $is_comment == 1 ) {
          $user_like_count = get_user_option( "_comment_like_count", $user_id );
          $user_like_count =  ( isset( $user_like_count ) && is_numeric( $user_like_count ) ) ? $user_like_count : 0;
          if ( $user_like_count > 0 ) {
            update_user_option( $user_id, "_comment_like_count", --$user_like_count );
          }
        } else {
          $user_like_count = get_user_option( "_user_like_count", $user_id );
          $user_like_count =  ( isset( $user_like_count ) && is_numeric( $user_like_count ) ) ? $user_like_count : 0;
          if ( $user_like_count > 0 ) {
            update_user_option( $user_id, '_user_like_count', --$user_like_count );
          }
        }
        // Update Post
        if ( $post_users ) {
          $uid_key = array_search( $user_id, $post_users );
          unset( $post_users[$uid_key] );
          if ( $is_comment == 1 ) {
            update_comment_meta( $post_id, "_user_comment_liked", $post_users );
          } else {
            update_post_meta( $post_id, "_user_liked", $post_users );
          }
        }
      } else { // user is anonymous
        $user_ip = sl_get_ip();
        $post_users = post_ip_likes( $user_ip, $post_id, $is_comment );
        // Update Post
        if ( $post_users ) {
          $uip_key = array_search( $user_ip, $post_users );
          unset( $post_users[$uip_key] );
          if ( $is_comment == 1 ) {
            update_comment_meta( $post_id, "_user_comment_IP", $post_users );
          } else {
            update_post_meta( $post_id, "_user_IP", $post_users );
          }
        }
      }
      $like_count = ( $count > 0 ) ? --$count : 0; // Prevent negative number
      $response['status'] = "unliked";
    }
    if ( $is_comment == 1 ) {
      update_comment_meta( $post_id, "_comment_like_count", $like_count );
      update_comment_meta( $post_id, "_comment_like_modified", date( 'Y-m-d H:i:s' ) );
    } else {
      update_post_meta( $post_id, "_post_like_count", $like_count );
      update_post_meta( $post_id, "_post_like_modified", date( 'Y-m-d H:i:s' ) );
    }
    $response['totalLikes'] = get_like_count( $like_count );

    if ( $disabled == true ) {
      if ( $is_comment == 1 ) {
        wp_redirect( get_permalink( get_the_ID() ) );
        exit();
      } else {
        wp_redirect( get_permalink( $post_id ) );
        exit();
      }
    } else {
      wp_send_json( $response );
    }
  }
}

function already_liked( $post_id, $is_comment ) {
  $post_users = NULL;
  $user_id = NULL;
  if ( is_user_logged_in() ) { // user is logged in
    $user_id = get_current_user_id();
    $post_meta_users = ( $is_comment == 1 ) ? get_comment_meta( $post_id, "_user_comment_liked" ) : get_post_meta( $post_id, "_user_liked" );
    if ( count( $post_meta_users ) != 0 ) {
      $post_users = $post_meta_users[0];
    }
  } else { // user is anonymous
    $user_id = sl_get_ip();
    $post_meta_users = ( $is_comment == 1 ) ? get_comment_meta( $post_id, "_user_comment_IP" ) : get_post_meta( $post_id, "_user_IP" );
    if ( count( $post_meta_users ) != 0 ) { // meta exists, set up values
      $post_users = $post_meta_users[0];
    }
  }
  if ( is_array( $post_users ) && in_array( $user_id, $post_users ) ) {
    return true;
  } else {
    return false;
  }
}


function post_user_likes( $user_id, $post_id, $is_comment ) {
  $post_users = '';
  $post_meta_users = ( $is_comment == 1 ) ? get_comment_meta( $post_id, "_user_comment_liked" ) : get_post_meta( $post_id, "_user_liked" );
  if ( count( $post_meta_users ) != 0 ) {
    $post_users = $post_meta_users[0];
  }
  if ( !is_array( $post_users ) ) {
    $post_users = array();
  }
  if ( !in_array( $user_id, $post_users ) ) {
    $post_users['user-' . $user_id] = $user_id;
  }
  return $post_users;
}

function post_ip_likes( $user_ip, $post_id, $is_comment ) {
  $post_users = '';
  $post_meta_users = ( $is_comment == 1 ) ? get_comment_meta( $post_id, "_user_comment_IP" ) : get_post_meta( $post_id, "_user_IP" );
  // Retrieve post information
  if ( count( $post_meta_users ) != 0 ) {
    $post_users = $post_meta_users[0];
  }
  if ( !is_array( $post_users ) ) {
    $post_users = array();
  }
  if ( !in_array( $user_ip, $post_users ) ) {
    $post_users['ip-' . $user_ip] = $user_ip;
  }
  return $post_users;
}

function sl_get_ip() {
  if (isset( $_SERVER['HTTP_CLIENT_IP'] ) && ! empty( $_SERVER['HTTP_CLIENT_IP'] ) ) {
    $ip = $_SERVER['HTTP_CLIENT_IP'];
  } elseif ( isset( $_SERVER['HTTP_X_FORWARDED_FOR'] ) && ! empty( $_SERVER['HTTP_X_FORWARDED_FOR'] ) ) {
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
  } else {
    $ip = ( isset( $_SERVER['REMOTE_ADDR'] ) ) ? $_SERVER['REMOTE_ADDR'] : '0.0.0.0';
  }
  $ip = filter_var( $ip, FILTER_VALIDATE_IP );
  $ip = ( $ip === false ) ? '0.0.0.0' : $ip;
  return $ip;
}


function format( $number ) {
  $precision = 2;
  if ( $number >= 1000 && $number < 1000000 ) {
    $formatted = number_format( $number/1000, $precision ).'K';
  } else if ( $number >= 1000000 && $number < 1000000000 ) {
    $formatted = number_format( $number/1000000, $precision ).'M';
  } else if ( $number >= 1000000000 ) {
    $formatted = number_format( $number/1000000000, $precision ).'B';
  } else {
    $formatted = $number; // Number is less than 1000
  }
  $formatted = str_replace( '.00', '', $formatted );
  return $formatted;
}

function get_like_count( $like_count ) {
  if ( is_numeric( $like_count ) && $like_count > 0 ) {
    $number = format( $like_count );
  } else {
    $number = 0;
  }
  return $number;
}

function get_total_likes($post_id) {
  $output = '';
  $total_likes = get_post_meta($post_id, "_post_like_count", true);
  $total_likes = get_like_count($total_likes);

  return $total_likes .' likes';
}

?>

<?php
/*
* Template Name: Login Page
*/
?>
<?php

$auth = array();

function authenticate($user) {
  global $auth;

  $signon = wp_signon($user, false);   

  if(is_wp_error($signon)) {
    $auth = array(
      'status' => 'fail', 
      'message' => 'Invalid username or password. Please try again!'
    );
  } else {
    wp_redirect(home_url());
  }

}

function validation($user) {
  global $auth;

  $username = $user['user_login'];
  $password = $user['user_password'];

  switch(true) {
    case empty($username):
      $auth = array(
        'status' => 'fail',
        'message' => 'Please enter email address/username'
      );
    break;
    case empty($password):
      $auth = array(
        'status' => 'fail',
        'message' => 'Please enter your password'
      );
    break;
  }

  if(!array_key_exists('status', $auth)) {
    authenticate($user);
  }
}

if (isset($_POST['sign-in'])) {

  $user = array(
    'user_login' => $_POST['email'],
    'user_password' => $_POST['password'],
    'remember' => $_POST['remember']
  );  

  validation($user);
}

?>
<?php get_header(); ?>
<div class="content" id="login-page">
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-7 col-lg-8 hidden-xs hidden-sm">
        <div class="row">
          <div class="col-md-9">
            <h3> Smart Admin </h3>
            <div class="hero">
              <p> 
                It's Okay to be Smart. Experience the simplicity of SmartAdmin, everywhere you go!
              </p>
              <div class="button-group">
                <a href="javascript:;" class="btn btn-danger btn-sm">Frontend Template</a>
                <a href="javascript:;" class="btn btn-danger btn-sm">Find out more</a>
              </div>
            </div>
          </div> 
          <div class="col-sm-3">          
            <img src="<?php echo get_template_directory_uri(); ?>/images/iphoneview.png" />
          </div>         
        </div>
        <div class="row features">
          <div class="col-md-6 col-lg-6">
            <h5> About Easy Living - Are you up to date? </h5>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.
            </p>
          </div>
          <div class="col-md-6 col-lg-6">
            <h5>Not just your average template!</h5>
            <p>
              Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi voluptatem accusantium!
            </p>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-5 col-lg-4">
        <?php           
          if(array_key_exists('status', $auth)) {
            $status = $auth['status'];

            if ($status === 'fail') {
                echo '<div class="alert alert-warning">
                        <i class="fa-fw fa fa-warning"></i>
                        <strong> Authenticate fail: </strong>'.$auth['message'].
                      '</div>';
            }
          }
        ?>        
        <div class="panel panel-default">
         <form action="<?php echo get_site_url(); ?>/login" method="POST" class="smart-form" data-validation="">
          <fieldset>
            <legend> Sign in </legend>
            <section class="fields">
             <div class="form-group">
               <label for="email">E-mail</label>               
               <div class="input-group clearfix">
                  <span class="input-group-addon">
                    <i class="fa fa-user"></i>
                  </span>                  
                  <input type="text" name="email" id="email" class="form-control" data-rule='["required"]' />
                  <span class="tooltip">
                    <i class="fa fa fa-warning"></i>
                    Please enter email address/username
                  </span>
               </div>           
             </div>
             <div class="form-group">
               <label for="password">Password</label>
               <div class="input-group clearfix">
                  <span class="input-group-addon">
                    <i class="fa fa-lock"></i>
                  </span>
                  <input type="password" name="password" id="password" class="form-control" data-rule='["required"]' />                  
                  <span class="tooltip">
                    <i class="fa fa fa-warning"></i>
                    Please enter your password
                  </span>
               </div>
               <div class="note">
                <a href="<?php echo get_site_url(); ?>/reset">Forgot password?</a>
               </div>
             </div>
             <div class="checkbox">
                <input type="checkbox" id="remember" name="remember" /> 
                <label for="remember"> Remember me </label>
             </div>
            </section>
            <section class="bottom">
              <button type="submit" name="sign-in" class="btn btn-primary">Sign in</button>
            </section>
          </fieldset>
         </form>
        </div>
        <div class="social-button">
          <h5 class="text-center"> - Or sign in using - </h5>
          <ul class="list-inline text-center">
            <li>
              <a href="javascript:;" class="btn btn-primary btn-circle">
                <i class="fa fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="javascript:;" class="btn btn-info btn-circle">
                <i class="fa fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="javascript:;" class="btn btn-warning btn-circle">
                <i class="fa fa-linkedin"></i>
              </a>
            </li>
          </ul>          
        </div>
      </div>
    </div>
  </div>  
</div>
<?php get_footer(); ?>
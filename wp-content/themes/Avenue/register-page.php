<?php
/*
* Template Name: Register Page
*/
?>
<?php

function register_user ($userdata) {

  $user = wp_insert_user($userdata);

  if(is_wp_error($user)) {
    echo $user->get_error_message();
  }

  if(!is_wp_error($user)) {
    echo 'User created : ' .$user;
  }

}

if (isset($_POST['sign-up'])) {

  $userdata = array(
    'user_login'  => $_POST['username'],
    'user_email'  => $_POST['email'],
    'user_pass'   => $_POST['password'],
    'first_name'  => $_POST['firstname'],
    'last_name'   => $_POST['lastname']
  );

  register_user($userdata);

}

?>
<?php get_header(); ?>
<div class="content auth-page" id="register-page">
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-7 col-lg-7 hidden-xs hidden-sm">
        <div class="row">
          <div class="col-md-8">
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
          <div class="col-sm-4">
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
      <div class="col-sm-12 col-md-5 col-lg-5">
        <div class="well">
         <form action="<?php echo get_site_url(); ?>/register" method="POST" name="register-form" class="auth-form" id="login-form" autocomplete="off" data-validation="">
          <fieldset>
            <legend> Registration is FREE* </legend>
            <section class="fields">
             <div class="form-group">
               <div class="input-group">
                  <input type="text" name="username" class="form-control" data-rule='["required"]' placeholder="Username" />
                  <span class="input-group-addon">
                   <i class="fa fa-user"></i>
                  </span>
                  <span class="tooltip">
                    <i class="fa fa fa-warning"></i>
                    Please enter your username
                  </span>
               </div>
             </div>
             <div class="form-group">
               <div class="input-group">
                  <input type="email" name="email" class="form-control" data-rule='["required"]' placeholder="Email address" />
                  <span class="input-group-addon">
                    <i class="fa fa-envelope"></i>
                  </span>
                  <span class="tooltip">
                    <i class="fa fa fa-warning"></i>
                    Please enter your email address
                  </span>
               </div>
             </div>
             <div class="form-group">
               <div class="input-group">
                  <input type="password" name="password" class="form-control" data-rule='["required"]' placeholder="Password" />
                  <span class="input-group-addon">
                    <i class="fa fa-lock"></i>
                  </span>
                  <span class="tooltip">
                    <i class="fa fa fa-warning"></i>
                    Please enter your password
                  </span>
               </div>
             </div>
             <div class="form-group">
               <div class="input-group">
                  <input type="password" name="confirmPass" class="form-control" data-rule='["required"]' placeholder="Confirm password" />
                  <span class="input-group-addon">
                    <i class="fa fa-lock"></i>
                  </span>
                  <span class="tooltip">
                    <i class="fa fa fa-warning"></i>
                    Don't forget confirm your password
                  </span>
               </div>
             </div>
            </section>
            <section class="personal-info">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <input type="text" name="firstname" class="form-control" placeholder="First name" />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <input type="text" name="lastname" class="form-control" placeholder="Last name" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <select name="gender" class="form-control">
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div class="col-sm-6">
                  <input type="text" name="phone" class="form-control" placeholder="Phone number" />
                </div>
              </div>
            </section>
            <section>
              <div class="checkbox">
                <input type="checkbox" id="remember" name="remember" />
                <label for="remember"> I aggre with the
                  <a href="javascript:;">Terms and Conditions</a>
                </label>
              </div>
            </section>
            <section class="bottom">
              <button type="submit" name="sign-up" class="btn btn-primary">Register</button>
            </section>
          </fieldset>
         </form>
        </div>
        <div class="auth-login">
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

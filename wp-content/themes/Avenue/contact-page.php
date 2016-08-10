<?php
/*
* Template Name: Contact Page
*/
?>
<?php get_header(); ?>
<div class="contact-page">
  <div class="map-area" id="contact-map"></div>
  <div class="container">
    <div class="row">
      <h2 class="title"> Get In Touch </h2>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <p>
          On the left you can see the theme’s contact form. It’s a <a href="http://demo.themetrail.com/realty/shortcodes#contact-form"> shortcode </a>, and pretty powerful. Realty also support contact form 7. Go, give it a try and hit the “Send” button to see what happens.
        </p>

        <div class="contact-info">
          <h3> Contact us </h3>
          <ul class="list-unstyled">
            <li>
              <i class="fa fa fa-phone"></i>
              <strong> Phone: </strong> 093 487 8212
            </li>
            <li>
              <i class="fa fa-envelope-o"></i>
              <strong> Email: </strong> songnguyensg@gmail.com
            </li>
            <li>
              <i class="fa fa-clock-o"></i>
              <strong> Working time: </strong> Mon - Sat: 08:00 AM - 17:00 PM
            </li>
            <li>
              <i class="fa fa-map-marker"></i>
              <strong> Address: </strong> 682 White Swan Drive, United States.
            </li>
          </ul>
        </div>

        <div class="follow-us">
          <h3> Follow us </h3>
          <ul class="list-inline">
            <li class="facebook">
              <i class="fa fa-facebook"></i>
            </li>
            <li class="twitter">
              <i class="fa fa-twitter"></i>
            </li>
            <li class="gooleplus">
              <i class="fa fa-google-plus"></i>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-sm-6">
        <form action="#" method="POST" class="contact-form">
          <div class="form-group">
            <input type="text" placeholder="Your name" class="form-control" />
          </div>
          <div class="form-group">
            <input type="text" placeholder="Your email address" class="form-control" />
          </div>
          <div class="form-group">
            <input type="text" placeholder="Your phone number" class="form-control" />
          </div>
          <div class="form-group">
            <textarea rows="5" placeholder="Your message" class="form-control"></textarea>
          </div>
          <div class="form-group">
            <div class="g-recaptcha" data-sitekey="6LflOScTAAAAAH0YPSc3cSll7SRWzPch6dw5KxY4">
            </div>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-info"> Send </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
<?php get_footer(); ?>


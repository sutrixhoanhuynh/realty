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
      <div class="col-sm-6 col-md-push-6">
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
            <div class="g-recaptcha" data-recaptcha data-sitekey="6LflOScTAAAAAH0YPSc3cSll7SRWzPch6dw5KxY4">
            </div>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-info send-contact"> Send </button>
          </div>
        </form>
      </div>
      <div class="col-sm-6 col-md-pull-6">
        <p>
          On the left you can see the theme’s contact form. It’s a <a href="http://demo.themetrail.com/realty/shortcodes#contact-form"> shortcode </a>, and pretty powerful. Realty also support contact form 7. Go, give it a try and hit the “Send” button to see what happens.
        </p>

        <div class="contact-info">
          <h3> Contact us </h3>
          <ul class="list-unstyled">
            <li>
              <strong> Phone: </strong>
              <a href="tel:0934878212"> 093 487 8212 </a>
            </li>
            <li>
              <strong> Email: </strong>
              <a href="mailto:songnguyensg@gmail.com"> songnguyensg@gmail.com </a>
            </li>
            <li>
              <strong> Working time: </strong> Mon - Sat: 08:00 AM - 17:00 PM
            </li>
            <li>
              <strong> Address: </strong>
              <a href="javascript:;"> 682 White Swan Drive, United States. </a>
            </li>
          </ul>
        </div>

        <div class="follow-us">
          <h3> Follow us </h3>
          <ul class="list-inline">
            <li class="facebook">
              <a href="javascript:;" title="facebook">
                <i class="fa fa-facebook"></i>
              </a>
            </li>
            <li class="twitter">
              <a href="javascript:;" title="twitter">
                <i class="fa fa-twitter"></i>
              </a>
            </li>
            <li class="gooleplus">
              <a href="javascript:;" title="goole plus">
                <i class="fa fa-google-plus"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
<?php get_footer(); ?>


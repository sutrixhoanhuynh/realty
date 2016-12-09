</main>
<footer>
  <div class="site-footer">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <h4> Contact Info </h4>
          <ul class="contact-info list-unstyled">
            <li>
              <a href="">
                <i class="fa fa-map-marker"></i>
                682 White Swan Drive
              </a>
            </li>
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
        </div>
        <div class="col-md-3">
          <h4> Userful links </h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nibh arcu, dictum et aliquet in, egestas quis ante. Mauris dictum quam lacus, quis ornare nisl lacinia sed. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div class="col-md-3">
          <h4> Twitter updates </h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nibh arcu, dictum et aliquet in, egestas quis ante. Mauris dictum quam lacus, quis ornare nisl lacinia sed. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div class="col-md-3">
          <h4> Our Newsletter </h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis egestas rhoncus.
          </p>
          <form action="#" method="POST" class="newsletter">
            <input type="email" name="newsletter_email" id="email" placeholder="Enter your email" class="form-control" />
            <button type="submit" name="newsletter_submit" class="btn btn-danger">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
   </div>
  <div class="bottom-bar">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-push-6">
          <?php echo do_shortcode('[social-links-widget]'); ?>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-pull-6">
          <p class="copyright">&copy; <?php echo date("Y"); ?> <?php bloginfo('name'); ?> - <?php bloginfo('description'); ?>. All Rights Reserved. </p>
        </div>
      </div>
    </div>
    <?php include (TEMPLATEPATH . '/backtotop.php'); ?>
  </div>
</footer>
</div>
<div class="modal modal-video">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button title="close" class="close">
          <i class="fa fa-times" aria-hidden="true"></i>
        </button>
      </div>
      <div class="modal-body">
      </div>
    </div>
  </div>
</div>
<script src="<?php bloginfo('template_directory'); ?>/libs.js"></script>
<script src="<?php bloginfo('template_directory'); ?>/script.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAojYRfYLfWetgH80scF33ZiIYltBKnUi0&callback=window.loadMap" async defer></script>
<script src="https://www.google.com/recaptcha/api.js?onload=loadCaptcha&render=explicit" async defer></script>
<script type="text/javascript">
  var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
  (function(){
  var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
  s1.async=true;
  s1.src='https://embed.tawk.to/57c5267c416c00672f63da01/default';
  s1.charset='UTF-8';
  s1.setAttribute('crossorigin','*');
  s0.parentNode.insertBefore(s1,s0);
  })();
</script>
</body>
</html>

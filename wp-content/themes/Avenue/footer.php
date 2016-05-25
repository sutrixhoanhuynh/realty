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
        <div class="col-md-6">
          <p>&copy; 2016 <?php bloginfo('name'); ?> - <?php bloginfo('description'); ?>. All Rights Reserved. </p>
        </div>
        <div class="col-md-6">
          <?php echo do_shortcode('[social-links-widget]'); ?>
        </div>
      </div>
    </div>
  </div>
  <?php include (TEMPLATEPATH . '/backtotop.php'); ?>
</footer>
</main>
<script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/js/libs.js"></script>
<script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/js/script.js"></script>
</body>
</html>

<?php
/*
* Template Name:  Cadastral Map Page
*/
?>
<?php get_header(); ?>
<div class="cadastral-page">
  <div class="map-block" data-cadastral="" data-marker-icon="<?php bloginfo('template_directory'); ?>/images/icon-marker-blue.png">
  </div>
  <div class="search-block">
    <form class="search-form" onsubmit="return false;">
      <div class="form-group">
        <label for="search-box" class="sr-only">Search</label>
        <div class="input-wrap">
          <input data-autocomplete="" class="form-control search-box" name="search-box" placeholder="Address / Suburb / Postcode" type="text" autocomplete="off" />
        </div>
        <button type="submit" class="search-btn">
          <i class="fa fa-search" aria-hidden="true"></i>
        </button>
        <button type="submit" class="locator-btn">
          <i class="fa fa-crosshairs" aria-hidden="true"></i>
        </button>
      </div>
    </form>
  </div>
</div>
<?php get_footer(); ?>
